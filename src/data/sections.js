// Las tres áreas de trabajo del portfolio. `web` junta los proyectos propios, que
// salen de GitHub (projects.json, ver scripts/sync-projects.mjs), y las webs en
// producción hechas en Mediaelx (creative.json, categoría `profesional`);
// `ilustracion` y `diseno` salen de creative.json (proyectos de Behance). Sus
// imágenes están en public/creative/<slug>/ (se piden solo al mostrarse; no se
// importan en el bundle porque son cientos).
import projects from './projects.json'
import projectGalleries from './projectGalleries.js'
import creative from './creative.json'
import { sectionsMeta } from './sectionsMeta.js'

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

const webGroups = [
  { key: 'produccion', label: 'en producción' },
  { key: 'propios', label: 'propios' },
]

export const sections = {
  web: {
    ...sectionsMeta.web,
    label: 'web.',
    areaLabel: 'web.',
    // "en producción": webs de clientes con enlace público; "propios": proyectos
    // personales y pruebas técnicas (salen de GitHub).
    groups: webGroups,
    items: [
      ...projects.map(({ category: _category, ...p }) => ({
        ...p,
        group: 'propios',
        gallery: projectGalleries[p.slug] ?? [],
      })),
      ...creativeItems('profesional').map((p) => ({ ...p, group: 'produccion' })),
    ],
  },
  ilustracion: {
    ...sectionsMeta.ilustracion,
    label: 'ilustración.',
    areaLabel: 'ilustración.',
    items: creativeItems('ilustracion'),
  },
  diseno: {
    ...sectionsMeta.diseno,
    label: 'diseño.',
    areaLabel: 'diseño.',
    items: creativeItems('diseno'),
  },
}
