import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { sections } from '../../data/sections.js'
import BackButton from '../../components/BackButton/BackButton.jsx'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
import usePageMeta, { truncate } from '../../hooks/usePageMeta.js'
import './ProjectDetail.scss'

function ProjectDetail({ section = 'web' }) {
  const { slug } = useParams()
  const { path, label, items, groups } = sections[section]
  const project = items.find((p) => p.slug === slug)
  const galleryRef = useRef(null)

  // fadeInUp al hacer scroll: cada captura aparece (con la animación de
  // animate.css) cuando entra en pantalla, escalonadas si entran varias a la vez. Sin soporte de IntersectionObserver
  // o con "reducir movimiento" no se oculta nada.
  useEffect(() => {
    const gallery = galleryRef.current
    if (!gallery || !('IntersectionObserver' in window)) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    const observer = new IntersectionObserver(
      (entries) => {
        // Las que entran a la vez (las primeras al cargar) lo hacen una tras otra.
        entries
          .filter((entry) => entry.isIntersecting)
          .sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top || x.boundingClientRect.left - y.boundingClientRect.left)
          .forEach((entry, i) => {
            entry.target.style.animationDelay = `${i * 200}ms`
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          })
      },
      { threshold: 0.08, rootMargin: '0px 0px -4% 0px' },
    )
    gallery.dataset.reveal = ''
    gallery.querySelectorAll('.project-detail__gallery-item').forEach((el) => observer.observe(el))
    return () => {
      observer.disconnect()
      delete gallery.dataset.reveal
    }
  }, [slug, section])

  usePageMeta(
    project
      ? { title: project.title, description: truncate(project.description) }
      : { title: 'Proyecto no encontrado', noindex: true },
  )

  if (!project) {
    return (
      <div className="project-detail project-detail--not-found">
        <h1 className="project-detail__missing">No se ha encontrado el proyecto.</h1>
        <Link to={path}>← Volver a {label.replace('.', '')}</Link>
      </div>
    )
  }

  const groupLabel = groups?.find((g) => g.key === project.group)?.label
  const others = items.filter((p) => p.slug !== project.slug && p.group === project.group)
  const gallery = project.gallery

  return (
    <article className="project-detail">
      <header className="project-detail__heading">
        <BackButton to={project.group ? `${path}?grupo=${project.group}` : path} />
        <p className="project-detail__section">{label}</p>
        {groupLabel && <p className="project-detail__category">{groupLabel}.</p>}
      </header>

      <div className="project-detail__main">
        <h1
          className={`project-detail__title${project.title.length > 16 ? ' project-detail__title--long' : ''}`}
        >
          {project.title}
          <span className="project-detail__year">/ {project.year}</span>
        </h1>

        {project.subtitle && <p className="project-detail__subtitle">{project.subtitle}</p>}

        <p className="project-detail__description">{project.description}</p>

        <div className="project-detail__links">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank" rel="noreferrer">
              repositorio ↗
            </a>
          )}
          {project.behance && (
            <a href={project.behance} target="_blank" rel="noreferrer">
              ver en behance ↗
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
            <DotLink key={p.slug} to={`${path}/${p.slug}`}>
              {p.title}
            </DotLink>
          ))}
        </DotLinkGrid>
      )}

      {gallery.length > 0 && (
        <div
          className="project-detail__gallery"
          ref={galleryRef}
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
                alt={img.tags.length ? `${project.title}: ${img.tags.join(', ')}` : `${project.title}, imagen ${gallery.indexOf(img) + 1}`}
                loading="lazy"
                decoding="async"
              />
              {img.tags.length > 0 && (
                <div className="project-detail__gallery-tags">
                  {img.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
              )}
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
