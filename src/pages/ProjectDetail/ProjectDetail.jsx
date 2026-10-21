import { Link, useParams } from 'react-router-dom'
import projects from '../../data/projects.json'
import projectGalleries from '../../data/projectGalleries.js'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
import usePageMeta, { truncate } from '../../hooks/usePageMeta.js'
import './ProjectDetail.scss'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)

  usePageMeta(
    project
      ? { title: project.title, description: truncate(project.description) }
      : { title: 'Proyecto no encontrado', noindex: true },
  )

  if (!project) {
    return (
      <div className="project-detail project-detail--not-found">
        <h1 className="project-detail__missing">No se ha encontrado el proyecto.</h1>
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

      {others.length > 0 && (
        <DotLinkGrid ariaLabel="Otros proyectos">
          {others.map((p) => (
            <DotLink key={p.slug} to={`/proyectos/${p.slug}`}>
              {p.title}
            </DotLink>
          ))}
        </DotLinkGrid>
      )}

      {gallery.length > 0 && (
        <div
          className="project-detail__gallery"
          role="region"
          aria-label={`Capturas de ${project.title}`}
          tabIndex={0}
        >
          {gallery.map((img) => (
            <figure
              key={img.src}
              className={
                img.width >= img.height
                  ? 'project-detail__gallery-item project-detail__gallery-item--wide'
                  : 'project-detail__gallery-item'
              }
            >
              <img
                src={img.src}
                width={img.width}
                height={img.height}
                alt={`${project.title}: ${img.tags.join(', ')}`}
                loading="lazy"
                decoding="async"
              />
              <div className="project-detail__gallery-tags">
                {img.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </figure>
          ))}
        </div>
      )}

      {/* Después de la galería: en móvil (flujo normal) se ve primero la galería y luego el stack;
          en escritorio ambos son paneles fijos y el orden del DOM no cambia nada visualmente. */}
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
