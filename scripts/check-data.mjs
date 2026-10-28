// Comprueba que los datos del portfolio son coherentes antes de desplegar:
//
//   - src/data/creative.json (ilustración, diseño y trabajos en producción):
//     slugs únicos, campos obligatorios, categoría válida, imágenes que existen en
//     public/creative/<slug>/ con ancho y alto, y ninguna imagen ni carpeta sin usar.
//   - src/data/projects.json (proyectos propios, desde GitHub): campos obligatorios.
//   - Que ningún slug de /web se repita entre proyectos propios y trabajos en producción.
//   - Peso: ninguna imagen de más de 6 MB.
//
// Sale con código 1 si hay errores (la CI lo ejecuta con `npm run check:data`).
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs'

const root = new URL('../', import.meta.url)
const read = (file) => JSON.parse(readFileSync(new URL(file, root), 'utf8'))
const creative = read('src/data/creative.json')
const projects = read('src/data/projects.json')

const CATEGORIES = ['ilustracion', 'diseno', 'profesional']
const MAX_IMAGE_BYTES = 6 * 1024 * 1024
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

const errors = []
const warnings = []
const fail = (msg) => errors.push(msg)
const text = (v) => typeof v === 'string' && v.trim().length > 0

// --- creative.json ---
const slugs = new Set()
for (const p of creative) {
  const where = `creative.json «${p.slug ?? '?'}»`
  if (!SLUG.test(p.slug ?? '')) fail(`${where}: slug no válido`)
  if (slugs.has(p.slug)) fail(`${where}: slug repetido`)
  slugs.add(p.slug)
  if (!CATEGORIES.includes(p.category)) fail(`${where}: categoría «${p.category}» no válida (${CATEGORIES.join(', ')})`)
  for (const field of ['title', 'subtitle', 'description']) if (!text(p[field])) fail(`${where}: falta «${field}»`)
  if (p.year == null || Number.isNaN(parseInt(p.year, 10))) fail(`${where}: «year» no válido`)
  if (!Array.isArray(p.stack) || p.stack.length === 0) fail(`${where}: «stack» vacío`)
  if (p.liveUrl && !/^https:\/\//.test(p.liveUrl)) fail(`${where}: «liveUrl» tiene que ser https`)
  if (p.behance && !/^https:\/\/www\.behance\.net\//.test(p.behance)) fail(`${where}: «behance» no parece una URL de Behance`)
  if (p.category === 'profesional' && !p.liveUrl) fail(`${where}: un trabajo en producción necesita «liveUrl»`)

  if (!Array.isArray(p.images) || p.images.length === 0) {
    fail(`${where}: sin imágenes`)
    continue
  }
  const dir = new URL(`public/creative/${p.slug}/`, root)
  const used = new Set()
  for (const im of p.images) {
    if (used.has(im.file)) fail(`${where}: imagen «${im.file}» repetida`)
    used.add(im.file)
    if (!existsSync(new URL(im.file, dir))) {
      fail(`${where}: no existe public/creative/${p.slug}/${im.file}`)
      continue
    }
    if (!(im.width > 0 && im.height > 0)) fail(`${where}/${im.file}: falta width o height`)
    if (statSync(new URL(im.file, dir)).size > MAX_IMAGE_BYTES) fail(`${where}/${im.file}: pesa más de 6 MB`)
  }
  if (existsSync(dir)) {
    for (const file of readdirSync(dir)) if (!used.has(file)) warnings.push(`${where}: public/creative/${p.slug}/${file} no se usa en creative.json`)
  }
}

// Carpetas de public/creative sin ficha
for (const dir of readdirSync(new URL('public/creative/', root))) {
  if (!slugs.has(dir)) warnings.push(`public/creative/${dir}/ no tiene ficha en creative.json`)
}

// --- projects.json ---
const projectSlugs = new Set()
for (const p of projects) {
  const where = `projects.json «${p.slug ?? '?'}»`
  if (!SLUG.test(p.slug ?? '')) fail(`${where}: slug no válido`)
  if (projectSlugs.has(p.slug)) fail(`${where}: slug repetido`)
  projectSlugs.add(p.slug)
  for (const field of ['title', 'description']) if (!text(p[field])) fail(`${where}: falta «${field}»`)
  if (!Array.isArray(p.stack)) fail(`${where}: «stack» no es una lista`)
}

// /web/<slug> lo comparten los proyectos propios y los trabajos en producción
for (const p of creative.filter((c) => c.category === 'profesional')) {
  if (projectSlugs.has(p.slug)) fail(`el slug «${p.slug}» está en projects.json y en los trabajos en producción (/web/${p.slug})`)
}

for (const w of warnings) console.warn(`aviso: ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`error: ${e}`)
  console.error(`\ncheck-data: ${errors.length} error(es)`)
  process.exit(1)
}
console.log(`check-data: ${creative.length} fichas creativas (${creative.reduce((n, p) => n + p.images.length, 0)} imágenes) y ${projects.length} proyectos propios, todo coherente.`)
