import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import profile from '../../data/profile.json'
import './Nav.scss'

// Por debajo de este ancho no hay hover: el logo pasa a abrir/cerrar el
// menú en vez de navegar (mismo umbral que el resto de ajustes mobile del nav).
const MOBILE_QUERY = '(max-width: 1023px)'

function Nav() {
  const year = new Date().getFullYear()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isHomeOpen, setIsHomeOpen] = useState(false)

  function handleLogoClick() {
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
        <address className="nav__identity">
          <p className="nav__location">Barcelona, Catalunya.</p>
          <p className="nav__name">{profile.name.toLowerCase()}</p>
        </address>

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
                <NavLink to="/proyectos" onClick={closeMenu}>web.</NavLink>
              </li>
              <li>
                <a href={profile.contact.behance} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  ilustración.
                </a>
              </li>
              <li>
                <a href={profile.contact.behance} target="_blank" rel="noreferrer" onClick={closeMenu}>
                  diseño.
                </a>
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

        <button
          type="button"
          className="nav__logo"
          aria-expanded={isMenuOpen}
          aria-controls="nav-menu"
          onClick={handleLogoClick}
        >
          .wf
        </button>
      </div>

      <small className="nav__copyright">
        Copyright © {year} {profile.name}. All rights reserved.
      </small>
      <Link to="/" className="nav__dot" aria-label="Inicio" />
    </footer>
  )
}

export default Nav
