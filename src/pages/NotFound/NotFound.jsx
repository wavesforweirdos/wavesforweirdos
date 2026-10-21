import { Link } from 'react-router-dom'
import usePageMeta from '../../hooks/usePageMeta.js'
import './NotFound.scss'

function NotFound() {
  usePageMeta({ title: 'Página no encontrada', noindex: true })

  return (
    <div className="not-found">
      <h1 className="not-found__title">No se ha encontrado la página.</h1>
      <Link to="/">← Volver al inicio</Link>
    </div>
  )
}

export default NotFound
