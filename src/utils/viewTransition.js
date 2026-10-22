// Navegación con View Transitions: el navegador anima solo el movimiento de los
// elementos que comparten `view-transition-name` entre las dos páginas (p. ej. el
// título "proyectos." al pasar del listado a la ficha). Si el navegador no lo
// soporta, o el usuario prefiere menos movimiento, se navega sin animación.

let pendingResolve = null

export function supportsViewTransitions() {
  return (
    typeof document !== 'undefined' &&
    'startViewTransition' in document &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

// `to` y `options` son los de navigate() (también vale navigate(-1)).
export function navigateWithTransition(navigate, to, options) {
  if (!supportsViewTransitions()) {
    navigate(to, options)
    return
  }

  document.startViewTransition(
    () =>
      new Promise((resolve) => {
        // Si la ruta no llega a cambiar, no se deja la transición colgada.
        const timer = setTimeout(finish, 1000)
        function finish() {
          clearTimeout(timer)
          pendingResolve = null
          resolve()
        }
        pendingResolve = finish
        navigate(to, options)
      }),
  )
}

// Lo llama Layout cuando la nueva ruta ya está en el DOM: es el momento en que
// el navegador debe capturar el estado final de la transición.
export function notifyRouteCommitted() {
  pendingResolve?.()
}
