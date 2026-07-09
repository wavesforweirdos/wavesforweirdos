import { Link, useParams } from 'react-router-dom'
import projects from '../../data/projects.json'
import './ProjectDetail.scss'

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

  return (
    <article className="project-detail">
      <span className="project-detail__kicker">{project.category}.</span>
      <h1 className="project-detail__title">
        {project.title} <span className="project-detail__year">/ {project.year}</span>
      </h1>

      <p className="project-detail__description">{project.description}</p>

      <ul className="project-detail__stack">
        {project.stack.map((tech) => (
          <li key={tech}>{tech}</li>
        ))}
      </ul>

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

      <Link className="project-detail__back" to="/proyectos">
        ← volver a proyectos
      </Link>
    </article>
  )
}

export default ProjectDetail
