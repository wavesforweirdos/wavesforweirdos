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
        <Link to="/ilustracion" className="home__category">ilustración.</Link>
        <Link to="/diseno" className="home__category">diseño.</Link>
        <Link to="/profesional" className="home__category">profesional.</Link>
      </nav>
    </div>
  )
}

export default Home
