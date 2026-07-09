import { NavLink } from 'react-router-dom'
import profile from '../../data/profile.json'
import './Nav.scss'

function Nav() {
  const year = new Date().getFullYear()

  return (
    <footer className="nav">
      <div className="nav__row">
        <address className="nav__identity">
          <p className="nav__location">Barcelona, Catalunya.</p>
          <p className="nav__name">{profile.name.toLowerCase()}</p>
        </address>

        <ol className="nav__links" start="0">
          <li>
            <NavLink to="/" end>home</NavLink>
          </li>
          <li>
            <NavLink to="/about">about</NavLink>
          </li>
          <li>
            <a href={`mailto:${profile.contact.email}`}>e-mail</a>
          </li>
          <li>
            <a href={profile.contact.github} target="_blank" rel="noreferrer">github</a>
          </li>
          <li>
            <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
          </li>
        </ol>

        <span className="nav__logo">
          <span>.w</span>
          <span className="nav__logo-f">f</span>
        </span>
      </div>

      <small className="nav__copyright">
        Copyright © {year} {profile.name}. All rights reserved.
      </small>
      <span className="nav__dot" aria-hidden="true" />
    </footer>
  )
}

export default Nav
