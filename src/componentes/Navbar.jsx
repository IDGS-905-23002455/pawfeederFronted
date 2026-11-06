import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSesion } from '../hooks/useSesion.js'

const ENLACES_PUBLICOS = [
  { a: '/', texto: 'Inicio' },
  { a: '/about', texto: 'Proyecto' },
  { a: '/contacto', texto: 'Contacto' },
  { a: '/opiniones', texto: 'Comentarios' },
  { a: '/preguntas-frecuentes', texto: 'Preguntas frecuentes' },
]

const ENLACES_ADMIN = [
  { a: '/dashboard', texto: 'Dashboard' },
  { a: '/admin', texto: 'Usuarios' },
  { a: '/inventario', texto: 'Inventario' },
  { a: '/inventario-dispensadores', texto: 'Dispensadores' },
  { a: '/proveedores', texto: 'Proveedores' },
  { a: '/recetas', texto: 'Recetas' },
  { a: '/comentarios', texto: 'Comentarios' },
]

const ENLACES_CLIENTE = [
  { a: '/dashboard-cliente', texto: 'Dashboard' },
  { a: '/mascotas', texto: 'Mis Mascotas' },
  { a: '/horarios', texto: 'Horarios' },
  { a: '/mis-compras', texto: 'Mis Compras' },
  { a: '/manual', texto: 'Manual IoT' },
]

export function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false)
  const { sesionIniciada, usuario, logout } = useSesion()
  const navegar = useNavigate()

  const rolActual = sesionIniciada ? usuario?.rol : 'publico'
  const enlaces =
    rolActual === 'admin' ? ENLACES_ADMIN : rolActual === 'cliente' ? ENLACES_CLIENTE : ENLACES_PUBLICOS
  const inicio = rolActual === 'admin' ? '/admin' : rolActual === 'cliente' ? '/mascotas' : '/'

  const cerrarMenu = () => setMenuAbierto(false)

  const salir = () => {
    logout()
    cerrarMenu()
    navegar('/')
  }

  return (
    <nav className="navbar navbar-expand-lg pf-header navbar-light">
      <div className="container">
        <Link className="navbar-brand fw-bold" to={inicio} onClick={cerrarMenu}>
          <img src="/imagenes/pawfeeder-mark-192.png" alt="PawFeeder" style={{ height: 32 }} className="me-2" />
          <span className="pf-logo-text">
            <span className="paw">Paw</span>
            <span className="feeder">Feeder</span>
          </span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuAbierto((v) => !v)}
          aria-expanded={menuAbierto}
          aria-controls="mainNav"
          aria-label="Abrir menú"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div
          className={`collapse navbar-collapse justify-content-center pf-navbar-collapse${
            menuAbierto ? ' show' : ''
          }`}
          id="mainNav"
        >
          <ul className="navbar-nav gap-2" onClick={cerrarMenu}>
            {enlaces.map(({ a, texto }) => (
              <li className="nav-item" key={a}>
                <NavLink
                  className={({ isActive }) => `pf-nav-link${isActive ? ' active' : ''}`}
                  to={a}
                  end={a === '/'}
                >
                  {texto}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="d-flex align-items-center gap-3">
          {rolActual === 'admin' ? (
            <>
              <span className="badge px-3 py-2 rounded-pill" style={{ background: '#EAF2FA', color: 'var(--pf-primary)' }}>
                Administrador
              </span>
              <button className="btn btn-outline-danger rounded-pill px-3 btn-sm" onClick={salir}>
                Salir
              </button>
            </>
          ) : rolActual === 'cliente' ? (
            <>
              <NavLink className="pf-nav-link text-decoration-none d-none d-lg-inline" to="/perfil" onClick={cerrarMenu}>
                Mi Perfil
              </NavLink>
              <button className="btn btn-outline-danger rounded-pill px-3 btn-sm" onClick={salir}>
                Cerrar Sesión
              </button>
            </>
          ) : (
            <Link className="btn-pf text-decoration-none" to="/login" onClick={cerrarMenu}>
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
