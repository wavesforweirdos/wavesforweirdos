import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import projects from '../../data/projects.json'
import profile from '../../data/profile.json'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
import './Projects.scss'

function yearValue(year) {
  return typeof year === 'string' ? parseInt(year, 10) : year
}

function Projects() {
  const navigate = useNavigate()
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const sorted = useMemo(
    () => [...projects].sort((a, b) => yearValue(b.year) - yearValue(a.year)),
    [],
  )

  const hovered = sorted.find((p) => p.slug === hoveredSlug) ?? sorted[0]

  return (
    <div className="projects">
      <div className="projects__heading">
        <button
          type="button"
          className="projects__back"
          onClick={() => navigate(-1)}
          aria-label="Volver a la página anterior"
        />
        <span className="projects__kicker">proyectos.</span>
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
              <Link to={`/proyectos/${project.slug}`}>
                {project.title}
                <span className="projects__year">/ {project.year}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <DotLinkGrid ariaLabel="Otras áreas de trabajo">
        <DotLink href={profile.contact.behance} target="_blank" rel="noreferrer">
          ilustración.
        </DotLink>
        <DotLink href={profile.contact.behance} target="_blank" rel="noreferrer">
          diseño.
        </DotLink>
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
