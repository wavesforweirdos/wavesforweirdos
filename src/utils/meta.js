// Constantes y utilidades de metadatos sin dependencias de React: las usan el hook
// usePageMeta (en el navegador) y scripts/prerender-meta.mjs (en el build), para que
// la cabecera que ven las redes sociales y la que pone la app coincidan.

export const SITE_URL = 'https://www.wavesforweirdos.com'
export const SITE_NAME = 'wavesforweirdos'

// Título "<página> - wavesforweirdos".
export function fullTitle(title) {
  return title ? `${title} - ${SITE_NAME}` : SITE_NAME
}

// Recorta una descripción a ~155 caracteres sin partir palabras.
export function truncate(text, max = 155) {
  if (text.length <= max) return text
  return `${text.slice(0, max).replace(/\s+\S*$/, '')}…`
}
