import { useEffect, useState } from 'react'
import './Preloader.scss'

const DURATION = 1200
const STORAGE_KEY = 'wf-preloader-seen'

// El preloader solo sale en la primera visita de cada sesión del navegador (por
// pestaña): al recargar o abrir otra ruta directamente ya no se repite. Se
// protege el acceso a sessionStorage por si el navegador lo bloquea.
function hasSeenPreloader() {
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function markPreloaderSeen() {
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // sin sessionStorage simplemente se mostrará en cada carga
  }
}

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(hasSeenPreloader)

  useEffect(() => {
    if (hasSeenPreloader()) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
      markPreloaderSeen()
      setDone(true)
      return
    }

    const start = performance.now()
    let frame

    const tick = (now) => {
      const elapsed = now - start
      const pct = Math.min(100, Math.round((elapsed / DURATION) * 100))
      setProgress(pct)

      if (pct < 100) {
        frame = requestAnimationFrame(tick)
      } else {
        setTimeout(() => {
          markPreloaderSeen()
          setDone(true)
        }, 300)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (done) return null

  return (
    <div className="preloader" role="status" aria-label="Cargando">
      <span className="preloader__pct" aria-hidden="true">{progress}%</span>
    </div>
  )
}

export default Preloader
