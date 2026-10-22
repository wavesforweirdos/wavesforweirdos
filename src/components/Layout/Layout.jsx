import { useLayoutEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { notifyRouteCommitted } from '../../utils/viewTransition.js'
import Nav from '../Nav/Nav.jsx'
import Preloader from '../Preloader/Preloader.jsx'
import './Layout.scss'

function Layout() {
  const location = useLocation()

  // Avisa a la View Transition en curso de que la nueva ruta ya está pintada en el DOM.
  useLayoutEffect(() => {
    notifyRouteCommitted()
  }, [location.key])

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
