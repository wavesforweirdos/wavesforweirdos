import { Link, useParams } from 'react-router-dom'
import projects from '../../data/projects.json'
import projectGalleries from '../../data/projectGalleries.js'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
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

  const others = projects.filter((p) => p.slug !== project.slug)
  const gallery = projectGalleries[project.slug] ?? []

  return (
    <article className="project-detail">
      <div className="project-detail__main">
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
      </div>

      {gallery.length > 0 && (
        <div className="project-detail__gallery">
          {gallery.map((img) => (
            <figure key={img.src} className="project-detail__gallery-item">
              <img src={img.src} alt="" loading="lazy" />
              <figcaption>{img.label}</figcaption>
            </figure>
          ))}
        </div>
      )}

      {others.length > 0 && (
        <DotLinkGrid ariaLabel="Otros proyectos">
          {others.map((p) => (
            <DotLink key={p.slug} to={`/proyectos/${p.slug}`}>
              {p.title}
            </DotLink>
          ))}
        </DotLinkGrid>
      )}

      <aside className="project-detail__stack">
        <h2>stack</h2>
        <ul>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </aside>
    </article>
  )
}

export default ProjectDetail
