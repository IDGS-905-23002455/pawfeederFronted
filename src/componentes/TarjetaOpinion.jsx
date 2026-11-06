import { Estrellas } from './Estrellas.jsx'

export function TarjetaOpinion({ opinion }) {
  return (
    <div className="card h-100 shadow-sm border-0 rounded-4 p-3 border">
      <div className="card-body p-2">
        <div className="d-flex align-items-center gap-3 mb-3">
          <div
            className="rounded-circle border border-3 border-success p-1 d-flex align-items-center justify-content-center"
            style={{ width: 60, height: 60, overflow: 'hidden', background: '#e9ecef' }}
          >
            <span className="fs-4">🐾</span>
          </div>
          <div>
            <h6 className="fw-bold text-dark mb-0">{opinion.nombreUsuario}</h6>
            <p className="text-secondary small mb-0">{opinion.detallesMascota}</p>
            <span className="text-muted" style={{ fontSize: '0.72rem' }}>{opinion.fecha}</span>
          </div>
        </div>

        <Estrellas calificacion={Number(opinion.calificacion)} />

        <p className="card-text text-secondary mt-2 small lh-sm">{opinion.comentario}</p>
      </div>
    </div>
  )
}
