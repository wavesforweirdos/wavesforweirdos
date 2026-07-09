import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../../data/projects.json'
import profile from '../../data/profile.json'
import './Projects.scss'

function yearValue(year) {
  return typeof year === 'string' ? parseInt(year, 10) : year
}

function Projects() {
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const sorted = useMemo(
    () => [...projects].sort((a, b) => yearValue(b.year) - yearValue(a.year)),
    [],
  )

  const hovered = sorted.find((p) => p.slug === hoveredSlug) ?? sorted[0]

  return (
    <div className="projects">
      <span className="projects__kicker">proyectos.</span>

      <div className="projects__list-wrap">
        <ol className="projects__list">
          {sorted.map((project) => (
            <li
              key={project.slug}
              className={`projects__item${hovered?.slug === project.slug ? ' is-active' : ''}`}
              onMouseEnter={() => setHoveredSlug(project.slug)}
              onFocus={() => setHoveredSlug(project.slug)}
            >
              <Link to={`/proyectos/${project.slug}`}>
                {project.title} <span className="projects__year">/ {project.year}</span>
              </Link>
            </li>
          ))}
        </ol>
        <div className="projects__list-fade" aria-hidden="true" />
      </div>

      <nav className="projects__categories" aria-label="Otras áreas de trabajo">
        <a href={profile.contact.behance} target="_blank" rel="noreferrer">
          <span aria-hidden="true" />
          ilustración.
        </a>
        <a href={profile.contact.behance} target="_blank" rel="noreferrer">
          <span aria-hidden="true" />
          diseño.
        </a>
      </nav>

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
