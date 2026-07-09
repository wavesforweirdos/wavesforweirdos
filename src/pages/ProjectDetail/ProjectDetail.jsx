import { Link, useParams } from 'react-router-dom'
import projects from '../../data/projects.json'
import DotLink from '../../components/DotLink/DotLink.jsx'
import './ProjectDetail.scss'

const MAX_OTHERS = 3

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <div className="project-detail project-detail--not-found">
        <p>No se ha encontrado el proyecto.</p>
        <Link to="/proyectos">← Volver a proyectos</Link>
      </div>
    )
  }

  const others = projects.filter((p) => p.slug !== project.slug).slice(0, MAX_OTHERS)

  return (
    <article className="project-detail">
      <span className="project-detail__kicker">{project.category}.</span>

      <h1 className="project-detail__title">
        {project.title}
        <span className="project-detail__year">/ {project.year}</span>
      </h1>

      <p className="project-detail__description">{project.description}</p>

      <div className="project-detail__links">
        {project.repoUrl && (
          <a href={project.repoUrl} target="_blank" rel="noreferrer">
            repositorio ↗
          </a>
        )}
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noreferrer">
            ver sitio ↗
          </a>
        )}
      </div>

      {others.length > 0 && (
        <nav className="project-detail__others" aria-label="Otros proyectos">
          {others.map((p) => (
            <DotLink key={p.slug} to={`/proyectos/${p.slug}`}>
              {p.title}
            </DotLink>
          ))}
        </nav>
      )}

      <aside className="project-detail__stack">
        <h2>stack</h2>
        <ul>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </aside>

      <Link className="project-detail__back" to="/proyectos">
        ← volver a proyectos
      </Link>
    </article>
  )
}

export default ProjectDetail
