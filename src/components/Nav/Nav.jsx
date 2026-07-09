import { NavLink } from 'react-router-dom'
import profile from '../../data/profile.json'
import logo from '../../assets/logo/wf-logo-black.png'
import './Nav.scss'

function Nav() {
  const year = new Date().getFullYear()

  return (
    <footer className="nav">
      <div className="nav__identity">
        <p className="nav__location">Barcelona, Catalunya.</p>
        <p className="nav__name">{profile.name.toLowerCase()}</p>
      </div>

      <ul className="nav__links">
        <li>
          <span className="nav__index">00</span>
          <NavLink to="/" end>home</NavLink>
        </li>
        <li>
          <span className="nav__index">01</span>
          <NavLink to="/about">about</NavLink>
        </li>
        <li>
          <span className="nav__index">02</span>
          <a href={`mailto:${profile.contact.email}`}>e-mail</a>
        </li>
      </ul>

      <ul className="nav__links">
        <li>
          <span className="nav__index">03</span>
          <a href={profile.contact.github} target="_blank" rel="noreferrer">github</a>
        </li>
        <li>
          <span className="nav__index">04</span>
          <a href={profile.contact.linkedin} target="_blank" rel="noreferrer">linkedin</a>
        </li>
      </ul>

      <div className="nav__mark">
        <img className="nav__logo" src={logo} alt="wavesforweirdos" />
        <span className="nav__dot" aria-hidden="true" />
      </div>

      <p className="nav__copyright">
        Copyright © {year} {profile.name}. All rights reserved.
      </p>
    </footer>
  )
}

export default Nav
