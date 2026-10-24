import { useLocation, useNavigate } from 'react-router-dom'
import { navigateWithTransition } from '../../utils/viewTransition.js'
import './BackButton.scss'

// Vuelve a la página anterior de la propia web. Si se entró directamente por
// esta URL (la primera ubicación del historial tiene la key "default"), no hay
// nada a lo que volver dentro del sitio y navigate(-1) sacaría al usuario de la
// web, así que se le lleva a `fallback`.
function BackButton({ fallback = '/proyectos', label = 'Volver a la página anterior', className = '' }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleClick = () => {
    if (location.key !== 'default') navigateWithTransition(navigate, -1)
    else navigateWithTransition(navigate, fallback)
  }

  return (
    <button
      type="button"
      className={`back-button${className ? ` ${className}` : ''}`}
      onClick={handleClick}
      aria-label={label}
    />
  )
}

export default BackButton
