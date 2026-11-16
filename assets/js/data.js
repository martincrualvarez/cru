/* ==========================================================================
   CRU — CONTENIDO DEL PORTFOLIO
   --------------------------------------------------------------------------
   Este es el ÚNICO archivo que hay que tocar para cambiar textos o añadir
   trabajos. Guardar + subir a GitHub = publicado en Cloudflare en ~30 s.

   ✦ Cursiva serif: *así* → para slogans o palabras sueltas, máximo 2 por párrafo
   ✦ Peso medium sutil: **así**
   ✦ Ocultar un trabajo sin borrarlo: hidden: true
   ✦ Párrafos: sepáralos con una línea en blanco (\n\n)

   ✦ IMÁGENES: van en /assets/media/<proyecto>/. Optimízalas antes de subirlas
   (JPG, 2400 px de lado largo, calidad ~80). Vídeos: MP4 H.264, < 10 MB.
   ========================================================================== */

const M = (p) => `assets/media/${p}.jpg`;   // atajo: M("summ/banner") → assets/media/summ/banner.jpg

window.CRU = {

  /* ---------------------------------------------------------------- SITIO */
  site: {
    name: "CRU",
    fullName: "Martín Cru",
    legalName: "Martín Cru Álvarez",    // nombre completo para el aviso legal
    role: "creative portfolio",
    location: "Madrid, Spain",
    email: "martincrualvare@gmail.com",
    socials: [
      { label: "Instagram", url: "https://www.instagram.com/_crudesign" },
      { label: "LinkedIn",  url: "https://www.linkedin.com/in/martincru/" }
    ],
    // Portfolio de fotografía (enlace en el menú y bloque al final de los trabajos)
    photoPortfolio: {
      url: "https://cruphoto.framer.website/",
      label: "For photography, there's a separate portfolio ↗"
    },
    aboutPhoto: "assets/media/about/img-7038.jpg",
    logoSVG: "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 274.08 97.89\" fill=\"currentColor\" role=\"img\" aria-label=\"CRU\"><path d=\"M272.59,9.76c7.92-43.67-57.95,74.91-63.01,48.1l1.28-.29c-3.97-.46,1.84-9.28,1.83-11.2l-1.25.49c-1.16-1.45,2.35-10.4,2.82-11.96h-.04s.92-.36.92-.36c.81-11.35,3.94-12.57-7.19-22.46-7.14,18.95-24.54,72.99,13.87,61.79,22.17-15.02,38.3-40.85,52.26-63.83L272.59,9.76Z\"/><path d=\"M70.44,62.74l1.23-.41c-1.26-8.07-5.33-3.2-10.63-1.51-73.34,33.89-50.23-31.44-.43-45.07,3.65-.64,1.74-1.98.59-4.14-1.55-4.9-6.99-4.91-11.43-3.84C-36.7,35.91,2.13,121.71,70.44,62.74Z\"/><path d=\"M161.07,59.54c-1.26-.62-3.29-1.36-5.7-2.17-14.89-5.48-32.64-10.88-20.28-12.89,7.28-3.22,22.05-9.23,21.69-20.03-.62.79-1.33,1.71-1.89,2.43.24-1.76.28-3.2,1.25-5.34-.04.01-.87.28-.92.29-.07-2.41-.93-4.03,2.23-3.85-13.97-8.28-11.26-10.26-30.29-5.95-.1-3.64-.72-5.22-1.71-5.17-.36-.24-.74.08-1.07.56-7.03,6.13-24.94,61.93-26.87,82.71-.12.51-.48,2.19-.2,1.21-.59,3.49-.27,3.66.14,4.02,0,.01,0,.03,0,.04,0,0,0-.02,0-.03.17.14.35.32.49.75-.2-.2-.36-.44-.48-.72.24,1.81.88,2.71,1.98,2.44,1.08-.06,4.57-.9,2.61-2.48,4.27.24.07-6.83,4.55-5.44,1.73-4.86,1.74-7.96,3.41-12.76-.27-.2-.55-.36-.81-.51.14-.86.77-2.28.84-3.14.42-.45.74-.81.96-1.16l.02-.01h0c.47-.81.36-1.53-.73-2.91l2.17.62c2.21-32.28,39.76-.36,59.38-4.14C171.08,64,166.7,61.8,161.07,59.54ZM99.46,96.68l2.16-.43C100.75,96.57,100.04,96.7,99.46,96.68ZM107.37,84.95s.04-.05.06-.07c-.05.13-.09.27-.14.4C107.31,85.17,107.34,85.06,107.37,84.95ZM122.85,43.4c.29-4.63,3.11-8.67,3.57-13.24.81-4,4.9-7.26,9.16-9.13,4.7-1.33,7.68-1.68,9.33-1.29,1.53.68,1.95,2.25.34,4.9-1.08,1.61-2.74,3.48-4.73,5.44C136.84,33.54,131.17,37.94,122.85,43.4Z\"/></svg>",

    // Inicio: frase corta → minúsculas, como siempre
    heroLine: "cru, that's me, a creative in the making.",
    heroAccent: "cru",                 // palabra de la frase que va en color de acento (--accent en style.css)
    // Línea de datos bajo la frase principal (corta, se lee de un vistazo)
    heroMeta: ["Photography — Digital design — Illustration", "Digital Design student, U-TAD", "Madrid, Spain"],


    // Sección "who is cru?" (fondo negro). Párrafos largos → mayúsculas normales
    about: "I flow across different artistic disciplines, from photography to illustration and digital design. I'm in a constant process of learning and growing, always striving to bring intention and sensitivity to each project, while being able to tell *meaningful stories*.",
    aboutMore: "My name is Martín Cru, I'm a student and creative in the making, currently studying Digital Design at U-TAD. I'm in a process of exploring and developing my own personal identity and style, but here you'll see a curated selection of some of my works. Hope you enjoy them :)",

    skills: [
      { title: "Photography",      items: ["Street photography", "Portrait photography", "Film photography", "Commercial photography"] },
      { title: "Design",           items: ["Brand design", "Logos", "Postproduction", "Posters", "Motion graphics"] },
      { title: "Visual direction", items: ["Art direction", "Storytelling", "Visual strategy"] },
      { title: "Illustration",     items: ["Digital", "Traditional"] }
    ],

    closing: ["enjoy", "true design"]
  },

  /* ------------------------------------------------------------- TRABAJOS
     Orden de la lista = orden en la home. Para añadir uno, copia un bloque
     { ... } entero y cambia los datos. URL: tudominio.com/project.html#slug

     cover:  { src, ratio, poster? }   ratio = proporción en la home ("3/2", "4/5", "16/9"...)
             Si src es .mp4 / .webm → vídeo en bucle, sin sonido.
     size:   "l" grande · "m" mediano · "s" pequeño
     color:  color al que cambia el fondo dentro del proyecto
     tags:   alimentan los filtros de la home

     blocks (en el orden que quieras):
       { type: "full",  src, ratio?, caption? }          imagen o vídeo a sangre
       { type: "inset", src, ratio?, caption? }          centrada, con aire
       { type: "pair",  ratio?, items: [{src},{src}] }   dos lado a lado
       { type: "trio",  ratio?, items: [{src},{src},{src}] }
         · sin ratio → cada foto/vídeo se ve con su tamaño natural (verticales incluidas)
         · widths: [7, 5] → anchos distintos (p. ej. horizontal grande + vertical estrecha)
         · align: "center" | "end" → alineación vertical dentro de la fila
         · inset con width: "wide" | "narrow" → centrada, más ancha o más estrecha
         · join: true → sin separación entre piezas (para composiciones que continúan)
       { type: "text",  title?, body }
       { type: "quote", body }
       { type: "color" } → desde aquí, fondo del color del proyecto
       { type: "light" } → vuelve a blanco
   ---------------------------------------------------------------------- */
  projects: [

    {
      slug: "summ",
      title: "SUMM",
      discipline: "Art Direction",
      tags: ["Art Direction", "Branding"],
      industry: "Cultural Event",
      year: "2025",
      client: "University",
      size: "l",
      color: "#5F6840",
      cover: { src: M("summ/portada"), ratio: "3/2" },
      intro: "SUMM is a fictional cultural event where music and cocktails come together in a single *sensory experience*. Set on the rooftop of La Casa Encendida in Madrid, the space transforms into a gateway to different cultures.\n\nMusic, flavour, rhythm, and energy blend as sounds from countries like Argentina and Brazil take over the atmosphere.",
      blocks: [
        { type: "full",  src: M("summ/banner"), ratio: "3/2" },
        { type: "quote", body: "Six bands, six genres, *six cocktails.*" },
        { type: "color" },
        { type: "pair",  ratio: "3/2", items: [ { src: M("summ/entrada2") }, { src: M("summ/pasaporte") } ] },
        { type: "full",  src: M("summ/poster3"), ratio: "3/2" },
        { type: "pair",  ratio: "3/2", items: [ { src: M("summ/poster1") }, { src: M("summ/poster2") } ] },
        { type: "light" },
        { type: "text",  title: "The line-up", body: "Throughout the summer months, visitors can enjoy live performances of tango, bossa nova, afrobeat, jazz, folk, and reggae, all within one vibrant setting." },
        { type: "pair",  ratio: "3/2", items: [ { src: M("summ/merch") }, { src: M("summ/instagram") } ] },
        { type: "full",  src: M("summ/pulseras"), ratio: "3/2" }
      ],
      credits: [ ["Art direction", "Martín Cru"] ]
    },

    {
      slug: "sapere",
      title: "SAPERE",
      discipline: "Branding",
      tags: ["Branding"],
      industry: "Restaurant",
      year: "2026",
      client: "Fictional",
      size: "m",
      color: "#1F2B3E",
      cover: { src: M("sapere/1-portada"), ratio: "16/9" },
      intro: "Modern cuisine as we know it today is the result of centuries of blending. Ingredients that traveled on ships, recipes handed down through families, techniques that migrated from one culture to another…\n\nOur restaurant is born from that history: a space that honors blending as *living knowledge*.",
      blocks: [
        { type: "full",  src: M("sapere/naming-1"), ratio: "16/9" },
        { type: "text",  title: "Concept", body: "At SAPERE, we step away from whimsical fusion to champion cuisine as a discipline of understanding. Derived from the Latin *sapĕre* (“to taste” and “to possess wisdom”), this project proposes understanding gastronomy not merely through flavor, but as a **living narrative**." },
        { type: "color" },
        { type: "quote", body: "We do not serve recipes; we serve *the origin of flavors.*" },
        { type: "full",  src: M("sapere/6-vitrina-poster"), ratio: "16/9" },
        { type: "pair",  ratio: "16/9", items: [ { src: M("sapere/3-colores") }, { src: M("sapere/4-naming-origen") } ] },
        { type: "pair",  ratio: "16/9", items: [ { src: M("sapere/7-tarjeta-visita") }, { src: M("sapere/9-posavasos-camiseta") } ] },
        { type: "full",  src: M("sapere/10-ticket"), ratio: "16/9" },
        { type: "light" }
      ],
      credits: [ ["Branding & visual identity", "Gloria Sarmiento, Martín Cru"], ["Context", "Fictional project at U-Tad"] ]
    },

    {
      slug: "haromy",
      title: "HAROMY",
      discipline: "Product & Branding",
      tags: ["Branding"],
      industry: "Perfume",
      year: "2024",
      client: "University",
      size: "m",
      color: "#4A0E15",
      cover: { src: M("haromy/post-haromy"), ratio: "4/5" },
      intro: "HAROMY, *Sound of Scent*, is a fragrance concept inspired by music, where sound and scent collide and rhythms move beyond the senses. The line features two distinct variants: “Misty Mood”, an elegant and refined jazz-inspired fragrance designed for him; and “Duende”, a scent shaped by the passion and intensity of flamenco, created for her.\n\nThe project involved the whole process of branding, copy, art direction, packaging and 3D rendering of the perfume bottles.",
      hero: { type: "full", src: M("haromy/dscf1131-1"), ratio: "16/9" },
      blocks: [
        { type: "color" },
        { type: "pair",  ratio: "4/5", items: [ { src: M("haromy/post-haromy") }, { src: M("haromy/post-haromy-3") } ] },
        { type: "inset", src: "assets/media/haromy/haromy-film.mp4", poster: "assets/media/haromy/haromy-film-poster.jpg", width: "narrow", sound: true, caption: "Campaign film" },
        { type: "light" },
        { type: "pair",  ratio: "4/5", items: [ { src: M("haromy/mesa-de-trabajo-5") }, { src: M("haromy/mesa-de-trabajo-6") } ] },
        { type: "pair",  ratio: "4/5", items: [ { src: M("haromy/mesa-de-trabajo-2") }, { src: M("haromy/mesa-de-trabajo-3") } ] },
        { type: "pair",  ratio: "4/5", join: true, items: [ { src: M("haromy/mesa-de-trabajo-1") }, { src: M("haromy/mesa-de-trabajo-1-copia") } ] }   // join: sin separación; las dos mitades forman la web "HAROMY"
      ],
      credits: [ ["Branding, copy, art direction, packaging & 3D", "Martín Cru"] ]
    },

    {
      slug: "casa-del-libro",
      title: "Casa del Libro",
      discipline: "Art Direction",
      tags: ["Art Direction", "Branding"],
      industry: "Bookshop",
      year: "2025",
      client: "Casa del Libro / Fictional",
      size: "m",
      color: "#33271F",
      cover: { src: M("casa-del-libro/mesa-de-trabajo-1"), ratio: "4/5" },
      intro: "As part of a university assignment, we were tasked with rebranding a well-known and established Spanish brand: Casa del Libro. Working alongside a colleague, we developed a proposal inspired by the Japanese aesthetic philosophy of *wabi-sabi*.\n\nOur approach aimed to bring a renewed elegance to the brand by embracing imperfection, natural textures, and refined design elements, creating a visual identity that feels both unique and contemporary, while still respecting the essence of Casa del Libro, and improves it with a renewed sense of **warmth, authenticity, and visual harmony**.",
      hero: { type: "pair", ratio: "4/5", items: [ { src: M("casa-del-libro/mesa-de-trabajo-1") }, { src: M("casa-del-libro/mesa-de-trabajo-10") } ] },
      blocks: [
        { type: "color" },
        { type: "trio",  ratio: "4/5", items: [ { src: M("casa-del-libro/mesa-de-trabajo-2") }, { src: M("casa-del-libro/mesa-de-trabajo-4") }, { src: M("casa-del-libro/mesa-de-trabajo-5") } ] },
        { type: "quote", body: "Beauty in *imperfection.*" },
        { type: "pair",  ratio: "4/5", items: [ { src: M("casa-del-libro/mesa-de-trabajo-3") }, { src: M("casa-del-libro/mesa-de-trabajo-7") } ] },
        { type: "inset", src: M("casa-del-libro/mesa-de-trabajo-6"), width: "narrow" },
        { type: "pair",  ratio: "4/5", items: [ { src: M("casa-del-libro/mesa-de-trabajo-8") }, { src: M("casa-del-libro/mesa-de-trabajo-9") } ] }
      ],
      credits: [ ["Art direction", "Martín Cru & colleague"], ["Context", "University assignment"] ]
    },

    {
      slug: "tealtro",
      title: "TEALTRO",
      discipline: "Art Direction & Branding",
      tags: ["Art Direction", "Branding"],
      industry: "Musical Theatre",
      year: "2024",
      client: "TEALTRO",
      size: "l",
      color: "#241D57",
      cover: { src: M("tealtro/post2"), ratio: "1/1" },
      intro: "TEALTRO, Teatro Alternativo de Las Rozas, is a musical theatre company driven by a single purpose: **inclusion**. With more than 50 members, including actors, musicians, production crew, and myself, TEALTRO is more than just a theatre company; *it's a family*.\n\nThis project is deeply personal, as I've been part of the company for over 11 years. For my final assignment in Art Direction, I chose to reimagine and modernize its entire visual presence, while also developing the identity for our new play, “La Red”: a dystopian story in which humanity confronts the ultimate form of control imposed by technology.",
      hero: { type: "pair", ratio: "4/5", items: [ { src: M("tealtro/post2") }, { src: M("tealtro/post1") } ] },
      blocks: [
        { type: "full",  src: M("tealtro/portada-efecto"), ratio: "16/9" },
        { type: "color" },
        { type: "full",  src: M("tealtro/pegatinas"), ratio: "3/2" },
        { type: "pair",  ratio: "3/2", items: [ { src: M("tealtro/tarjeta-id") }, { src: M("tealtro/web") } ] },
        { type: "inset", src: M("tealtro/post3"), width: "narrow" },
        { type: "light" },
        { type: "quote", body: "A dystopian story about *the ultimate form of control.*" },
        { type: "inset", src: M("tealtro/1748101299725-00e42050-c217-4605-b4c6-9e8d78aa1746-1"), width: "narrow", caption: "La Red — poster" },
        { type: "full",  src: M("tealtro/vinilo"), ratio: "3/2" },
        { type: "pair",  ratio: "3/2", items: [ { src: M("tealtro/entrada") }, { src: M("tealtro/tarjeta-la-red") } ] },
        { type: "full",  src: M("tealtro/banners") },
        { type: "full",  src: M("tealtro/propaganda-la-red-metro") }
      ],
      credits: [ ["Art direction & branding", "Martín Cru"] ]
    },

    {
      slug: "bold",
      title: "BOLD",
      discipline: "Graphic Design",
      tags: ["Branding", "Art Direction"],
      industry: "Design Festival",
      year: "2026",
      client: "U-tad · DIMAD · Matadero Madrid",
      size: "m",
      color: "#5B3FE0",
      cover: { src: M("bold/cartel-final-bold"), ratio: "1697/2400" },
      // ← BORRADOR: texto provisional, pendiente de que Martín lo confirme o lo reescriba
      intro: "BOLD is a festival on *the futures of design*, organised by U-tad at Central de Diseño, Matadero Madrid, together with DIMAD. Three days of talks, workshops and a competition for emerging talent.\n\nThe identity plays with fluid, iridescent gradients and a heavy wordmark, applied across posters, the event agenda, flyers, roll-ups and accreditation.",
      hero: { type: "pair", ratio: "1697/2400", items: [ { src: M("bold/cartel-final-bold") }, { src: M("bold/agenda-bold-con-imag") } ] },
      blocks: [
        { type: "color" },
        { type: "inset", src: M("bold/flyer-ultrabold"), caption: "Ultra Bold — open call" },
        { type: "full",  src: M("bold/rollup-bold"), ratio: "16/9" },
        { type: "inset", src: M("bold/lanyard-bold"), width: "narrow", caption: "Accreditation" },
        { type: "light" }
      ],
      credits: [ ["Graphic design", "Martín Cru & Flavia Alonso"], ["Organised by", "U-tad"] ]
    },

    {
      slug: "triada",
      title: "TRÍADA",
      discipline: "Photography",
      tags: ["Photography"],
      industry: "Artist Photoshoot",
      year: "2025",
      client: "Universal Studios",
      size: "m",
      color: "#2A2119",
      cover: { src: M("triada/dscf5022"), ratio: "16/9" },
      intro: "TRÍADA is an Argentinian band which started self-recording covers and sharing videos performing those songs in 2023. They quickly amassed millions of views and a global internet audience. As they gained momentum, they decided to call themselves TRÍADA, a reference to the musical language of three notes that make a chord, and *the sisterhood of three individuals*.\n\nI was given the incredible opportunity to capture some candid photos during their time in Madrid while they were recording their upcoming album. Including some analogue photos, outdoors and studio ones.",
      blocks: [
        { type: "full",  src: M("triada/dscf4464"), ratio: "16/9" },
        { type: "pair",  ratio: "16/9", items: [ { src: M("triada/dscf4556") }, { src: M("triada/dscf4562") } ] },
        { type: "full",  src: M("triada/dscf4691"), ratio: "16/9" },
        { type: "pair",  ratio: "16/9", items: [ { src: M("triada/dscf4597") }, { src: M("triada/dscf4601") } ] },
        { type: "pair",  ratio: "16/9", items: [ { src: M("triada/dscf4608") }, { src: M("triada/dscf4748") } ] },
        { type: "color" },
        { type: "quote", body: "Three notes that make a chord." },
        { type: "full",  src: M("triada/dscf4913"), ratio: "16/9" },
        { type: "pair",  ratio: "16/9", items: [ { src: M("triada/dscf4933") }, { src: M("triada/dscf4975") } ] },
        { type: "full",  src: M("triada/dscf5042"), ratio: "16/9" },
        { type: "text",  title: "On film", body: "Analogue photos taken around Madrid during the same days." },
        { type: "trio",  items: [
            { src: M("triada/imagen-de-whatsapp-2025-11-26-a-las-10-06-34-0d506fd9") },
            { src: M("triada/imagen-de-whatsapp-2025-11-26-a-las-10-06-34-16456890") },
            { src: M("triada/imagen-de-whatsapp-2025-11-26-a-las-10-06-34-cb03d37f") } ] },
        { type: "pair",  widths: [16, 11], align: "end", items: [
            { src: M("triada/imagen-de-whatsapp-2025-11-18-a-las-14-28-19-d45ce399") },
            { src: M("triada/imagen-de-whatsapp-2025-11-18-a-las-14-28-19-b48afe06") } ] },
        { type: "full",  src: M("triada/imagen-de-whatsapp-2025-11-18-a-las-14-28-19-b0926382") },
        { type: "light" },
        { type: "full",  src: M("triada/dscf5075"), ratio: "16/9" }
      ],
      credits: [ ["Photography", "Martín Cru"], ["Client", "Universal Studios"] ]
    },

    {
      slug: "personal-work",
      title: "Personal Work",
      discipline: "Graphic Design & Illustration",
      tags: ["Illustration"],
      industry: "Creativity",
      year: "2023–2025",
      client: "Myself",
      size: "m",
      color: "#E8E2D6",
      cover: { src: M("personal-work/proyectofinal-sanisidro-martincru"), ratio: "4/5" },
      intro: "A variety of my own poster designs and personal drawings and illustrations, as examples of *visual exploration* and creativity development.",
      hero: { type: "pair", ratio: "4/5", items: [ { src: M("personal-work/proyectofinal-sanisidro-martincru") }, { src: M("personal-work/imagen-de-whatsapp-2025-11-19-a-las-10-13-18-b22edc48") } ] },
      blocks: [
        { type: "full",  src: M("personal-work/poster-gilberto"), ratio: "3/2" },
        { type: "color" },
        { type: "pair",  ratio: "4/5", items: [ { src: M("personal-work/foto-art-2") }, { src: M("personal-work/foto-art") } ] },
        { type: "pair",  ratio: "4/3", items: [ { src: M("personal-work/captura-de-pantalla-2025-11-19-095746") }, { src: M("personal-work/imagen-de-whatsapp-2025-11-19-a-las-10-12-28-10cc3eaf") } ] },
        { type: "light" }
      ],
      credits: [ ["Design & illustration", "Martín Cru"] ]
    }

  ]
};
