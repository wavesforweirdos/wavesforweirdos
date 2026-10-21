# wavesforweirdos

> Portfolio y CV de Marta Cruz, Full Stack / Frontend Developer en Barcelona.

**Web:** https://www.wavesforweirdos.com

Sitio estático multipágina, sin backend, con un diseño editorial y minimalista construido a medida a partir del diseño de Figma: fondo claro con grano sutil, tipografía grande y un único acento verde.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Home con las áreas de trabajo |
| `/about` | Bio, servicios, experiencia y skills |
| `/proyectos` | Listado de proyectos con el stack de cada uno |
| `/proyectos/:slug` | Ficha de proyecto: descripción, enlaces, stack y capturas |
| `*` | Página 404 |

## Características

- Navegación en cliente con React Router y menú fijo inferior, que en móvil y tablet pasa a un panel lateral a pantalla completa.
- Preloader inicial y layouts propios para móvil, tablet y escritorio.
- Contenido editable en JSON (perfil, experiencia, skills y proyectos), sin tocar los componentes.
- Foco de teclado coherente en toda la web: subrayado grueso en los enlaces de texto y outline en iconos y controles, con el mismo grosor y definido con mixins de SCSS.
- Accesibilidad: HTML semántico, un `h1` por página, galerías de capturas accesibles con teclado, textos alternativos y respeto a `prefers-reduced-motion`.
- SEO: título, descripción, `canonical` y Open Graph por página, datos estructurados JSON-LD, `robots.txt`, `sitemap.xml` y `llms.txt` generados desde los datos de los proyectos y 404 con `noindex`.

## Tecnologías

| | |
|---|---|
| **Framework** | [React 19](https://react.dev/) |
| **Enrutado** | [React Router 7](https://reactrouter.com/) |
| **Build** | [Vite 8](https://vite.dev/) |
| **Estilos** | [Sass](https://sass-lang.com/) (SCSS) con tokens de diseño, sin librerías de UI |
| **Tipografía** | HK Grotesk y JetBrains Mono, alojadas en el propio proyecto |
| **Calidad** | [Oxlint](https://oxc.rs/docs/guide/usage/linter) |
| **Hosting** | [Vercel](https://vercel.com/) |

Pendiente de incorporar: scroll suave y animaciones al hacer scroll (Lenis y GSAP) y una pieza de visualización 2D/3D (Three.js con React Three Fiber). Las dependencias ya están instaladas, pero todavía no se usan.

## Primeros pasos

Requiere Node 20.19+ o 22.12+.

```sh
git clone https://github.com/wavesforweirdos/wavesforweirdos
cd wavesforweirdos
npm install
npm run dev
```

| Script | Descripción |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Genera el sitemap y compila para producción en `dist/` |
| `npm run preview` | Sirve la build de producción en local |
| `npm run lint` | Analiza el código con Oxlint |
| `npm run seo` | Regenera `public/sitemap.xml` y `public/llms.txt` desde los datos |

## Estructura

```
public/           Favicon, imagen Open Graph, robots.txt, sitemap.xml y llms.txt
scripts/          generate-seo-files.mjs
src/
  assets/         Fuentes, fotos de perfil e imágenes de proyectos
  components/     DotLink, DotLinkGrid, Layout, Nav y Preloader
  data/           profile, experience, skills y projects (JSON) y projectGalleries.js
  hooks/          usePageMeta (título y metadatos por página)
  pages/          Home, About, Projects, ProjectDetail y NotFound
  styles/         tokens, fuentes, estilos globales y mixins (_focus, _a11y)
```

Cada componente y cada página tienen su `.jsx` y su `.scss` juntos.

## Añadir un proyecto

1. Añade una entrada en `src/data/projects.json` con `slug`, `title`, `year`, `category`, `description`, `stack`, `repoUrl` y `liveUrl`.
2. Si quieres mostrar capturas, guárdalas en `src/assets/projects/<slug>/` y regístralas en `src/data/projectGalleries.js`, indicando su `width` y `height` reales.
3. El sitemap y `llms.txt` se actualizan solos al ejecutar `npm run build`.
