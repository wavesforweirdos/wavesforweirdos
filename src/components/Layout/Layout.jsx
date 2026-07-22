import { Outlet } from 'react-router-dom'
import Nav from '../Nav/Nav.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import './Layout.scss'

function Layout() {
  return (
    <>
      <Preloader />
      <main className="page">
        <Outlet />
      </main>
      <Nav />
    </>
  )
}

export default Layout
