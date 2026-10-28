import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SITE_URL, fullTitle, truncate } from '../utils/meta.js'

export { SITE_URL, truncate }

// Crea (si no existe) y actualiza una etiqueta del <head>.
function upsert(tag, matchAttr, matchValue, valueAttr, value) {
  let el = document.head.querySelector(`${tag}[${matchAttr}="${matchValue}"]`)
  if (!el) {
    el = document.createElement(tag)
    el.setAttribute(matchAttr, matchValue)
    document.head.appendChild(el)
  }
  el.setAttribute(valueAttr, value)
}

// Metadatos por página para una SPA: título "<página> - wavesforweirdos",
// description, canonical, Open Graph / Twitter y robots. Los rastreadores que
// ejecutan JS (Google) leen estos valores; las vistas previas de redes
// sociales leen las etiquetas estáticas de index.html.
function usePageMeta({ title, description, noindex = false }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const pageTitle = fullTitle(title)
    const path = pathname.length > 1 ? pathname.replace(/\/$/, '') : pathname
    const url = `${SITE_URL}${path}`

    document.title = pageTitle
    upsert('meta', 'property', 'og:title', 'content', pageTitle)
    upsert('meta', 'name', 'twitter:title', 'content', pageTitle)
    upsert('meta', 'name', 'robots', 'content', noindex ? 'noindex, nofollow' : 'index, follow')

    if (description) {
      upsert('meta', 'name', 'description', 'content', description)
      upsert('meta', 'property', 'og:description', 'content', description)
      upsert('meta', 'name', 'twitter:description', 'content', description)
    }

    if (noindex) {
      // Una página que no debe indexarse no anuncia canonical.
      document.head.querySelector('link[rel="canonical"]')?.remove()
    } else {
      upsert('link', 'rel', 'canonical', 'href', url)
      upsert('meta', 'property', 'og:url', 'content', url)
    }
  }, [title, description, noindex, pathname])
}

export default usePageMeta
