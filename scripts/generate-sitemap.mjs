// Genera public/sitemap.xml a partir de las rutas fijas y de src/data/projects.json,
// para que cada proyecto nuevo entre solo en el sitemap. Se ejecuta antes del
// build (prebuild) y el resultado se versiona en public/.
import { readFileSync, writeFileSync } from 'node:fs'

const SITE_URL = 'https://www.wavesforweirdos.com'
const projects = JSON.parse(readFileSync(new URL('../src/data/projects.json', import.meta.url), 'utf8'))

const paths = ['/', '/about', '/proyectos', ...projects.map((p) => `/proyectos/${p.slug}`)]

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url>\n    <loc>${SITE_URL}${p === '/' ? '/' : p}</loc>\n  </url>`).join('\n')}
</urlset>
`

writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap.xml: ${paths.length} URLs`)
