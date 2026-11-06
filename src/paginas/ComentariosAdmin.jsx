import { useOpinionesAdmin } from '../hooks/useOpinionesAdmin.js'

export default function ComentariosAdmin() {
  const {
    cargando,
    error,
    setError,
    mensajeError,
    opcionesEstado,
    filtroEstado,
    setFiltroEstado,
    busqueda,
    setBusqueda,
    editando,
    editEstado,
    setEditEstado,
    editRespuesta,
    setEditRespuesta,
    guardando,
    opinionesFiltradas,
    totales,
    estadoDe,
    badgeClase,
    cargarOpiniones,
    iniciarEdicion,
    cancelarEdicion,
    guardarSeguimiento,
    eliminar,
    obtenerEstrellas,
    obtenerEstrellasVacias,
    estadosEdicion,
  } = useOpinionesAdmin()

  return (
    <div className="pf-panel">
      <div className="container py-4">
        <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
          <div>
            <h2 className="fw-bold mb-1">Comentarios de Clientes</h2>
            <p className="text-muted mb-0">Revisa, responde y da seguimiento a las opiniones publicadas en la web.</p>
          </div>
          <button className="btn btn-outline-secondary btn-sm" onClick={cargarOpiniones}>
            Actualizar listado
          </button>
        </div>

        {error && (
          <div className="alert alert-danger d-flex justify-content-between align-items-center">
            <span>{mensajeError}</span>
            <button className="btn btn-sm btn-outline-danger" onClick={() => setError(false)}>
              Cerrar
            </button>
          </div>
        )}

        <div className="row g-3 mb-4">
          <div className="col-6 col-md-3">
            <div className="card admin-stat shadow-sm h-100">
              <div className="card-body">
                <h6 className="text-muted small mb-1">Total</h6>
                <h3 className="fw-bold mb-0">{totales.total}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card admin-stat shadow-sm h-100 border-danger">
              <div className="card-body">
                <h6 className="text-muted small mb-1">Nuevos</h6>
                <h3 className="fw-bold mb-0 text-danger">{totales.nuevos}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card admin-stat shadow-sm h-100 border-warning">
              <div className="card-body">
                <h6 className="text-muted small mb-1">En revisión</h6>
                <h3 className="fw-bold mb-0 text-warning">{totales.enRevision}</h3>
              </div>
            </div>
          </div>
          <div className="col-6 col-md-3">
            <div className="card admin-stat shadow-sm h-100 border-success">
              <div className="card-body">
                <h6 className="text-muted small mb-1">Resueltos</h6>
                <h3 className="fw-bold mb-0 text-success">{totales.resueltos}</h3>
                <div className="small text-muted">Promedio: {totales.calif} ★</div>
              </div>
            </div>
          </div>
        </div>

        <div className="card shadow-sm mb-4">
          <div className="card-body d-flex flex-wrap gap-3 align-items-center">
            <div className="btn-group">
              {opcionesEstado.map((e) => (
                <button
                  className={`btn btn-sm ${filtroEstado === e ? 'btn-success' : 'btn-outline-success'}`}
                  onClick={() => setFiltroEstado(e)}
                  key={e}
                >
                  {e}
                </button>
              ))}
            </div>
            <div className="ms-auto" style={{ minWidth: 260 }}>
              <input
                type="search"
                className="form-control form-control-sm"
                placeholder="Buscar por nombre, mascota o comentario..."
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </div>
          </div>
        </div>

        {cargando && (
          <div className="text-center py-5">
            <div className="spinner-border text-success"></div>
            <p className="text-muted mt-2 mb-0">Cargando comentarios...</p>
          </div>
        )}

        {!cargando && opinionesFiltradas.length === 0 && (
          <div className="alert alert-info text-center">No hay comentarios que coincidan con el filtro.</div>
        )}

        {!cargando && opinionesFiltradas.length > 0 && (
          <div className="card shadow-sm">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover align-middle mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>Cliente</th>
                      <th>Calificación</th>
                      <th>Comentario</th>
                      <th>Estado</th>
                      <th>Respuesta admin</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opinionesFiltradas.map((op) => (
                      <tr key={op.id}>
                        <td>
                          <div className="fw-semibold">{op.nombreUsuario}</div>
                          <div className="small text-muted">
                            {op.detallesMascota} &middot; {op.fecha}
                          </div>
                        </td>
                        <td>
                          <span className="text-warning">
                            {obtenerEstrellas(op.calificacion).map((_, i) => (
                              <span key={`llena-${i}`}>★</span>
                            ))}
                            {obtenerEstrellasVacias(op.calificacion).map((_, i) => (
                              <span className="text-black-50 opacity-25" key={`vacia-${i}`}>
                                ★
                              </span>
                            ))}
                          </span>
                          <span className="small text-muted ms-1">{op.calificacion}/5</span>
                        </td>
                        <td style={{ maxWidth: 320 }}>
                          <div className="small text-truncate" title={op.comentario}>
                            {op.comentario}
                          </div>
                        </td>
                        <td>
                          <span className={`badge ${badgeClase(op.estado)}`}>{estadoDe(op)}</span>
                        </td>
                        <td style={{ maxWidth: 220 }}>
                          {op.respuestaAdmin && (
                            <div className="small text-truncate" title={op.respuestaAdmin}>
                              {op.respuestaAdmin}
                            </div>
                          )}
                          {op.fechaRespuesta && <div className="small text-muted">{op.fechaRespuesta}</div>}
                          {!op.respuestaAdmin && <span className="text-muted small">Sin respuesta</span>}
                        </td>
                        <td className="text-end text-nowrap">
                          <button className="btn btn-sm btn-outline-success me-1" onClick={() => iniciarEdicion(op)}>
                            Responder
                          </button>
                          <button className="btn btn-sm btn-outline-danger" onClick={() => eliminar(op)}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {editando && (
          <div className="card shadow border-success mt-4">
            <div className="card-header bg-success text-white fw-bold">Seguimiento del comentario</div>
            <div className="card-body">
              <div className="alert alert-light border mb-3 small">
                <strong>{editando.nombreUsuario}</strong> &middot; {editando.detallesMascota} &middot; {editando.fecha}
                <div className="text-secondary mt-1">{editando.comentario}</div>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <label className="form-label fw-semibold">Estado</label>
                  <select
                    className="form-select"
                    value={editEstado}
                    onChange={(e) => setEditEstado(e.target.value)}
                  >
                    {estadosEdicion.map((e) => (
                      <option value={e} key={e}>
                        {e}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="col-md-8">
                  <label className="form-label fw-semibold">Respuesta al cliente</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Escribe aquí la respuesta que se mostrará públicamente al cliente..."
                    value={editRespuesta}
                    onChange={(e) => setEditRespuesta(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="text-end mt-3">
                <button className="btn btn-outline-secondary me-2" onClick={cancelarEdicion}>
                  Cancelar
                </button>
                <button className="btn btn-success" disabled={guardando} onClick={guardarSeguimiento}>
                  {guardando && <span className="spinner-border spinner-border-sm me-1"></span>}
                  Guardar seguimiento
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
