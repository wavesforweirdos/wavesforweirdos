import { useLayoutEffect, useState } from 'react'

// Posición horizontal (viewport) de la "f" de ".wf" en el footer — el
// grid de capturas de ProjectDetail ancla su borde izquierdo aquí. Por
// debajo del breakpoint móvil de ProjectDetail (900px) devuelve null, ya
// que ahí el layout pasa a estático y no debe fijarse por JS.
function useNavLogoFPosition() {
  const [x, setX] = useState(null)

  useLayoutEffect(() => {
    const measure = () => {
      if (window.innerWidth <= 900) {
        setX(null)
        return
      }
      const el = document.querySelector('.nav__logo-f')
      if (el) setX(el.getBoundingClientRect().left)
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return x
}

export default useNavLogoFPosition
