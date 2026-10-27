// Genera public/sitemap.xml y public/llms.txt a partir de las rutas fijas, de
// src/data/projects.json y de src/data/profile.json, para que cada proyecto
// nuevo entre solo en ambos. Se ejecuta antes del build (prebuild) y el
// resultado se versiona en public/.
import { readFileSync, writeFileSync } from 'node:fs'

const SITE_URL = 'https://www.wavesforweirdos.com'
const read = (file) => JSON.parse(readFileSync(new URL(`../src/data/${file}`, import.meta.url), 'utf8'))
const projects = read('projects.json')
const creative = read('creative.json')
const profile = read('profile.json')
const illustration = creative.filter((p) => p.category === 'ilustracion')
const design = creative.filter((p) => p.category === 'diseno')
const professional = creative.filter((p) => p.category === 'profesional')

// --- sitemap.xml ---
const paths = [
  '/',
  '/about',
  '/proyectos',
  ...projects.map((p) => `/proyectos/${p.slug}`),
  '/ilustracion',
  ...illustration.map((p) => `/ilustracion/${p.slug}`),
  '/diseno',
  ...design.map((p) => `/diseno/${p.slug}`),
  '/profesional',
  ...professional.map((p) => `/profesional/${p.slug}`),
]
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${paths.map((p) => `  <url>\n    <loc>${SITE_URL}${p}</loc>\n  </url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), sitemap)

// --- llms.txt (https://llmstxt.org): resumen del sitio en Markdown para agentes de IA ---
const oneLine = (text, max = 160) => {
  const t = text.replace(/\s+/g, ' ').trim()
  return t.length <= max ? t : `${t.slice(0, max).replace(/\s+\S*$/, '')}…`
}
const llms = `# wavesforweirdos

> Portfolio y CV de ${profile.name}, ${profile.role} en Barcelona. Sitio estático multipágina con su presentación, experiencia, skills y proyectos web.

## Páginas

- [Home](${SITE_URL}/): áreas de trabajo.
- [About](${SITE_URL}/about): bio, servicios, experiencia y skills.
- [Proyectos](${SITE_URL}/proyectos): listado de proyectos web.
- [Ilustración](${SITE_URL}/ilustracion): ilustración, concept art y dibujo.
- [Diseño](${SITE_URL}/diseno): identidad, cartelería, diseño editorial y landings.
- [Profesional](${SITE_URL}/profesional): webs inmobiliarias desarrolladas en Mediaelx.

## Proyectos

${projects.map((p) => `- [${p.title}](${SITE_URL}/proyectos/${p.slug}): ${oneLine(p.description)}`).join('\n')}

## Ilustración

${illustration.map((p) => `- [${p.title}](${SITE_URL}/ilustracion/${p.slug}): ${oneLine(p.description)}`).join('\n')}

## Diseño

${design.map((p) => `- [${p.title}](${SITE_URL}/diseno/${p.slug}): ${oneLine(p.description)}`).join('\n')}

## Profesional

${professional.map((p) => `- [${p.title}](${SITE_URL}/profesional/${p.slug}): ${oneLine(p.description)}`).join('\n')}

## Enlaces

- [GitHub](${profile.contact.github})
- [LinkedIn](${profile.contact.linkedin})
- [Behance](${profile.contact.behance})

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
`
writeFileSync(new URL('../public/llms.txt', import.meta.url), llms)

console.log(`sitemap.xml: ${paths.length} URLs · llms.txt: ${projects.length} proyectos + ${creative.length} de ilustración, diseño y profesional`)
