import { useNavigate } from 'react-router-dom'
import { navigateWithTransition } from '../../utils/viewTransition.js'
import './BackButton.scss'

// Sube un nivel en la jerarquía del sitio (ficha → listado de su sección →
// home), no a la página anterior del historial: si se navega entre proyectos,
// "volver" lleva siempre al listado y no al proyecto visto antes.
function BackButton({ to = '/', label = 'Volver al nivel anterior', className = '' }) {
  const navigate = useNavigate()

  const handleClick = () => navigateWithTransition(navigate, to)

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
