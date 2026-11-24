/* ==========================================================================
   CRU — lógica del sitio (no hace falta tocar esto para añadir trabajos)
   ========================================================================== */
(() => {
  /* ------------------------------------------------------------- idioma
     EN por defecto; ES si el visitante lo elige con el botón (se recuerda),
     si llega con ?lang=es o si su navegador está en español. */
  const store = { get: k => { try { return localStorage.getItem(k); } catch { return null; } },
                  set: (k, v) => { try { localStorage.setItem(k, v); } catch {} } };
  const qp = new URLSearchParams(location.search).get("lang");
  if (qp === "es" || qp === "en") store.set("cru-lang", qp);
  const lang = (qp === "es" || qp === "en") ? qp : store.get("cru-lang") || ((navigator.language || "").toLowerCase().startsWith("es") ? "es" : "en");
  const ES = lang === "es";
  document.documentElement.lang = lang;
  const UI = (window.CRU.i18n && window.CRU.i18n.es) || {};
  const T = (key, en) => (ES && UI[key] !== undefined ? UI[key] : en);          // textos de la interfaz
  const tr = o => (ES && o && o.es ? { ...o, ...o.es } : o);                    // objeto con su versión es: { ... }
  const trBlock = b => { const n = tr(b); return n && n.items ? { ...n, items: n.items.map(trBlock) } : n; };
  const trProject = p => { if (!ES) return p; const n = tr(p); return { ...n, hero: n.hero && trBlock(n.hero), blocks: (n.blocks || []).map(trBlock) }; };
  const tag = t => T("tags", {})[t] || t;

  const site = tr(window.CRU.site);
  const projects = window.CRU.projects.filter(p => !p.hidden).map(trProject);
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s = "") => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const isVideo = src => /\.(mp4|webm|mov)(\?|$)/i.test(src || "");
  const pad2 = n => String(n).padStart(2, "0");
  // *texto* → cursiva serif · línea en blanco → párrafo nuevo
  const rich = (s = "") => esc(s).replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>").replace(/\*(.+?)\*/g, "<em>$1</em>");
  const paras = (s = "", cls = "") => String(s).split(/\n\s*\n/).map(t => `<p${cls ? ` class="${cls}"` : ""} data-reveal>${rich(t.trim())}</p>`).join("");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------- media */
  // Si una imagen no carga, se muestra un bloque del color del proyecto
  window.CRUfallback = img => {
    const d = document.createElement("div");
    d.className = "media-fallback mono";
    d.style.background = img.dataset.fb;
    d.textContent = img.alt;
    img.replaceWith(d);
  };
  function media(item, alt = "", fallbackColor = "#ddd") {
    const src = item.src;
    const fb = `data-fb="${esc(fallbackColor)}" onerror="CRUfallback(this)"`;
    if (item.type === "video" || isVideo(src)) {
      return `<video src="${esc(src)}" ${item.poster ? `poster="${esc(item.poster)}"` : ""} muted loop playsinline preload="metadata" data-autoplay></video>`;
    }
    return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" onload="this.classList.add('ld')" ${fb}>`;
  }

  /* ------------------------------------------------------- logo + footer */
  function logo() { return site.logoSVG ? site.logoSVG : esc(site.name); }

  function renderChrome() {
    // Textos fijos del HTML marcados con data-i18n="clave" (y data-i18n-aria para etiquetas accesibles)
    if (ES) {
      $$("[data-i18n]").forEach(el => { const v = UI[el.dataset.i18n]; if (v !== undefined) el.textContent = v; });
      $$("[data-i18n-aria]").forEach(el => { const v = UI[el.dataset.i18nAria]; if (v !== undefined) el.setAttribute("aria-label", v); });
      if (document.body.dataset.page === "home" && UI.homeTitle) document.title = UI.homeTitle;
    }
    // Botón de idioma en la cabecera
    const nav = $(".site-header nav");
    if (nav && !$(".lang-toggle", nav)) {
      nav.insertAdjacentHTML("beforeend", `<button type="button" class="lang-toggle mono" data-lang="${ES ? "en" : "es"}" lang="${ES ? "en" : "es"}" aria-label="${ES ? "Switch to English" : "Ver en español"}"><span class="${ES ? "muted" : ""}">EN</span><span class="muted" aria-hidden="true">/</span><span class="${ES ? "" : "muted"}">ES</span></button>`);
    }
    $$("[data-logo]").forEach(el => (el.innerHTML = logo()));
    $$("[data-legal-name]").forEach(el => (el.textContent = site.legalName || site.fullName || site.name));
    $$("[data-photo-link]").forEach(a => site.photoPortfolio?.url ? (a.href = site.photoPortfolio.url) : a.remove());
    // Desplegable de trabajos al pasar por "Works"
    const works = $$(".site-header nav a").find(a => /works/i.test(a.textContent));
    if (works && !works.closest(".nav-works")) {
      const wrap = document.createElement("div");
      wrap.className = "nav-works";
      works.replaceWith(wrap);
      wrap.appendChild(works);
      wrap.insertAdjacentHTML("beforeend", `<div class="nav-drop"><ul>${projects.map((p, i) =>
        `<li><a href="project.html#${esc(p.slug)}"><span class="muted">${pad2(i + 1)}</span>${esc(p.title)}<span class="muted">${esc(p.discipline)}</span></a></li>`).join("")}</ul></div>`);
    }
    const f = $("#site-footer");
    if (!f) return;
    f.innerHTML = `
      <div class="mono muted">© ${new Date().getFullYear()} ${esc(site.fullName || site.name)}</div>
      <div class="mono"><a class="link-u muted" href="legal.html">${T("legal", "Legal & privacy")}</a></div>
      <div></div>
      <div class="mono"><a class="link-u muted" href="#" data-top>${T("top", "Back to top ↑")}</a></div>
      <div class="footer-logo" aria-hidden="true">${logo()}</div>`;
  }

  /* ----------------------------------------------------------------- home */
  function renderHome() {
    const grid = $("#works-grid");
    if (!grid) return;

    // La palabra de acento (heroAccent) se sustituye por el logo SVG si heroLogo: true; si no, va en color
    const accentRe = site.heroAccent ? new RegExp(`\\b(${site.heroAccent})\\b(,?)`) : /$^/;
    const heroSvg = (site.logoSVG || "").replace(/\s(role|aria-label)="[^"]*"/g, "").replace("<svg ", '<svg aria-hidden="true" focusable="false" ');
    $("#hero-line").innerHTML = splitLines(site.heroLine).replace(accentRe, site.heroLogo && heroSvg
      ? `<span class="hero-logo accent"><span class="sr-only">$1</span>${heroSvg}</span>$2`
      : '<span class="accent">$1</span>$2');
    // Carrusel 3D vertical en la home (v12): las portadas van de frente, sin girar, sobre una
    // curva vertical: la del centro, delante; las de arriba y abajo se alejan hacia el fondo
    // (más pequeñas y desvaneciéndose). Bajan de arriba abajo en bucle continuo y lento.
    // Se para con el ratón encima, fuera de pantalla o con la pestaña oculta.
    const REEL_SECONDS = 4.5;   // segundos que tarda cada portada en pasar de una posición a la siguiente
    const reel = $("#hero-reel");
    if (reel && site.heroReel !== false) {
      const still = p => p.cover.poster || (isVideo(p.cover.src) ? "" : p.cover.src);
      const items = projects.filter(still);
      const n = items.length, step = 360 / n;
      reel.innerHTML = `<div class="reel-stage"><div class="reel-drum">${items.map((p, i) =>
        `<a class="reel-card" href="project.html#${esc(p.slug)}" data-cursor="view" tabindex="${i ? -1 : 0}" aria-label="${esc(p.title)}">
           <img src="${esc(still(p))}" alt="" ${i > 2 ? 'loading="lazy"' : ""}></a>`).join("")}</div></div>
        <span class="reel-label mono"><span class="muted">${pad2(projects.indexOf(items[0]) + 1)}</span> <span class="reel-title">${esc(items[0].title)}</span></span>`;
      const cards = $$(".reel-card", reel), stage = $(".reel-stage", reel);
      const title = $(".reel-title", reel), num = $(".reel-label .muted", reel);
      let radius = 0, front = -1, t = 0;
      // Radio de la curva: la portada vecina queda justo encima/debajo de la del centro, con un poco de aire
      const measure = () => { radius = cards[0].offsetHeight * 1.24 / Math.sin(step * Math.PI / 180); };
      const draw = () => {
        cards.forEach((c, i) => {
          const a = ((i * step - t) % 360 + 540) % 360 - 180;     // ángulo respecto al frente (−180…180); positivo = arriba
          const r = a * Math.PI / 180;
          const y = -radius * Math.sin(r), z = -radius * (1 - Math.cos(r));
          const far = Math.min(1, Math.abs(a) / 100);              // 0 delante · 1 al fondo
          c.style.transform = `translate3d(0, ${y.toFixed(1)}px, ${z.toFixed(1)}px)`;
          c.style.opacity = Math.abs(a) > 100 ? 0 : (1 - far * far * .85).toFixed(3);
          c.style.zIndex = String(1000 - Math.round(Math.abs(a)));
          c.style.visibility = Math.abs(a) > 100 ? "hidden" : "visible";
        });
        const k = ((Math.round(t / step) % n) + n) % n;
        if (k !== front) {
          front = k;
          title.textContent = items[k].title; num.textContent = pad2(projects.indexOf(items[k]) + 1);
          cards.forEach((c, i) => c.setAttribute("tabindex", i === k ? 0 : -1));
        }
      };
      measure(); draw();
      window.addEventListener("resize", () => { measure(); draw(); });
      let visible = true, hover = false, last = 0;
      new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(stage);
      stage.addEventListener("pointerenter", e => { if (e.pointerType === "mouse") hover = true; });
      stage.addEventListener("pointerleave", () => (hover = false));
      if (!reduced) requestAnimationFrame(function tick(now) {
        const dt = Math.min(64, now - (last || now)); last = now;
        if (visible && !hover && !document.hidden) { t += dt / 1000 * step / REEL_SECONDS; draw(); }
        requestAnimationFrame(tick);
      });
    }
    $("#hero-meta").innerHTML = (site.heroMeta || []).map((m, i) => `<span class="${i ? "muted" : ""}">${esc(m)}</span>`).join("");
    $("#works-count").textContent = `(${pad2(projects.length)})`;
    $("#about-text").innerHTML = rich(site.about);
    $("#about-more").innerHTML = rich(site.aboutMore || "");
    const ph = site.photoPortfolio;
    $("#skills").innerHTML = site.skills.map(s => `
      <div class="skill" data-reveal><h3>${esc(s.title)}</h3><ul class="mono">${s.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>${
        ph?.url && (s.photo || /photo|foto/i.test(s.title)) ? `<a class="skill-note mono link-u" href="${esc(ph.url)}" target="_blank" rel="noopener">${esc(site.photoLabel || ph.label)}</a>` : ""}</div>`).join("");
    if (site.aboutPhoto) $("#about-photo").innerHTML = `<img src="${esc(site.aboutPhoto)}" alt="${esc(site.fullName || site.name)}" loading="lazy">`;
    $("#closing").innerHTML = site.closing.map(esc).join("<br>");
    $("#contact-email").textContent = site.email;
    $("#contact-email").href = `mailto:${site.email}`;
    $("#contact-link").href = `mailto:${site.email}`;
    $("#contact-loc").textContent = site.location;
    $("#contact-socials").innerHTML = `<span class="muted">${T("socials", "Socials")}</span><br>` + site.socials.map(s => `<a class="link-u" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("<br>");
    $("#copy-email").addEventListener("click", async e => {
      try { await navigator.clipboard.writeText(site.email); e.target.textContent = T("copied", "copied ✓"); }
      catch { e.target.textContent = T("selectCopy", "select & copy"); }
      setTimeout(() => (e.target.textContent = T("copy", "copy")), 2000);
    });


    grid.innerHTML = projects.map((p, i) => `
      <a class="tile size-${p.size || "m"}" href="project.html#${esc(p.slug)}" data-ratio="${esc(p.cover.ratio || "4/5")}" data-tags="${esc((p.tags || []).join("|"))}" data-reveal data-cursor="view">
        <div class="tile-media" style="aspect-ratio:${esc(p.cover.ratio || "4/5")}">${media(p.cover, p.title, p.color)}</div>
        <div class="tile-meta">
          <span class="tile-title">${esc(p.title)}</span>
          <span class="mono muted">${pad2(i + 1)}</span>
          <span class="mono muted">${esc(p.discipline)}</span>
          <span class="mono muted">${esc(p.year || "")}</span>
        </div>
      </a>`).join("");

    // Mosaico: reparte los trabajos visibles (en orden) en columnas, cada uno en la más corta.
    // Escritorio: 2 columnas; móvil (≤ 760 px): 1. Se recalcula al filtrar y al cambiar de tamaño.
    const tiles = $$(".tile", grid);
    const ratioOf = t => { const [w, h] = (t.dataset.ratio || "4/5").split("/").map(Number); return h ? h / w : 1; };
    let cols = 0;
    const layoutGrid = (force) => {
      const n = window.matchMedia("(max-width: 760px)").matches ? 1 : 2;
      if (n === cols && !force) return;
      cols = n;
      const colEls = Array.from({ length: n }, () => Object.assign(document.createElement("div"), { className: "grid-col" }));
      const vis = tiles.filter(t => !t.classList.contains("is-hidden"));
      const r = vis.map(ratioOf), g = .02;
      // Reparto base: cada trabajo a la columna más corta (respeta el orden de lectura)
      let best = r.map(() => 0);
      if (n === 2) {
        const h = [0, 0];
        best = r.map(x => { const k = h[0] <= h[1] ? 0 : 1; h[k] += x + g; return k; });
        // Con 2 columnas, busca el reparto que deja ambas columnas casi al mismo largo,
        // permitiendo que un trabajo empiece un poco antes que el anterior (≤ 0,35 de ancho de columna)
        if (r.length <= 14) {
          let bestD = Math.abs(h[0] - h[1]);
          for (let m = 0; m < 1 << r.length; m += 2) {          // el primero siempre a la izquierda
            const hh = [0, 0]; let last = 0, ok = true;
            for (let i = 0; i < r.length; i++) {
              const k = (m >> i) & 1;
              if (hh[k] < last - .35) { ok = false; break; }
              last = Math.max(last, hh[k]); hh[k] += r[i] + g;
            }
            const d = Math.abs(hh[0] - hh[1]);
            if (ok && d < bestD - .01) { bestD = d; best = r.map((_, i) => (m >> i) & 1); }
          }
        }
      }
      vis.forEach((t, i) => colEls[best[i]].appendChild(t));
      tiles.filter(t => t.classList.contains("is-hidden")).forEach(t => colEls[0].appendChild(t));
      grid.replaceChildren(...colEls);
    };
    layoutGrid(true);
    window.addEventListener("resize", () => layoutGrid());

    // Filtros
    const all = ["All", ...new Set(projects.flatMap(p => p.tags || []))];
    const filters = $("#filters");
    filters.innerHTML = all.map((t, i) => `<button type="button" aria-pressed="${i === 0}" data-filter="${esc(t)}">${esc(tag(t))}</button>`).join("");
    filters.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      const t = b.dataset.filter;
      const apply = () => { tiles.forEach(tile => tile.classList.toggle("is-hidden", t !== "All" && !tile.dataset.tags.split("|").includes(t))); layoutGrid(true); };
      if (reduced) return apply();
      // fundido corto: se apaga la rejilla, se filtra y vuelve a aparecer
      grid.classList.add("is-filtering");
      setTimeout(() => { apply(); $$(".tile", grid).forEach(x => x.classList.add("is-in")); grid.classList.remove("is-filtering"); }, 180);
    });
  }

  function splitLines(text) {
    // Parte la frase en líneas para la animación de entrada.
    // Si la frase lleva saltos "\n" en data.js, se respetan tal cual (cada trozo es una línea);
    // si no, se reparte automáticamente en 2–3 líneas.
    if (text.includes("\n")) return text.split("\n").map(l => `<span class="split-line"><span>${esc(l.trim())}</span></span>`).join("");
    const words = text.split(" ");
    const per = Math.ceil(words.length / (words.length > 6 ? 3 : 2));
    const lines = [];
    for (let i = 0; i < words.length; i += per) lines.push(words.slice(i, i + per).join(" "));
    return lines.map(l => `<span class="split-line"><span>${esc(l)}</span></span>`).join("");
  }

  /* -------------------------------------------------------------- project */
  function renderProject() {
    const root = $("#project");
    if (!root) return;
    const slug = decodeURIComponent(location.hash.replace("#", "")) || projects[0].slug;
    const idx = Math.max(0, projects.findIndex(p => p.slug === slug));
    const p = projects[idx];
    const next = projects[(idx + 1) % projects.length];
    const dark = isDarkColor(p.color);
    const accent = `data-bg="${esc(p.color)}" data-fg="${dark ? "#ffffff" : "#0b0b0b"}"`;
    const light = `data-bg="#ffffff" data-fg="#0b0b0b"`;
    document.title = `${p.title} — ${site.name}`;

    // Agrupa los bloques en tramos de color según los marcadores color/light
    const segments = [{ theme: light, items: [] }];
    (p.blocks || []).forEach(b => {
      if (b.type === "color") segments.push({ theme: accent, items: [] });
      else if (b.type === "light") segments.push({ theme: light, items: [] });
      else segments.at(-1).items.push(b);
    });

    // Caja de imagen: con ratio → recorte exacto; sin ratio → tamaño natural (verticales, vídeos…)
    const box = (it, r, extra = "") => {
      const ratio = it.ratio || r;
      const snd = it.sound ? `<button type="button" class="sound mono" data-sound>${T("soundOn", "sound on")}</button>` : "";
      return `<div class="ph${ratio ? "" : " natural"}" ${extra} ${ratio ? `style="aspect-ratio:${ratio}"` : ""}>${media(it, p.title, p.color)}${snd}</div>`;
    };
    const cols = b => {
      const st = [];
      if (b.widths) st.push(`grid-template-columns:${b.widths.map(w => w + "fr").join(" ")}`);
      if (b.align) st.push(`align-items:${b.align}`);
      if (b.join) st.push("gap:0");
      return st.length ? `style="${st.join(";")}"` : "";
    };
    const block = b => {
      const alt = p.title;
      switch (b.type) {
        case "full":  return `<figure class="b-full" data-reveal style="margin:0">${box(b, b.ratio)}${b.caption ? `<figcaption class="mono muted" style="padding-left:var(--pad)">${esc(b.caption)}</figcaption>` : ""}</figure>`;
        case "video": return `<div class="b-full b-video" data-reveal>${box({ ...b, type: "video" }, b.ratio)}</div>`;
        case "inset": return `<div class="b-inset${b.width ? " " + b.width : ""}"><figure data-reveal>${box(b, b.ratio)}${b.caption ? `<figcaption class="mono muted">${esc(b.caption)}</figcaption>` : ""}</figure></div>`;
        case "pair":
        case "trio":  return `<div class="b-${b.type}" ${cols(b)}>${b.items.map(it => box(it, b.ratio, "data-reveal")).join("")}</div>`;
        case "text":  return `<div class="b-text"><span class="mono" data-reveal>${esc(b.title || "")}</span><div class="b-text-body">${paras(b.body)}</div></div>`;
        case "quote": return `<div class="b-quote"><p data-reveal>${rich(b.body)}</p></div>`;
        // Vídeo de YouTube: se ve la portada local y solo carga YouTube al pulsar play (sin cookies hasta entonces)
        case "youtube": return `<figure class="b-full" data-reveal style="margin:0"><div class="ph yt" style="aspect-ratio:${esc(b.ratio || "16/9")}">
            ${b.poster ? media({ src: b.poster }, p.title, p.color) : ""}
            <button type="button" class="yt-play mono" data-yt="${esc(b.id)}" data-title="${esc(b.caption || p.title)}" aria-label="${esc(T("play", "Play video"))}: ${esc(b.caption || p.title)}"><span class="yt-icon" aria-hidden="true"></span>${esc(T("play", "Play video"))}</button>
          </div>${b.caption ? `<figcaption class="mono muted" style="padding-left:var(--pad)">${esc(b.caption)}</figcaption>` : ""}</figure>`;
        default: return "";
      }
    };

    root.innerHTML = `
      <section class="p-head" ${light}>
        <a class="back mono link-u" href="index.html#works">${T("allWorks", "← All works")}</a>
        <div class="mono muted" style="margin-bottom:14px">${pad2(idx + 1)} / ${pad2(projects.length)}</div>
        <h1 class="p-title">${splitLines(p.title)}</h1>
        <dl class="p-meta mono">
          <div><dt>${T("discipline", "Discipline")}</dt><dd>${esc(p.discipline)}</dd></div>
          <div><dt>${T("industry", "Industry")}</dt><dd>${esc(p.industry || "—")}</dd></div>
          <div><dt>${T("client", "Client")}</dt><dd>${esc(p.client || "—")}</dd></div>
          <div><dt>${T("year", "Year")}</dt><dd>${esc(p.year || "—")}</dd></div>
        </dl>
      </section>
      ${p.hero ? `<section class="p-hero-alt" ${light}>${block(p.hero)}</section>` : `<section class="p-hero" ${light}>${media(p.cover, p.title, p.color)}</section>`}
      <section class="p-intro" ${light}><span class="mono" data-reveal>${T("aboutProject", "About the project")}</span><div class="p-intro-body">${paras(p.intro)}${p.collab?.length ? `<p class="p-collab mono" data-reveal><span class="muted">${T("collab", "In collaboration with")}</span> ${people(p.collab)}</p>` : ""}</div></section>
      ${segments.filter(s => s.items.length).map(s => `<section class="blocks" ${s.theme}>${s.items.map(block).join("")}</section>`).join("")}
      ${p.credits?.length ? `<section class="p-credits" ${light}><span class="mono">${T("credits", "Credits")}</span><dl class="mono">${p.credits.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${Array.isArray(v) ? people(v) : esc(v)}</dd>`).join("")}</dl></section>` : ""}
      <a class="p-next" href="project.html#${esc(next.slug)}" data-bg="#0b0b0b" data-fg="#ffffff" data-cursor="next">
        <div class="mono muted" style="margin-bottom:20px">${T("nextProject", "Next project")}</div>
        <div class="row"><span class="t">${esc(next.title)}</span><span class="thumb">${media(next.cover, next.title, next.color)}</span></div>
      </a>`;
  }

  // Lista de personas: "Nombre" o { name, url } → enlace a su web (se abre en otra pestaña)
  function people(list = []) {
    return list.map(x => typeof x === "string" ? esc(x)
      : x.url ? `<a class="person link-u" href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.name)}<span class="arr" aria-hidden="true">↗</span></a>`
      : esc(x.name)).join(", ");
  }

  // Al pulsar play se sustituye la portada por el reproductor de YouTube (dominio sin cookies)
  document.addEventListener("click", e => {
    const b = e.target.closest("[data-yt]");
    if (!b) return;
    const f = document.createElement("iframe");
    f.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(b.dataset.yt)}?autoplay=1&rel=0&modestbranding=1`;
    f.title = b.dataset.title || "YouTube";
    f.allow = "autoplay; encrypted-media; picture-in-picture; fullscreen";
    f.allowFullscreen = true;
    b.parentElement.replaceChildren(f);
  });

  function isDarkColor(hex = "#000") {
    const h = hex.replace("#", "");
    const n = parseInt(h.length === 3 ? h.split("").map(c => c + c).join("") : h, 16);
    const r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) < 150;
  }

  /* ------------------------------------------------- behaviour (observers) */
  function initThemes() {
    // Cambio de color de fondo al hacer scroll (estilo Collins)
    const root = document.documentElement;
    // Dos capas de fondo que se funden (fluido en móvil)
    let layers = $$(".bg-layer");
    if (!layers.length) {
      layers = [0, 1].map(() => { const d = document.createElement("div"); d.className = "bg-layer"; document.body.prepend(d); return d; });
      layers[0].style.background = "#ffffff"; layers[0].classList.add("on");
    }
    const setTheme = (bg, fg) => {
      root.style.setProperty("--bg", bg);
      root.style.setProperty("--fg", fg);
      const current = layers.find(l => l.style.zIndex === "-1") || layers.find(l => l.classList.contains("on")) || layers[0];
      const probe = document.createElement("i"); probe.style.background = bg;
      if (probe.style.background === current.style.background) return;
      // la capa nueva aparece encima de la actual (sin pasar por blanco)
      const next = layers.find(l => l !== current);
      next.style.transition = "none"; next.classList.remove("on"); next.style.background = bg;
      next.style.zIndex = "-1"; current.style.zIndex = "-2";
      void next.offsetWidth;
      next.style.transition = ""; next.classList.add("on");
    };
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setTheme(e.target.dataset.bg, e.target.dataset.fg); });
    }, { rootMargin: "-55% 0px -45% 0px" });
    $$("[data-bg]").forEach(el => io.observe(el));
    // Al llegar al final de la página, aplica el color de la última sección (pie)
    if (!window.__cruBottom) {
      window.__cruBottom = true;
      let ticking = false;
      addEventListener("scroll", () => {
        if (ticking) return; ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          if (innerHeight + scrollY >= document.documentElement.scrollHeight - 4) {
            const last = $$("[data-bg]").at(-1);
            if (last) setTheme(last.dataset.bg, last.dataset.fg);
          }
        });
      }, { passive: true });
    }
  }

  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); } });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$("[data-reveal]").forEach(el => io.observe(el));
  }

  function initVideos() {
    // Los vídeos solo se reproducen cuando están en pantalla
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { const v = e.target; e.isIntersecting && !reduced ? v.play().catch(() => {}) : v.pause(); });
    }, { threshold: 0.15 });
    $$("video[data-autoplay]").forEach(v => io.observe(v));
    // Botón de sonido en vídeos con sound: true
    if (!window.__cruSound) {
      window.__cruSound = true;
      document.addEventListener("click", e => {
        const b = e.target.closest("[data-sound]"); if (!b) return;
        const v = b.parentElement.querySelector("video"); if (!v) return;
        v.muted = !v.muted; if (!v.muted) v.play().catch(() => {});
        b.textContent = v.muted ? T("soundOn", "sound on") : T("soundOff", "sound off");
      });
    }
  }

  function initCursor() {
    if (matchMedia("(hover: none)").matches) return;
    const c = document.createElement("div");
    c.className = "cursor mono";
    document.body.appendChild(c);
    addEventListener("pointermove", e => { c.style.left = e.clientX + "px"; c.style.top = e.clientY + "px"; }, { passive: true });
    document.addEventListener("pointerover", e => {
      const t = e.target.closest("[data-cursor]");
      if (t) { c.textContent = T("cursor", {})[t.dataset.cursor] || t.dataset.cursor; c.classList.add("on"); } else c.classList.remove("on");
    });
  }

  function initTransitions() {
    const curtain = document.createElement("div");
    curtain.className = "curtain";
    document.body.appendChild(curtain);
    requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("is-ready")));

    document.addEventListener("click", e => {
      const lb = e.target.closest("[data-lang]");
      if (lb) {
        store.set("cru-lang", lb.dataset.lang);
        const u = new URL(location.href); u.searchParams.delete("lang");
        const go = () => (u.href === location.href ? location.reload() : location.replace(u.href));
        if (reduced) return go();
        curtain.classList.add("from-bottom");
        document.documentElement.classList.remove("is-ready");
        requestAnimationFrame(() => { curtain.classList.remove("from-bottom"); document.documentElement.classList.add("is-leaving"); });
        setTimeout(go, 440);
        return;
      }
      if (e.target.closest("[data-top]")) { e.preventDefault(); scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); return; }
      const a = e.target.closest("a[href]");
      if (!a || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey) return;
      // Anclas de la misma página (#works, #about, #contact): scroll suave
      const raw = a.getAttribute("href");
      if (raw.startsWith("#") && raw.length > 1 && !$("#project")) {
        const t = document.getElementById(raw.slice(1));
        if (t) { e.preventDefault(); t.scrollIntoView({ behavior: reduced ? "auto" : "smooth" }); }
        return;
      }
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.protocol.startsWith("mailto")) return;
      const samePage = url.pathname === location.pathname;
      if (samePage && !$("#project")) return; // anclas dentro de la home: scroll normal
      e.preventDefault();
      const html = document.documentElement;
      curtain.classList.add("from-bottom");
      html.classList.remove("is-ready");
      requestAnimationFrame(() => { curtain.classList.remove("from-bottom"); html.classList.add("is-leaving"); });
      setTimeout(() => {
        if (samePage) { location.hash = url.hash; }
        else location.href = url.href;
      }, reduced ? 0 : 440);
    });

    // Navegar entre proyectos (mismo project.html, distinto #)
    addEventListener("hashchange", () => {
      if (!$("#project")) return;
      boot(true);
      scrollTo(0, 0);
      document.documentElement.classList.remove("is-leaving");
      requestAnimationFrame(() => document.documentElement.classList.add("is-ready"));
    });
    addEventListener("pageshow", e => { if (e.persisted) { document.documentElement.classList.remove("is-leaving"); document.documentElement.classList.add("is-ready"); } });
  }

  /* ------------------------------------------------------------------ boot */
  function boot(rerender) {
    renderChrome();
    renderHome();
    renderProject();
    initThemes();
    initReveal();
    initVideos();
    if (!rerender) { initCursor(); initTransitions(); }
  }
  boot(false);
})();
