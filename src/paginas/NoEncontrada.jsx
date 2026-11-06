import { Link } from 'react-router-dom'

export default function NoEncontrada() {
  return (
    <div className="text-center py-5">
      <div className="pf-badge mb-3">Error 404</div>
      <h1 className="fw-bold mb-3">Esta página no existe</h1>
      <p className="text-muted mb-4" style={{ maxWidth: 460, margin: '0 auto' }}>
        La ruta que buscas no está disponible en esta versión de PawFeeder.
      </p>
      <Link to="/" className="btn-pf-outline text-decoration-none">
        Volver al inicio
      </Link>
    </div>
  )
}