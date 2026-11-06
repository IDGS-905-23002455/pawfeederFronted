import { ErrorCampo } from '../componentes/ErrorCampo.jsx'
import { TarjetaOpinion } from '../componentes/TarjetaOpinion.jsx'
import { useOpiniones } from '../hooks/useOpiniones.js'

export default function Reviews() {
  const { opiniones, cargando, errorCarga, form, cambiar, marcar, error, enviando, mensaje, enviar, recargar } =
    useOpiniones()

  return (
    <div className="container my-5">
      <div className="row align-items-center mb-5 bg-white p-4 rounded shadow-sm border">
        <div className="col-md-5 d-flex align-items-center gap-4 border-end justify-content-center justify-content-md-start">
          <div className="position-relative d-inline-flex justify-content-center align-items-center">
            <div
              className="rounded-circle border border-5 border-success-subtle d-flex align-items-center justify-content-center"
              style={{
                width: 120,
                height: 120,
                borderTopColor: '#198754',
                borderWidth: 12,
                transform: 'rotate(45deg)',
              }}
            >
              <span className="fs-2 fw-bold text-success position-absolute" style={{ transform: 'rotate(-45deg)' }}>
                95%
              </span>
            </div>
          </div>
          <div>
            <h4 className="fw-bold mb-1 text-dark">Satisfacción de los Usuarios</h4>
            <p className="text-muted small mb-0">reporta mejora en la puntualidad dietética</p>
          </div>
        </div>
        <div className="col-md-7 ps-md-5 mt-4 mt-md-0 text-center text-md-start">
          <h2 className="fw-bold lh-base">
            Nuestros clientes confirman:
            <br />
            <span className="text-success">PawFeeder</span> cumple sus promesas.
          </h2>
        </div>
      </div>

      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <h4 className="fw-bold text-success mb-3">Déjanos tu Opinión</h4>

            <form onSubmit={enviar} noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="op-nombre">Tu Nombre</label>
                <input
                  id="op-nombre"
                  type="text"
                  className={`form-control${error('nombreUsuario') ? ' is-invalid' : ''}`}
                  placeholder="Ej. Ana o Carlos"
                  value={form.nombreUsuario}
                  onChange={cambiar('nombreUsuario')}
                  onBlur={marcar('nombreUsuario')}
                />
                <ErrorCampo>{error('nombreUsuario')}</ErrorCampo>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="op-mascota">Tu Mascota (Raza y Nombre)</label>
                <input
                  id="op-mascota"
                  type="text"
                  className={`form-control${error('detallesMascota') ? ' is-invalid' : ''}`}
                  placeholder="Ej. Labrador Max o Luna"
                  value={form.detallesMascota}
                  onChange={cambiar('detallesMascota')}
                  onBlur={marcar('detallesMascota')}
                />
                <ErrorCampo>{error('detallesMascota')}</ErrorCampo>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold" htmlFor="op-calificacion">Calificación (Estrellas)</label>
                <select
                  id="op-calificacion"
                  className="form-select"
                  value={form.calificacion}
                  onChange={cambiar('calificacion')}
                >
                  <option value="5">⭐⭐⭐⭐⭐ 5 - Excelente</option>
                  <option value="4">⭐⭐⭐⭐ 4 - Bueno</option>
                  <option value="3">⭐⭐⭐ 3 - Regular</option>
                  <option value="2">⭐⭐ 2 - Malo</option>
                  <option value="1">⭐ 1 - Pésimo</option>
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold" htmlFor="op-comentario">Tu Comentario</label>
                <textarea
                  id="op-comentario"
                  className={`form-control${error('comentario') ? ' is-invalid' : ''}`}
                  rows="4"
                  maxLength={300}
                  placeholder="Cuéntanos tu experiencia con PawFeeder..."
                  value={form.comentario}
                  onChange={cambiar('comentario')}
                  onBlur={marcar('comentario')}
                />
                <ErrorCampo>{error('comentario')}</ErrorCampo>
              </div>

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} py-2 small`}>{mensaje.texto}</div>
              )}

              <div className="d-grid">
                <button type="submit" className="btn btn-success fw-bold" disabled={enviando}>
                  {enviando ? 'Publicando...' : 'Publicar Comentario'}
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <h3 className="fw-bold mb-4">Comentarios de la Comunidad</h3>

          {cargando && (
            <div className="alert alert-info shadow-sm d-flex align-items-center gap-2">
              <div className="spinner-border spinner-border-sm text-info" role="status" />
              <span>Cargando comentarios desde la base de datos...</span>
            </div>
          )}

          {!cargando && errorCarga && (
            <div className="alert alert-warning shadow-sm d-flex flex-column gap-2">
              <span>No se pudieron cargar los comentarios: {errorCarga}</span>
              <button type="button" className="btn btn-sm btn-outline-secondary align-self-start" onClick={recargar}>
                Reintentar
              </button>
            </div>
          )}

          {!cargando && !errorCarga && opiniones.length === 0 && (
            <div className="alert alert-secondary shadow-sm">Todavía no hay comentarios. ¡Sé el primero!</div>
          )}

          <div className="row">
            {opiniones.map((op, i) => (
              <div className="col-md-6 mb-3" key={`${op.id ?? i}-${op.nombreUsuario}`}>
                <TarjetaOpinion opinion={op} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
