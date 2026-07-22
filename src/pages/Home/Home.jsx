import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import './Home.scss'

function Home() {
  return (
    <div className="home">
      <nav className="home__categories" aria-label="Áreas de trabajo">
        <Link to="/proyectos" className="home__category">web.</Link>
        <a
          className="home__category"
          href={profile.contact.behance}
          target="_blank"
          rel="noreferrer"
        >
          ilustración.
        </a>
        <a
          className="home__category"
          href={profile.contact.behance}
          target="_blank"
          rel="noreferrer"
        >
          diseño.
        </a>
      </nav>
    </div>
  )
}

export default Home
