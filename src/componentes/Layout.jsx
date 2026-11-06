import { Outlet } from 'react-router-dom'
import { Footer } from './Footer.jsx'
import { Navbar } from './Navbar.jsx'
import { useArribaAlCambiarRuta } from '../hooks/useArribaAlCambiarRuta.js'
import { useSesion } from '../hooks/useSesion.js'

export default function Layout() {
  useArribaAlCambiarRuta()
  const { sesionIniciada } = useSesion()

  return (
    <div className="pf-app">
      <Navbar />
      <main className={`mt-4 pf-contenido ${sesionIniciada ? 'container-fluid' : 'container'}`}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
