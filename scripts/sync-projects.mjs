// Genera src/data/projects.json directamente desde GitHub: cada repositorio de
// GITHUB_OWNER con el topic "portfolio" es un proyecto de la web. No hay ningún
// JSON escrito a mano; lo que se ve aquí se cambia en GitHub:
//
//   slug        nombre del repositorio en minúsculas (/proyectos/<slug>)
//   title       primer título (# ...) del README; lo que va tras " - " se descarta.
//               Sin README, o si es el nombre del repo tal cual, se usa el nombre
//               sin guiones (zara-phones -> zara phones)
//   subtitle    texto del "About" (descripción) del repo hasta el primer ": "
//               (si tiene menos de 40 caracteres y no lleva punto)
//   description el resto del "About", empezando en mayúscula
//   stack       los topics, menos "portfolio" y "category-*"
//   category    el topic "category-<nombre>"; por defecto "web"
//   year        año de creación o "creación-último push"
//   repoUrl     la URL del repo (vacía si el repo es privado)
//   liveUrl     el campo "Website" del repo
//   orden       último push primero
//
// Las capturas siguen siendo ficheros del portfolio (src/assets/projects y
// src/data/projectGalleries.js, por slug).
//
// Se ejecuta antes del build (prebuild). projects.json se versiona como copia de
// seguridad: si la API de GitHub falla (sin red, límite de peticiones), se deja
// tal cual y el build sigue. GITHUB_TOKEN (opcional) sube el límite de 60 a 5000
// peticiones por hora y, si tiene acceso, incluye también los repos privados con el
// topic "portfolio" (sin enlace al repo).
import { readFileSync, writeFileSync } from 'node:fs'

const OWNER = process.env.GITHUB_OWNER || 'wavesforweirdos'
const TOPIC = 'portfolio'
const OUT = new URL('../src/data/projects.json', import.meta.url)

const headers = (accept = 'application/vnd.github+json') => {
  const h = { Accept: accept, 'User-Agent': 'wavesforweirdos-sync' }
  if (process.env.GITHUB_TOKEN) h.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  return h
}

async function fetchRepos() {
  // Con token, /user/repos incluye los privados; sin él, solo los públicos del usuario.
  const url = process.env.GITHUB_TOKEN
    ? 'https://api.github.com/user/repos?affiliation=owner&per_page=100&sort=pushed&page='
    : `https://api.github.com/users/${OWNER}/repos?type=owner&per_page=100&sort=pushed&page=`
  const repos = []
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(url + page, { headers: headers() })
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const batch = await res.json()
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos.filter((r) => r.owner?.login?.toLowerCase() === OWNER.toLowerCase() && !r.archived && !r.fork && r.topics?.includes(TOPIC))
}

async function readmeTitle(repo) {
  try {
    const res = await fetch(`https://api.github.com/repos/${OWNER}/${repo.name}/readme`, {
      headers: headers('application/vnd.github.raw+json'),
    })
    if (!res.ok) return null
    const match = (await res.text()).match(/^#\s+(.+)$/m)
    return match ? match[1].replace(/\s+[-–—]\s+.*$/, '').trim() : null
  } catch {
    return null
  }
}

const prettify = (name) => name.replace(/[-_]+/g, ' ').trim()
const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const yearsOf = (repo) => {
  const a = new Date(repo.created_at).getFullYear()
  const b = new Date(repo.pushed_at).getFullYear()
  return a === b ? a : `${a}-${b}`
}
const capitalize = (text) => (text ? text.charAt(0).toUpperCase() + text.slice(1) : text)

// "Subtítulo: descripción larga" -> { subtitle, description }
function splitAbout(about) {
  const text = (about ?? '').trim()
  const i = text.indexOf(': ')
  if (i > 0 && i < 40 && !text.slice(0, i).includes('.')) {
    return { subtitle: text.slice(0, i), description: capitalize(text.slice(i + 2).trim()) }
  }
  return { subtitle: null, description: text }
}

let repos
try {
  repos = await fetchRepos()
} catch (err) {
  console.warn(`sync-projects: sin datos de GitHub (${err.message}); se conserva src/data/projects.json.`)
  process.exit(0)
}

const projects = []
for (const repo of repos) {
  const readme = await readmeTitle(repo)
  const isRawName = !readme || readme === repo.name
  const { subtitle, description } = splitAbout(repo.description)
  const category = repo.topics.find((t) => t.startsWith('category-'))?.slice('category-'.length)
  projects.push({
    slug: slugify(repo.name),
    title: isRawName ? prettify(repo.name) : readme,
    subtitle,
    year: yearsOf(repo),
    category: category || 'web',
    description,
    stack: repo.topics.filter((t) => t !== TOPIC && !t.startsWith('category-')),
    repoUrl: repo.private ? null : repo.html_url,
    liveUrl: repo.homepage || null,
    cover: null,
    pushedAt: repo.pushed_at,
  })
}

// Los más recientes primero.
projects.sort((a, b) => b.pushedAt.localeCompare(a.pushedAt))
for (const p of projects) delete p.pushedAt

const json = JSON.stringify(projects, null, 2).replace(/\[\n\s+("(?:[^"\n]|\\")*"(?:,\n\s+"(?:[^"\n]|\\")*")*)\n\s+\]/g, (_, items) =>
  `[${items.replace(/,\n\s+/g, ', ')}]`,
)

let previous = ''
try {
  previous = readFileSync(OUT, 'utf8')
} catch {
  // primera vez
}
if (previous.replace(/\r\n/g, '\n') !== `${json}\n`) writeFileSync(OUT, `${json}\n`)
console.log(`sync-projects: ${projects.length} proyectos desde GitHub (${process.env.GITHUB_TOKEN ? 'con' : 'sin'} token).`)
