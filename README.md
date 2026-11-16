# CRU — portfolio

Web propia en HTML, CSS y JavaScript, sin plantillas ni frameworks y sin paso de compilación.
Se publica en **Cloudflare Pages** y se actualiza sola cada vez que hay un cambio en **GitHub**.

```
index.html            Home: frase + trabajos + who is cru + contacto
project.html          Plantilla única de proyecto (project.html#slug)
assets/js/data.js     ← TODO EL CONTENIDO: textos, trabajos, imágenes, vídeos
assets/js/main.js     Lógica: render, animaciones, cambios de color, vídeo
assets/css/style.css  Diseño
assets/media/         Tus fotos y vídeos (crea una carpeta por proyecto)
_headers              Caché de Cloudflare
```

## 1 · Subirlo a GitHub (una vez)
1. Crea una cuenta en github.com y un repositorio nuevo, por ejemplo `cru-portfolio` (puede ser privado).
2. Sube el contenido de esta carpeta (botón **Add file → Upload files**, arrastra todo y pulsa *Commit*).

## 2 · Publicarlo en Cloudflare Pages (una vez)
1. Crea una cuenta en dash.cloudflare.com → **Workers & Pages → Create → Pages → Connect to Git**.
2. Elige el repositorio `cru-portfolio`.
3. Configuración de build: *Framework preset* **None**, *Build command* **vacío**, *Build output directory* **/**.
4. **Save and Deploy**. En menos de un minuto tendrás `cru-portfolio.pages.dev`.

## 3 · Dominio propio
1. En Cloudflare → **Domain Registration → Register Domains**, busca tu dominio (p. ej. `cru.studio`, `martincru.com`). Cloudflare lo vende a precio de coste.
2. En tu proyecto de Pages → **Custom domains → Set up a domain** → escribe el dominio. Como está en Cloudflare, el DNS y el HTTPS se configuran solos.

## 4 · Añadir o cambiar un trabajo
1. Sube las fotos/vídeos a `assets/media/nombre-proyecto/`.
2. En `assets/js/data.js`, copia un bloque de proyecto, cambia los datos y apunta `src` a tus archivos
   (`"assets/media/summ/cover.mp4"`).
3. Commit en GitHub → Cloudflare lo publica en unos 30 segundos.

O mándame el material y los textos en el chat del proyecto: con acceso al repositorio, hago el cambio y el push yo.

### Recomendaciones para medios
- **Fotos**: JPG o WebP, 2400 px de lado largo como máximo, calidad 80 (≈ 300–600 KB).
- **Vídeo de portada / bucle**: MP4 H.264 sin audio, 6–12 s, 1920 px, < 5 MB. Añade `poster` con un fotograma JPG.
- **Vídeos largos**: Cloudflare Stream o R2 (el repo de GitHub no admite archivos de más de 100 MB).

## Tipografía
Por defecto se usa **Inter Tight 300** (gratuita, de Google Fonts), muy cercana a Neue Haas Grotesk Display Light.
Si tienes licencia web de Neue Haas Grotesk Display (Adobe Fonts con Creative Cloud, o Monotype):
1. Crea un *Web Project* en Adobe Fonts con la familia y copia su `<link>`.
2. Pégalo en el `<head>` de `index.html` y `project.html`. El CSS ya la usa en primer lugar (`--font-display`).

> Ojo: si la licencia de Adobe es la de la universidad, la fuente dejará de servirse cuando caduque; la web volverá sola a Inter Tight.

Palabras clave en cursiva serif (**Instrument Serif Italic**): en `data.js`, rodea el texto con asteriscos: `*meaningful stories*`.
Etiquetas pequeñas: **JetBrains Mono** en mayúsculas.

## Logo
El logo ya está integrado (`logoSVG` en `data.js`, y una copia en `assets/logo-cru.svg`). Usa `fill="currentColor"`,
así que cambia solo a blanco o negro según el fondo. Se usa en la cabecera, en el pie gigante y en el favicon.
