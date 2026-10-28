// Después de `vite build`: genera una página HTML por ruta (dist/web/munfort/index.html...)
// copiando dist/index.html y cambiando solo la cabecera: título, descripción, canonical,
// Open Graph y Twitter. La app es la misma SPA; esto es para quien lee solo el <head>
// sin ejecutar JavaScript (vistas previas al compartir en WhatsApp, LinkedIn, Slack...
// y rastreadores). Los textos salen de los mismos módulos que usa el hook usePageMeta.
//
//   - Rutas: /about, /web, /ilustracion, /diseno y la ficha de cada proyecto (/web/<slug>,
//     /ilustracion/<slug>, /diseno/<slug>). La home y el 404 se quedan con dist/index.html.
//   - Imagen: la primera de la ficha. En los trabajos de Behance y de Mediaelx es
//     public/creative/<slug>/<archivo>; en los proyectos de GitHub, la primera captura de
//     projectGalleries.js (con su nombre con hash, que sale del manifest de Vite).
//     Si no hay imagen se deja la imagen general (og-image.png).
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { SITE_URL, fullTitle, truncate } from '../src/utils/meta.js'
import { aboutMeta, sectionsMeta } from '../src/data/sectionsMeta.js'

const root = new URL('../', import.meta.url)
const dist = new URL('dist/', root)
const read = (file) => readFileSync(new URL(file, root), 'utf8')
const template = readFileSync(new URL('index.html', dist), 'utf8')
const projects = JSON.parse(read('src/data/projects.json'))
const creative = JSON.parse(read('src/data/creative.json'))

// --- imágenes de los proyectos de GitHub: slug -> ruta en dist (con hash) ---
const manifestUrl = new URL('.vite/manifest.json', dist)
const manifest = existsSync(manifestUrl) ? JSON.parse(readFileSync(manifestUrl, 'utf8')) : {}
const galleries = read('src/data/projectGalleries.js')
const importPath = {}
for (const m of galleries.matchAll(/^import (\w+) from '\.\.\/(assets\/projects\/[^']+)'/gm)) importPath[m[1]] = `src/${m[2]}`
const githubImage = (slug) => {
  const m = galleries.match(new RegExp(`['"]?${slug}['"]?:\\s*\\[\\s*\\{\\s*src:\\s*(\\w+)`))
  const file = m && manifest[importPath[m[1]]]?.file
  return file ? `${SITE_URL}/${file}` : null
}

// --- helpers para cambiar etiquetas del <head> ---
const esc = (v) => String(v).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
function setMeta(html, attr, name, value) {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")[^"]*(")`)
  if (!re.test(html)) throw new Error(`index.html no tiene <meta ${attr}="${name}">`)
  return html.replace(re, (_, a, b) => `${a}${esc(value)}${b}`)
}
const dropMeta = (html, attr, name) => html.replace(new RegExp(`\\s*<meta\\s+${attr}="${name}"\\s+content="[^"]*"\\s*/?>`), '')

function render({ path, title, description, image }) {
  const url = `${SITE_URL}${path}`
  const pageTitle = fullTitle(title)
  let html = template
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${esc(pageTitle)}</title>`)
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, (_, a, b) => `${a}${url}${b}`)
  html = setMeta(html, 'name', 'description', description)
  html = setMeta(html, 'property', 'og:title', pageTitle)
  html = setMeta(html, 'property', 'og:description', description)
  html = setMeta(html, 'property', 'og:url', url)
  html = setMeta(html, 'name', 'twitter:title', pageTitle)
  html = setMeta(html, 'name', 'twitter:description', description)
  if (image) {
    html = setMeta(html, 'property', 'og:image', image)
    html = setMeta(html, 'name', 'twitter:image', image)
    html = setMeta(html, 'property', 'og:image:alt', title)
    // el ancho y el alto de og-image.png no valen para otra imagen
    html = dropMeta(html, 'property', 'og:image:width')
    html = dropMeta(html, 'property', 'og:image:height')
  }
  return html
}

function write(route) {
  const dir = new URL(`${route.path.slice(1)}/`, dist)
  mkdirSync(dir, { recursive: true })
  writeFileSync(new URL('index.html', dir), render(route))
}

// --- rutas ---
const routes = [{ path: aboutMeta.path, title: aboutMeta.metaTitle, description: aboutMeta.metaDescription }]

for (const section of Object.values(sectionsMeta)) {
  routes.push({ path: section.path, title: section.metaTitle, description: section.metaDescription })
}

for (const p of projects) {
  routes.push({ path: `/web/${p.slug}`, title: p.title, description: truncate(p.description), image: githubImage(p.slug) })
}

const sectionOf = { ilustracion: '/ilustracion', diseno: '/diseno', profesional: '/web' }
for (const p of creative) {
  const first = p.images[0]
  routes.push({
    path: `${sectionOf[p.category]}/${p.slug}`,
    title: p.title,
    description: truncate(p.description),
    image: first ? `${SITE_URL}/creative/${p.slug}/${first.file}` : null,
  })
}

for (const route of routes) write(route)

// el manifest solo hacía falta para localizar las capturas; no se sirve
rmSync(new URL('.vite/', dist), { recursive: true, force: true })

const withImage = routes.filter((r) => r.image).length
console.log(`prerender-meta: ${routes.length} páginas con su cabecera (${withImage} con imagen propia).`)
