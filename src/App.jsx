import { Routes, Route } from 'react-router-dom'
import { Analytics } from '@vercel/analytics/react'
import Layout from './components/Layout/Layout.jsx'
import Home from './pages/Home/Home.jsx'
import About from './pages/About/About.jsx'
import Projects from './pages/Projects/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail/ProjectDetail.jsx'
import NotFound from './pages/NotFound/NotFound.jsx'
import { sections } from './data/sections.js'

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          {Object.entries(sections).map(([key, { path }]) => [
            <Route key={key} path={path} element={<Projects section={key} />} />,
            <Route key={`${key}-detail`} path={`${path}/:slug`} element={<ProjectDetail section={key} />} />,
          ])}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  )
}

export default App
