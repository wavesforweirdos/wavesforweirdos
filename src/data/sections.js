// Las cuatro áreas de trabajo del portfolio. `proyectos` sale de GitHub
// (projects.json, ver scripts/sync-projects.mjs); `ilustracion` y `diseno` salen
// de creative.json (proyectos de Behance) y `profesional` también (webs hechas
// en Mediaelx, con capturas propias); sus imágenes están en
// public/creative/<slug>/ (se piden solo al mostrarse; no se importan en el bundle
// porque son cientos).
import projects from './projects.json'
import projectGalleries from './projectGalleries.js'
import creative from './creative.json'

const creativeItems = (category) =>
  creative
    .filter((p) => p.category === category)
    .map(({ images, category: _category, ...project }) => ({
      ...project,
      category: null,
      gallery: images.map((img) => ({
        src: `/creative/${project.slug}/${img.file}`,
        width: img.width,
        height: img.height,
        tags: img.tags ?? [],
      })),
    }))

export const sections = {
  proyectos: {
    path: '/proyectos',
    label: 'proyectos.',
    areaLabel: 'web.',
    metaTitle: 'Proyectos',
    metaDescription: 'Proyectos web de Marta Cruz: aplicaciones y webs con React, Vue, Laravel y PHP.',
    items: projects.map((p) => ({ ...p, gallery: projectGalleries[p.slug] ?? [] })),
  },
  ilustracion: {
    path: '/ilustracion',
    label: 'ilustración.',
    areaLabel: 'ilustración.',
    metaTitle: 'Ilustración',
    metaDescription:
      'Ilustración de Marta Cruz: cuentos ilustrados, concept art, dibujo personal y diseño de tatuajes.',
    items: creativeItems('ilustracion'),
  },
  diseno: {
    path: '/diseno',
    label: 'diseño.',
    areaLabel: 'diseño.',
    metaTitle: 'Diseño',
    metaDescription:
      'Diseño gráfico de Marta Cruz: identidad corporativa, cartelería, diseño editorial, landings y newsletters.',
    items: creativeItems('diseno'),
  },
  profesional: {
    path: '/profesional',
    label: 'profesional.',
    areaLabel: 'profesional.',
    metaTitle: 'Profesional',
    metaDescription:
      'Trabajos profesionales de Marta Cruz en Mediaelx: webs inmobiliarias a medida, responsive y conectadas a un CRM.',
    items: creativeItems('profesional'),
  },
}
