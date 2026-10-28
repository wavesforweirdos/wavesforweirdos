// Título y descripción de cada listado y de About. Sin imports de imágenes, para que
// los lea también scripts/prerender-meta.mjs; src/data/sections.js los junta con los datos.

export const sectionsMeta = {
  web: {
    path: '/web',
    metaTitle: 'Web',
    metaDescription:
      'Desarrollo web de Marta Cruz: webs en producción (Mediaelx) y proyectos propios con React, Vue, Laravel y PHP.',
  },
  ilustracion: {
    path: '/ilustracion',
    metaTitle: 'Ilustración',
    metaDescription:
      'Ilustración de Marta Cruz: cuentos ilustrados, concept art, dibujo personal y diseño de tatuajes.',
  },
  diseno: {
    path: '/diseno',
    metaTitle: 'Diseño',
    metaDescription:
      'Diseño gráfico de Marta Cruz: identidad corporativa, cartelería, diseño editorial, landings y newsletters.',
  },
}

export const aboutMeta = {
  path: '/about',
  metaTitle: 'About',
  metaDescription:
    'Marta Cruz: de la animación y el diseño al desarrollo Full Stack y Frontend. Trayectoria, experiencia y skills.',
}
