import { Link, useNavigate } from 'react-router-dom'
import { navigateWithTransition, supportsViewTransitions } from '../../utils/viewTransition.js'

// <Link> que navega dentro de una View Transition. Respeta los clics "no
// normales" (ctrl/cmd/shift/alt, botón central, target) para que sigan abriendo
// en otra pestaña con normalidad.
function TransitionLink({ to, onClick, target, ...rest }) {
  const navigate = useNavigate()

  const handleClick = (event) => {
    onClick?.(event)
    const plainClick =
      event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey
    if (event.defaultPrevented || !plainClick || target === '_blank' || !supportsViewTransitions()) {
      return
    }
    event.preventDefault()
    navigateWithTransition(navigate, to)
  }

  return <Link to={to} target={target} onClick={handleClick} {...rest} />
}

export default TransitionLink
