import { useLayoutEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import projects from '../../data/projects.json'
import projectGalleries from '../../data/projectGalleries.js'
import DotLink from '../../components/DotLink/DotLink.jsx'
import DotLinkGrid from '../../components/DotLinkGrid/DotLinkGrid.jsx'
import useNavLogoFPosition from '../../hooks/useNavLogoFPosition.js'
import './ProjectDetail.scss'

function ProjectDetail() {
  const { slug } = useParams()
  const project = projects.find((p) => p.slug === slug)
  const [orientations, setOrientations] = useState({})
  const logoFX = useNavLogoFPosition()
  const galleryRef = useRef(null)
  // Espacio que la columna de etiquetas rotadas (+ el gap) le "roba" a la
  // foto por la derecha dentro de cada item — se mide de verdad en vez de
  // asumir un valor, para que el borde derecho de LA FOTO (no del grid,
  // que incluye esa columna) sea el que coincide con la f.
  const [tagReserve, setTagReserve] = useState(0)

  useLayoutEffect(() => {
    const measure = () => {
      const item = galleryRef.current?.querySelector('.project-detail__gallery-item')
      const tags = galleryRef.current?.querySelector('.project-detail__gallery-tags')
      if (!item || !tags) {
        setTagReserve(0)
        return
      }
      const gap = parseFloat(getComputedStyle(item).columnGap) || 0
      setTagReserve(gap + tags.getBoundingClientRect().width)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [slug])

  const handleImageLoad = (src) => (event) => {
    const { naturalWidth, naturalHeight } = event.target
    const orientation = naturalWidth >= naturalHeight ? 'landscape' : 'portrait'
    setOrientations((prev) => (prev[src] === orientation ? prev : { ...prev, [src]: orientation }))
  }

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

  // El borde derecho de LA FOTO (no del contenedor, que incluye la
  // columna de etiquetas) ancla con la "f" de ".wf" del footer — se resta
  // tagReserve para compensar esa columna. El grid se extiende ~35vw
  // hacia la izquierda desde ahí, sin salirse del viewport; el stack se
  // queda más a la izquierda todavía, con margen respecto al borde
  // izquierdo real de la galería.
  const galleryRight =
    logoFX != null ? `calc(100vw - ${logoFX}px - ${tagReserve}px)` : undefined
  const galleryStyle = galleryRight != null ? { right: galleryRight } : undefined
  const stackStyle =
    galleryRight != null ? { right: `calc(${galleryRight} + 35vw + var(--space-4))` } : undefined

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

      <aside className="project-detail__stack" style={stackStyle}>
        <h2>stack</h2>
        <ul>
          {project.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </aside>

      {gallery.length > 0 && (
        <div className="project-detail__gallery" style={galleryStyle} ref={galleryRef}>
          {gallery.map((img) => (
            <figure
              key={img.src}
              className={
                orientations[img.src] === 'landscape'
                  ? 'project-detail__gallery-item project-detail__gallery-item--wide'
                  : 'project-detail__gallery-item'
              }
            >
              <img src={img.src} alt="" loading="lazy" onLoad={handleImageLoad(img.src)} />
              <div className="project-detail__gallery-tags">
                {img.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </figure>
          ))}
        </div>
      )}
    </article>
  )
}

export default ProjectDetail
