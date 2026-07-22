import { useEffect, useState } from 'react'
import './Preloader.scss'

const DURATION = 1200

function Preloader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduceMotion) {
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
        setTimeout(() => setDone(true), 300)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  if (done) return null

  return (
    <div className="preloader" role="status" aria-live="polite">
      <span className="preloader__pct">{progress}%</span>
    </div>
  )
}

export default Preloader
