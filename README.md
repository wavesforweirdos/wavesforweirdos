# wavesforweirdos

> Portfolio y CV de Marta Cruz, Full Stack / Frontend Developer en Barcelona.

**Web:** https://www.wavesforweirdos.com

Sitio estático multipágina, sin backend, con un diseño editorial y minimalista construido a medida a partir del diseño de Figma: fondo claro con grano sutil, tipografía grande y un único acento verde.

## Páginas

| Ruta | Contenido |
|---|---|
| `/` | Home con las áreas de trabajo |
| `/about` | Bio, servicios, experiencia y skills |
| `/web` | Listado de desarrollo web con filtro (`?grupo=produccion` / `propios`) y el stack de cada uno |
| `/web/:slug` | Ficha de proyecto: descripción, enlaces, stack y capturas |
| `/ilustracion`, `/diseno` | Listados y fichas (`/ilustracion/:slug`, `/diseno/:slug`) de los trabajos de Behance, desde `src/data/creative.json` |
| `/proyectos`, `/profesional` | Redirigen a `/web` |
| `*` | Página 404 |

## Características

- Navegación en cliente con React Router y menú fijo inferior, que en móvil y tablet pasa a un panel lateral a pantalla completa.
- Preloader en la primera visita de cada sesión del navegador y layouts propios para móvil, tablet y escritorio.
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
scripts/          sync-projects.mjs y generate-seo-files.mjs
src/
  assets/         Fuentes, fotos de perfil e imágenes de proyectos
  components/     DotLink, DotLinkGrid, Layout, Nav y Preloader
  data/           profile, experience, skills, projects (JSON generado desde GitHub) y projectGalleries.js
  hooks/          usePageMeta (título y metadatos por página)
  pages/          Home, About, Projects, ProjectDetail y NotFound
  styles/         tokens, fuentes, estilos globales y mixins (_focus, _a11y)
```

Cada componente y cada página tienen su `.jsx` y su `.scss` juntos.

## Proyectos y GitHub

Los proyectos **salen directamente de GitHub**; no hay ningún JSON escrito a mano. En cada build (`npm run sync`, que `prebuild` ejecuta antes de `npm run seo`) el script `scripts/sync-projects.mjs` lee los repos de `wavesforweirdos` con el topic `portfolio`:

| En la web | De dónde sale en GitHub |
|---|---|
| Título | Primer `# título` del README (lo que va tras ` - ` se descarta); sin README, el nombre del repo |
| Subtítulo | Texto del **About** hasta el primer `: ` (si es corto y sin punto) |
| Descripción | El resto del **About**. Escríbelo como `Subtítulo: descripción larga` (hasta 350 caracteres) |
| Stack | Los topics, salvo `portfolio` y `category-*` |
| Categoría | El topic `category-<nombre>` (por defecto, `web`) |
| Año | Año de creación del repo y de su último push |
| Enlaces | URL del repo y campo **Website** (enlace "ver sitio") |
| Orden | Último push primero |

Para añadir un proyecto basta con ponerle el topic `portfolio` a su repo y rellenar su About, topics y Website. Para sacarlo de la web, quitarle el topic. Lo único que sigue siendo del portfolio son las **capturas**: `src/assets/projects/<slug>/` y `src/data/projectGalleries.js` (el slug es el nombre del repo en minúsculas), siempre con `width` y `height` reales.

- `src/data/projects.json` es el resultado generado y se versiona como copia de seguridad: si la API de GitHub falla, el build lo deja como está y no se rompe.
- `GITHUB_TOKEN` (opcional, variable de entorno en Vercel) sube el límite de peticiones y permite incluir repos **privados** con el topic `portfolio` (sin enlace al repo). Sin token solo salen los públicos.
- El workflow `Refresh projects` pide un deploy a Vercel cada lunes (y a mano), así los cambios en GitHub llegan a la web sin tocar este repositorio. Necesita el secreto `VERCEL_DEPLOY_HOOK` (Project Settings > Git > Deploy Hooks).
