import { useCallback, useEffect, useState } from 'react'

export const THEME_KEY = 'wf-theme'
const THEME_COLORS = { light: '#ffffff', dark: '#111111' } // <meta name="theme-color">

// Preferencia guardada del visitante ("light" o "dark"), o null si no ha elegido.
function storedTheme() {
  try {
    const value = localStorage.getItem(THEME_KEY)
    return value === 'light' || value === 'dark' ? value : null
  } catch {
    return null // almacenamiento bloqueado (modo privado...)
  }
}

const darkQuery = () => window.matchMedia('(prefers-color-scheme: dark)')
const systemTheme = () => (darkQuery().matches ? 'dark' : 'light')

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLORS[theme])
}

// Tema claro u oscuro. El atributo data-theme de <html> lo pone antes del primer pintado el
// script de index.html (para que no parpadee); este hook lo mantiene y permite cambiarlo.
// Sin preferencia guardada sigue al sistema; al elegir con el interruptor se guarda.
function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.dataset.theme || storedTheme() || systemTheme(),
  )

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    const query = darkQuery()
    const onChange = (event) => {
      if (!storedTheme()) setTheme(event.matches ? 'dark' : 'light')
    }
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  const toggle = useCallback(() => {
    const next = theme === 'dark' ? 'light' : 'dark'
    try {
      localStorage.setItem(THEME_KEY, next)
    } catch {
      // sin almacenamiento: el cambio vale para esta visita
    }
    setTheme(next)
  }, [theme])

  return { theme, toggle }
}

export default useTheme
