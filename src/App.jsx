import { Routes, Route, Navigate, useParams } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Projects from './pages/Projects/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import { sections } from './data/sections.js'

// Rutas antiguas (/proyectos y /profesional) que ahora viven en /web.
function WebFicha() {
  const { slug } = useParams()
  return <Navigate to={`/web/${slug}`} replace />
}

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/proyectos" element={<Navigate to="/web?grupo=propios" replace />} />
          <Route path="/proyectos/:slug" element={<WebFicha />} />
          <Route path="/profesional" element={<Navigate to="/web?grupo=produccion" replace />} />
          <Route path="/profesional/:slug" element={<WebFicha />} />
          {Object.entries(sections).map(([key, { path }]) => [
            <Route key={key} path={path} element={<Projects section={key} />} />,
            <Route key={`${key}-detail`} path={`${path}/:slug`} element={<ProjectDetail section={key} />} />,
          ])}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
      <SpeedInsights />
    </>
  )
}

export default App
