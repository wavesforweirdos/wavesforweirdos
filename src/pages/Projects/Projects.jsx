import { useMemo, useState } from 'react'
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

function Projects({ section = 'proyectos' }) {
  const { path, label, items, metaTitle, metaDescription } = sections[section]
  usePageMeta({ title: metaTitle, description: metaDescription })
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const sorted = useMemo(
    () => [...items].sort((a, b) => yearValue(b.year) - yearValue(a.year)),
    [items],
  )

  const hovered = sorted.find((p) => p.slug === hoveredSlug) ?? sorted[0]

  return (
    <div className="projects">
      <div className="projects__heading">
        <BackButton />
        <h1 className="projects__kicker">{label}</h1>
      </div>

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
