import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import profile from '../../data/profile.json'
import useTheme from '../../hooks/useTheme.js'
import './Nav.scss'

// Por debajo de este ancho no hay hover: el punto pasa a abrir/cerrar el
// menú en vez de navegar (mismo umbral que el resto de ajustes mobile del nav).
const MOBILE_QUERY = '(max-width: 1023px)'

function Nav() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHomeOpen, setIsHomeOpen] = useState(false)
  const { theme, toggle } = useTheme()

  function handleDotClick() {
    if (window.matchMedia(MOBILE_QUERY).matches) {
      setIsMenuOpen((open) => !open)
      return
    }
    navigate('/')
  }

  function closeMenu() {
    setIsMenuOpen(false)
  }

  return (
    <footer className="nav">
      <div className="nav__row">
        <div className="nav__side">
          {/* Luna en claro (pasa a oscuro) y sol en oscuro (pasa a claro) */}
          <button
            type="button"
            className="nav__theme"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            onClick={toggle}
          >
            <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
              {theme === 'dark' ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
                </>
              ) : (
                <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
              )}
            </svg>
          </button>
          <address className="nav__identity">
            <p className="nav__location">Barcelona, Catalunya.</p>
            <p className="nav__name">{profile.name.toLowerCase()}</p>
          </address>
        </div>

        <ol id="nav-menu" className={`nav__links${isMenuOpen ? ' is-open' : ''}`} start="0">
          <li className="nav__links-item">
            <div className="nav__links-row">
              <NavLink to="/" end onClick={closeMenu}>home</NavLink>
              <button
                type="button"
                className="nav__links-toggle"
                aria-expanded={isHomeOpen}
                aria-controls="nav-home-submenu"
                aria-label="Mostrar áreas de trabajo"
                onClick={() => setIsHomeOpen((open) => !open)}
              />
            </div>

            <ul id="nav-home-submenu" className={`nav__submenu${isHomeOpen ? ' is-open' : ''}`}>
              <li>
                <NavLink to="/web" onClick={closeMenu}>web.</NavLink>
              </li>
              <li>
                <NavLink to="/ilustracion" onClick={closeMenu}>ilustración.</NavLink>
              </li>
              <li>
                <NavLink to="/diseno" onClick={closeMenu}>diseño.</NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/about" onClick={closeMenu}>about</NavLink>
          </li>
          <li>
            <a href={`mailto:${profile.contact.email}`} onClick={closeMenu}>e-mail</a>
          </li>
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer" onClick={closeMenu}>github</a>
          </li>
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer" onClick={closeMenu}>linkedin</a>
          </li>
        </ol>

        <Link to="/" className="nav__logo">.wf</Link>
      </div>

      <small className="nav__copyright">
        Copyright © {year} {profile.name}. All rights reserved.
      </small>
      <button
        type="button"
        className={`nav__dot${isMenuOpen ? ' is-open' : ''}`}
        aria-label={isMenuOpen ? 'Cerrar menú' : 'Inicio'}
        aria-expanded={isMenuOpen}
        aria-controls="nav-menu"
        onClick={handleDotClick}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>
    </footer>
  )
}

export default Nav
