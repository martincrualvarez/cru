/* ==========================================================================
   CRU — lógica del sitio (no hace falta tocar esto para añadir trabajos)
   ========================================================================== */
(() => {
  const { site } = window.CRU;
  const projects = window.CRU.projects.filter(p => !p.hidden);
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
    return `<img src="${esc(src)}" alt="${esc(alt)}" loading="lazy" decoding="async" ${fb}>`;
  }

  /* ------------------------------------------------------- logo + footer */
  function logo() { return site.logoSVG ? site.logoSVG : esc(site.name); }

  function renderChrome() {
    $$("[data-logo]").forEach(el => (el.innerHTML = logo()));
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
      <div class="mono">${esc(site.name)}<br><span class="muted">${esc(site.role)}</span></div>
      <div class="mono">${esc(site.location)}</div>
      <div class="mono">${site.socials.map(s => `<a class="link-u" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)}</a>`).join("")}</div>
      <div class="mono"><a class="link-u" href="mailto:${esc(site.email)}">${esc(site.email)}</a><br><span class="muted">${new Date().getFullYear()} © ${esc(site.name)}</span></div>
      <div class="footer-logo" aria-hidden="true">${logo()}</div>`;
  }

  /* ----------------------------------------------------------------- home */
  function renderHome() {
    const grid = $("#works-grid");
    if (!grid) return;

    $("#hero-line").innerHTML = splitLines(site.heroLine);
    // Mini visor en la home: pasa por las portadas de los trabajos
    const reel = $("#hero-reel");
    if (reel && site.heroReel !== false) {
      const still = p => p.cover.poster || (isVideo(p.cover.src) ? "" : p.cover.src);
      const items = projects.filter(still);
      reel.innerHTML = `<a class="reel-frame" href="project.html#${esc(items[0].slug)}" data-cursor="view">${items.map((p, i) =>
        `<img src="${esc(still(p))}" alt="${esc(p.title)}" class="${i ? "" : "on"}" ${i > 2 ? 'loading="lazy"' : ""}>`).join("")}</a>
        <span class="reel-label mono"><span class="muted">${pad2(1)}</span> <span class="reel-title">${esc(items[0].title)}</span></span>`;
      let k = 0;
      const imgs = $$("img", reel), frame = $(".reel-frame", reel), title = $(".reel-title", reel), num = $(".reel-label .muted", reel);
      if (!reduced) setInterval(() => {
        imgs[k].classList.remove("on"); k = (k + 1) % imgs.length; imgs[k].classList.add("on");
        frame.href = `project.html#${items[k].slug}`; title.textContent = items[k].title; num.textContent = pad2(projects.indexOf(items[k]) + 1);
      }, 1400);
    }
    $("#hero-sub").textContent = site.heroSub;
    $("#hero-loc").textContent = site.location;
    $("#about-text").innerHTML = rich(site.about);
    $("#about-more").innerHTML = rich(site.aboutMore || "");
    $("#works-intro").innerHTML = rich(site.worksIntro || "");
    const ph = site.photoPortfolio;
    $("#skills").innerHTML = site.skills.map(s => `
      <div class="skill" data-reveal><h3>${esc(s.title)}</h3><ul class="mono">${s.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul>${
        ph?.url && /photo/i.test(s.title) ? `<a class="skill-note mono link-u" href="${esc(ph.url)}" target="_blank" rel="noopener">${esc(ph.label)}</a>` : ""}</div>`).join("");
    if (site.aboutPhoto) $("#about-photo").innerHTML = `<img src="${esc(site.aboutPhoto)}" alt="${esc(site.fullName || site.name)}" loading="lazy">`;
    $("#closing").innerHTML = site.closing.map(esc).join("<br>");
    $("#contact-email").textContent = site.email;
    $("#contact-email").href = `mailto:${site.email}`;
    $("#contact-link").href = `mailto:${site.email}`;
    $("#contact-loc").textContent = site.location;
    $("#contact-socials").innerHTML = `<span class="muted">Socials</span><br>` + site.socials.map(s => `<a class="link-u" href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.label)} ↗</a>`).join("<br>");
    $("#copy-email").addEventListener("click", async e => {
      try { await navigator.clipboard.writeText(site.email); e.target.textContent = "copied ✓"; }
      catch { e.target.textContent = "select & copy"; }
      setTimeout(() => (e.target.textContent = "copy"), 2000);
    });


    grid.innerHTML = projects.map((p, i) => `
      <a class="tile size-${p.size || "m"}" href="project.html#${esc(p.slug)}" data-tags="${esc((p.tags || []).join("|"))}" data-reveal data-cursor="view">
        <div class="tile-media" style="aspect-ratio:${esc(p.cover.ratio || "4/5")}">${media(p.cover, p.title, p.color)}</div>
        <div class="tile-meta">
          <span class="tile-title">${esc(p.title)}</span>
          <span class="mono muted">${pad2(i + 1)}</span>
          <span class="mono muted">${esc(p.discipline)}</span>
          <span class="mono muted">${esc(p.year || "")}</span>
        </div>
      </a>`).join("");

    // Filtros
    const all = ["All", ...new Set(projects.flatMap(p => p.tags || []))];
    const count = t => t === "All" ? projects.length : projects.filter(p => (p.tags || []).includes(t)).length;
    const filters = $("#filters");
    filters.innerHTML = all.map((t, i) => `<button type="button" aria-pressed="${i === 0}" data-filter="${esc(t)}">${esc(t)}<sup>${count(t)}</sup></button>`).join("");
    filters.addEventListener("click", e => {
      const b = e.target.closest("button"); if (!b) return;
      $$("button", filters).forEach(x => x.setAttribute("aria-pressed", x === b));
      const t = b.dataset.filter;
      $$(".tile", grid).forEach(tile => tile.classList.toggle("is-hidden", t !== "All" && !tile.dataset.tags.split("|").includes(t)));
    });
  }

  function splitLines(text) {
    // Parte la frase en 2–3 líneas para la animación de entrada
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
      const snd = it.sound ? `<button type="button" class="sound mono" data-sound>sound on</button>` : "";
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
        default: return "";
      }
    };

    root.innerHTML = `
      <section class="p-head" ${light}>
        <a class="back mono link-u" href="index.html#works">← All works</a>
        <div class="mono muted" style="margin-bottom:14px">${pad2(idx + 1)} / ${pad2(projects.length)}</div>
        <h1 class="p-title">${splitLines(p.title)}</h1>
        <dl class="p-meta mono">
          <div><dt>Discipline</dt><dd>${esc(p.discipline)}</dd></div>
          <div><dt>Industry</dt><dd>${esc(p.industry || "—")}</dd></div>
          <div><dt>Client</dt><dd>${esc(p.client || "—")}</dd></div>
          <div><dt>Year</dt><dd>${esc(p.year || "—")}</dd></div>
        </dl>
      </section>
      ${p.hero ? `<section class="p-hero-alt" ${light}>${block(p.hero)}</section>` : `<section class="p-hero" ${light}>${media(p.cover, p.title, p.color)}</section>`}
      <section class="p-intro" ${light}><span class="mono" data-reveal>About the project</span><div class="p-intro-body">${paras(p.intro)}</div></section>
      ${segments.filter(s => s.items.length).map(s => `<section class="blocks" ${s.theme}>${s.items.map(block).join("")}</section>`).join("")}
      ${p.credits?.length ? `<section class="p-credits" ${light}><span class="mono">Credits</span><dl class="mono">${p.credits.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl></section>` : ""}
      <a class="p-next" href="project.html#${esc(next.slug)}" data-bg="#0b0b0b" data-fg="#ffffff" data-cursor="next">
        <div class="mono muted" style="margin-bottom:20px">Next project</div>
        <div class="row"><span class="t">${esc(next.title)}</span><span class="thumb">${media(next.cover, next.title, next.color)}</span></div>
      </a>`;
  }

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
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        root.style.setProperty("--bg", e.target.dataset.bg);
        root.style.setProperty("--fg", e.target.dataset.fg);
      });
    }, { rootMargin: "-55% 0px -45% 0px" });
    $$("[data-bg]").forEach(el => io.observe(el));
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
        b.textContent = v.muted ? "sound on" : "sound off";
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
      if (t) { c.textContent = t.dataset.cursor; c.classList.add("on"); } else c.classList.remove("on");
    });
  }

  function initTransitions() {
    const curtain = document.createElement("div");
    curtain.className = "curtain";
    document.body.appendChild(curtain);
    requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.add("is-ready")));

    document.addEventListener("click", e => {
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
      }, reduced ? 0 : 560);
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
