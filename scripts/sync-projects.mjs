// Genera src/data/projects.json a partir de dos fuentes:
//
//  1. GitHub: los repositorios públicos de GITHUB_OWNER con el topic "portfolio".
//     Aportan lo que es un hecho del repo: repoUrl (html_url), liveUrl (campo
//     "Website" / homepage) y, si el proyecto no tiene texto propio, descripción,
//     stack (lenguaje y topics) y años (creación y último push).
//  2. src/data/projects.overrides.json: lo editorial, que GitHub no sabe: título,
//     descripción larga en español, categoría, stack, año, portada y el ORDEN en
//     que se muestran. Un campo escrito aquí siempre gana al de GitHub.
//
// Reglas:
//  - Una entrada con "repo" sale solo si ese repo tiene el topic "portfolio"
//    (quitar el topic lo oculta de la web). Una entrada sin "repo" (repos
//    privados o ajenos) sale siempre y lleva su propio repoUrl/liveUrl.
//  - Un repo con el topic y sin entrada aparece solo, al final, con datos de GitHub.
//  - Si la API falla (sin red, límite de peticiones), se construye con los datos
//    de overrides y la URL del repo, para que el build nunca se rompa.
//
// Se ejecuta antes del build (prebuild) y el resultado se versiona. GITHUB_TOKEN
// (opcional) sube el límite de la API de 60 a 5000 peticiones por hora.
import { readFileSync, writeFileSync } from 'node:fs'

const OWNER = process.env.GITHUB_OWNER || 'wavesforweirdos'
const TOPIC = 'portfolio'
const dataUrl = (file) => new URL(`../src/data/${file}`, import.meta.url)
const overrides = JSON.parse(readFileSync(dataUrl('projects.overrides.json'), 'utf8'))

async function fetchRepos() {
  const headers = { Accept: 'application/vnd.github+json', 'User-Agent': 'wavesforweirdos-sync' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  const repos = []
  for (let page = 1; page <= 5; page++) {
    const res = await fetch(
      `https://api.github.com/users/${OWNER}/repos?per_page=100&type=owner&sort=pushed&page=${page}`,
      { headers },
    )
    if (!res.ok) throw new Error(`GitHub API ${res.status}`)
    const batch = await res.json()
    repos.push(...batch)
    if (batch.length < 100) break
  }
  return repos.filter((r) => !r.private && !r.archived && !r.fork)
}

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
const prettify = (name) => name.replace(/[-_]+/g, ' ').toLowerCase()
const yearsOf = (repo) => {
  const a = new Date(repo.created_at).getFullYear()
  const b = new Date(repo.pushed_at).getFullYear()
  return a === b ? a : `${a}-${b}`
}

let repos = null
try {
  repos = await fetchRepos()
} catch (err) {
  console.warn(`sync-projects: sin datos de GitHub (${err.message}); se usan solo los overrides.`)
}
const byName = new Map((repos ?? []).map((r) => [r.name.toLowerCase(), r]))
const tagged = (r) => r.topics?.includes(TOPIC)

const projects = []
const used = new Set()

for (const entry of overrides) {
  const { repo: repoName, ...fields } = entry
  if (!repoName) {
    projects.push({
      slug: fields.slug,
      title: fields.title,
      subtitle: fields.subtitle ?? null,
      year: fields.year,
      category: fields.category ?? 'web',
      description: fields.description ?? '',
      stack: fields.stack ?? [],
      repoUrl: fields.repoUrl ?? null,
      liveUrl: fields.liveUrl ?? null,
      cover: fields.cover ?? null,
    })
    continue
  }
  const repo = byName.get(repoName.toLowerCase())
  if (repos && !(repo && tagged(repo))) {
    console.warn(`sync-projects: "${repoName}" no tiene el topic "${TOPIC}" en GitHub; se omite.`)
    continue
  }
  if (repo) used.add(repo.name.toLowerCase())
  projects.push({
    slug: fields.slug,
    title: fields.title ?? prettify(repoName),
    subtitle: fields.subtitle ?? null,
    year: fields.year ?? (repo ? yearsOf(repo) : null),
    category: fields.category ?? 'web',
    description: fields.description ?? repo?.description ?? '',
    stack: fields.stack ?? [repo?.language, ...(repo?.topics ?? []).filter((t) => t !== TOPIC)].filter(Boolean),
    repoUrl: repo?.html_url ?? `https://github.com/${OWNER}/${repoName}`,
    liveUrl: repo?.homepage || fields.liveUrl || null,
    cover: fields.cover ?? null,
  })
}

// Repos con el topic que todavía no tienen entrada: aparecen solos, los más recientes primero.
for (const repo of repos ?? []) {
  if (!tagged(repo) || used.has(repo.name.toLowerCase())) continue
  const category = repo.topics.find((t) => t.startsWith('category-'))?.slice('category-'.length)
  projects.push({
    slug: slugify(repo.name),
    title: prettify(repo.name),
    subtitle: null,
    year: yearsOf(repo),
    category: category || 'web',
    description: repo.description ?? '',
    stack: [repo.language, ...repo.topics.filter((t) => t !== TOPIC && !t.startsWith('category-'))].filter(Boolean),
    repoUrl: repo.html_url,
    liveUrl: repo.homepage || null,
    cover: null,
  })
  console.log(`sync-projects: nuevo proyecto desde GitHub: ${repo.name}`)
}

// JSON legible: indentado, con las listas cortas de cadenas en una sola línea.
const json = JSON.stringify(projects, null, 2).replace(/\[\n\s+("(?:[^"\n]|\\")*"(?:,\n\s+"(?:[^"\n]|\\")*")*)\n\s+\]/g, (_, items) =>
  `[${items.replace(/,\n\s+/g, ', ')}]`,
)
writeFileSync(dataUrl('projects.json'), `${json}\n`)
console.log(`sync-projects: ${projects.length} proyectos (${repos ? 'con' : 'sin'} GitHub).`)
