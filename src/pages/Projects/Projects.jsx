import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import TransitionLink from '../../components/TransitionLink/TransitionLink.jsx'
import { sections } from '../../data/sections.js'
import BackButton from '../../components/BackButton/BackButton.jsx'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
import './Projects.scss'
import usePageMeta from '../../hooks/usePageMeta.js'

function yearValue(year) {
  return typeof year === 'string' ? parseInt(year, 10) : year
}

function Projects({ section = 'web' }) {
  const { path, label, items, groups, metaTitle, metaDescription } = sections[section]
  usePageMeta({ title: metaTitle, description: metaDescription })
  const [hoveredSlug, setHoveredSlug] = useState(null)
  const [searchParams, setSearchParams] = useSearchParams()
  // Filtro por grupo (?grupo=produccion); sin grupo válido se ven todos.
  const group = groups?.some((g) => g.key === searchParams.get('grupo')) ? searchParams.get('grupo') : null

  const sorted = useMemo(
    () =>
      items
        .filter((p) => !group || p.group === group)
        .sort((a, b) => yearValue(b.year) - yearValue(a.year)),
    [items, group],
  )

  const hovered = sorted.find((p) => p.slug === hoveredSlug) ?? sorted[0]

  return (
    <div className="projects">
      <div className="projects__heading">
        <BackButton />
        <h1 className="projects__kicker">{label}</h1>
      </div>

      {groups && (
        <nav className="projects__filter" aria-label="Filtrar proyectos">
          {[{ key: null, label: 'todos' }, ...groups].map((g) => (
            <button
              key={g.key ?? 'todos'}
              type="button"
              className={g.key === group ? 'is-active' : ''}
              aria-pressed={g.key === group}
              onClick={() => setSearchParams(g.key ? { grupo: g.key } : {}, { replace: true })}
            >
              {g.label}
            </button>
          ))}
        </nav>
      )}

      <div className="projects__list-wrap">
        <ul className="projects__list">
          {sorted.map((project) => (
            <li
              key={project.slug}
              className="projects__item"
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onFocus={() => setHoveredSlug(project.slug)}
            >
              <TransitionLink to={`${path}/${project.slug}`}>
                <span className="projects__title">{project.title}</span>
                <span className="projects__year">/ {project.year}</span>
              </TransitionLink>
            </li>
          ))}
        </ul>
      </div>

      <DotLinkGrid ariaLabel="Otras áreas de trabajo">
        {Object.entries(sections)
          .filter(([key]) => key !== section)
          .map(([key, other]) => (
            <DotLink key={key} to={other.path}>
              {other.areaLabel}
            </DotLink>
          ))}
      </DotLinkGrid>

      {hovered && (
        <aside className="projects__stack">
          <h2>stack</h2>
          <ul>
            {hovered.stack.map((tech) => (
              <li key={tech}>{tech}</li>
            ))}
          </ul>
        </aside>
      )}
    </div>
  )
}

export default Projects
