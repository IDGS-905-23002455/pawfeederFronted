import { Link, useNavigate } from 'react-router-dom'
import { useSesion } from '../hooks/useSesion.js'

export function Footer() {
  const { sesionIniciada, usuario, logout } = useSesion()
  const navegar = useNavigate()

  const rolActual = sesionIniciada ? usuario?.rol : 'publico'

  return (
    <footer className="pf-footer pt-5 pb-3 mt-5">
      <div className="container">
        <div className="row g-4">
          <div className="col-md-4">
            <h5 className="fw-bold mb-3">
              <img
                src="/imagenes/pawfeeder-mark-192.png"
                alt="PawFeeder"
                style={{ height: 26 }}
                className="me-2"
              />{' '}
              PawFeeder
            </h5>
            <p className="small" style={{ color: '#aeb9c6' }}>
              Dispensador inteligente de croquetas IoT. Alimentación precisa, programada y a distancia para el
              bienestar de tu mascota.
            </p>
          </div>

          <div className="col-md-4 text-md-center">
            <h6 className="fw-bold mb-3">Producto</h6>
            <ul className="list-unstyled small d-inline-block text-start">
              <li className="mb-2">
                <Link className="pf-footer-link" to="/about">Sobre el proyecto</Link>
              </li>
              <li className="mb-2">
                <Link className="pf-footer-link" to="/manual">Manual de uso</Link>
              </li>
              <li className="mb-2">
                <Link className="pf-footer-link" to="/preguntas-frecuentes">Preguntas frecuentes</Link>
              </li>
              <li className="mb-2">
                <Link className="pf-footer-link" to="/contacto">Soporte técnico</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4 text-md-end">
            <h6 className="fw-bold mb-3">Cuenta</h6>
            <ul className="list-unstyled small d-inline-block text-start text-md-end">
              {rolActual === 'publico' && (
                <>
                  <li className="mb-2">
                    <Link className="pf-footer-link" to="/login">Iniciar sesión</Link>
                  </li>
                  <li className="mb-2">
                    <Link className="pf-footer-link" to="/registro">Registrarse</Link>
                  </li>
                </>
              )}
              {rolActual === 'cliente' && (
                <li className="mb-2">
                  <button
                    type="button"
                    className="pf-footer-link border-0 bg-transparent p-0"
                    onClick={() => {
                      logout()
                      navegar('/')
                    }}
                  >
                    Cerrar sesión
                  </button>
                </li>
              )}
              {rolActual === 'admin' && (
                <>
                  <li className="mb-2">
                    <Link className="pf-footer-link" to="/admin">Administración</Link>
                  </li>
                  <li className="mb-2">
                    <button
                      type="button"
                      className="pf-footer-link border-0 bg-transparent p-0"
                      onClick={() => {
                        logout()
                        navegar('/')
                      }}
                    >
                      Cerrar sesión
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>

        <hr className="my-4" style={{ borderColor: '#3d5a7d' }} />
        <div className="text-center small" style={{ color: '#aeb9c6' }}>
          <p className="mb-0">© 2026 PawFeeder · Proyecto IoT con Arduino · Hecho con cariño</p>
        </div>
      </div>
    </footer>
  )
}
