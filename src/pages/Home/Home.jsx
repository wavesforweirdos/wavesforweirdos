import { Link } from 'react-router-dom'
import profile from '../../data/profile.json'
import './Home.scss'
import usePageMeta from '../../hooks/usePageMeta.js'

function Home() {
  usePageMeta({
    title: 'Home',
    description:
      'Portfolio de Marta Cruz, desarrolladora Full Stack y Frontend en Barcelona. Proyectos web con React, PHP y Laravel.',
  })
  return (
    <div className="home">
      <h1 className="home__title">
        {profile.name} — {profile.role}
      </h1>
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
