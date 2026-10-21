import { useEffect } from 'react'

const SITE_NAME = 'wavesforweirdos'

// Título de la pestaña por página: "<página> - wavesforweirdos". Sin título,
// solo el nombre del sitio.
function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title ? `${title} - ${SITE_NAME}` : SITE_NAME
  }, [title])
}

export default useDocumentTitle
