import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import projects from '../../data/projects.json'
import './Projects.scss'

function yearValue(year) {
  return typeof year === 'string' ? parseInt(year, 10) : year
}

function Projects() {
  const categories = useMemo(
    () => [...new Set(projects.map((p) => p.category))],
    [],
  )
  const [activeCategories, setActiveCategories] = useState(new Set(categories))
  const [hoveredSlug, setHoveredSlug] = useState(null)

  const sorted = useMemo(
    () => [...projects].sort((a, b) => yearValue(b.year) - yearValue(a.year)),
    [],
  )

  const visible = sorted.filter((p) => activeCategories.has(p.category))
  const hovered = visible.find((p) => p.slug === hoveredSlug) ?? visible[0]

  const toggleCategory = (category) => {
    setActiveCategories((prev) => {
      const next = new Set(prev)
      if (next.has(category)) {
        next.delete(category)
      } else {
        next.add(category)
      }
      return next
    })
  }

  return (
    <div className="projects">
      <span className="projects__kicker">web.</span>

      <ul className="projects__list">
        {visible.map((project) => (
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
      </ul>

      <ul className="projects__filters">
        {categories.map((category) => (
          <li key={category}>
            <label className="projects__filter">
              <input
                type="checkbox"
                checked={activeCategories.has(category)}
                onChange={() => toggleCategory(category)}
              />
              <span className="projects__filter-marker" aria-hidden="true" />
              {category}.
            </label>
          </li>
        ))}
      </ul>

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
