import { formatearNumero } from '../datos/panel.js'
import { useMisCompras } from '../hooks/useMisCompras.js'

export default function MisCompras() {
  const {
    usuarioNombre,
    catalogo,
    cargandoCatalogo,
    errorCatalogo,
    compras,
    compraEnReview,
    compraEnReviewId,
    reviewCalificacion,
    setReviewCalificacion,
    reviewComentario,
    setReviewComentario,
    enviandoReview,
    reviewError,
    mensajeExito,
    mensajeError,
    comprasPendientes,
    totalCompras,
    totalInvertido,
    pendientesOpinion,
    comprar,
    abrirReview,
    enviarReview,
    onSelectProducto,
    tieneReview,
  } = useMisCompras()

  return (
    <div className="pf-panel">
      <div className="admin-wrap">
        <div className="admin-header">
          <div>
            <span className="admin-eyebrow">MIS COMPRAS</span>
            <h2 className="admin-title">Tienda y compras de {usuarioNombre}</h2>
            <p className="admin-subtitle">
              Consulta tus compras realizadas y comparte tu opinión sobre el producto adquirido.
            </p>
          </div>
        </div>

        {mensajeExito && (
          <div className="admin-alert alert-ok">
            <span>✓</span> {mensajeExito}
          </div>
        )}

        {mensajeError && <div className="admin-alert alert-error">{mensajeError}</div>}

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon icon-blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
            </div>
            <div>
              <h3>{totalCompras}</h3>
              <span>Compras realizadas</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-amber">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
            </div>
            <div>
              <h3>${formatearNumero(totalInvertido)}</h3>
              <span>Total invertido</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon icon-red">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" /></svg>
            </div>
            <div>
              <h3>{pendientesOpinion}</h3>
              <span>Pendientes de opinar</span>
            </div>
          </div>
        </div>

        {errorCatalogo && (
          <div className="admin-alert alert-warn">
            No se pudo consultar el catálogo en la API; se muestra el catálogo disponible.
          </div>
        )}

        <div className="admin-card mb-4">
          <h5 className="fw-bold mb-3" style={{ color: 'var(--pf-navy)' }}>Tienda PawFeeder</h5>
          {cargandoCatalogo ? (
            <p className="text-muted small mb-0">Cargando catálogo de productos...</p>
          ) : (
            <div className="catalogo-grid">
              {catalogo.map((p) => (
                <div className="producto-card" key={p.id}>
                  <div className="producto-icon">
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="4" r="2" /><circle cx="18" cy="8" r="2" /><circle cx="20" cy="16" r="2" /><path d="M9 10a5 5 0 0 1 5 5v3.5a3.5 3.5 0 0 1-6.84 1.045Q6.52 17.48 4.46 16.84A3.5 3.5 0 0 1 5.5 10Z" /></svg>
                  </div>
                  <h6 className="fw-bold mb-1" style={{ color: 'var(--pf-navy)' }}>{p.nombre}</h6>
                  <p className="text-muted small mb-2">{p.descripcion}</p>
                  <div className="d-flex justify-content-between align-items-center mt-auto">
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>${formatearNumero(p.precio)}</span>
                    <button className="btn btn-verify" onClick={() => comprar(p)}>Comprar</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="admin-card mb-4" id="mis-compras">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-bold mb-0" style={{ color: 'var(--pf-navy)' }}>Mis compras realizadas</h5>
            <span className="text-muted small">{compras.length} registro(s)</span>
          </div>

          {compras.length === 0 ? (
            <p className="text-muted small mb-0">
              Aún no tienes compras registradas. Compra un producto en la tienda para verlo aquí.
            </p>
          ) : (
            <div className="table-responsive">
              <table className="table align-middle mb-0">
                <thead>
                  <tr>
                    <th className="text-muted small">Producto</th>
                    <th className="text-muted small">Fecha</th>
                    <th className="text-muted small text-end">Cantidad</th>
                    <th className="text-muted small text-end">Total</th>
                    <th className="text-muted small">Estado</th>
                    <th className="text-muted small text-end">Opinión</th>
                  </tr>
                </thead>
                <tbody>
                  {compras.map((c) => (
                    <tr key={c.id}>
                      <td>
                        <div className="fw-semibold">{c.nombreProducto}</div>
                        <div className="small text-muted">${formatearNumero(c.precio)} c/u</div>
                      </td>
                      <td className="text-muted small">{c.fecha}</td>
                      <td className="text-end">{c.cantidad}</td>
                      <td className="text-end fw-semibold" style={{ color: 'var(--pf-navy)' }}>
                        ${formatearNumero(c.precio * c.cantidad)}
                      </td>
                      <td><span className="badge badge-ok">{c.estado}</span></td>
                      <td className="text-end">
                        {tieneReview(c) ? (
                          <span className="badge badge-ok">Opinada</span>
                        ) : (
                          <button className="btn btn-verify btn-sm" onClick={() => abrirReview(c)}>
                            Dejar opinión
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="admin-card" id="dejar-opinion">
          <h5 className="fw-bold mb-1" style={{ color: 'var(--pf-navy)' }}>
            Deja tu opinión sobre el producto adquirido
          </h5>
          <p className="text-muted small mb-3">
            Selecciona un producto comprado, califícalo y comparte tu experiencia. Tu opinión se publicará en la
            sección pública de Comentarios de PawFeeder.
          </p>

          {comprasPendientes.length === 0 ? (
            <div className="admin-alert alert-ok mb-0">
              Ya opinaste sobre todos tus productos comprados. ¡Gracias por tu participación!
            </div>
          ) : (
            <>
              <div className="mb-3">
                <label className="form-label fw-semibold small">Producto adquirido</label>
                <select
                  className="form-select"
                  value={compraEnReviewId ?? ''}
                  onChange={(e) => onSelectProducto(e.target.value)}
                >
                  {comprasPendientes.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.nombreProducto} · {c.fecha}
                    </option>
                  ))}
                </select>
              </div>

              {compraEnReview && (
                <>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Calificación (estrellas)</label>
                    <div className="star-select">
                      {[1, 2, 3, 4, 5].map((i) => (
                        <span
                          className={`star${i <= reviewCalificacion ? ' active' : ''}`}
                          onClick={() => setReviewCalificacion(i)}
                          key={i}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold small">Tu comentario</label>
                    <textarea
                      className="form-control"
                      rows="4"
                      maxLength="300"
                      placeholder="Cuéntanos tu experiencia con este producto..."
                      value={reviewComentario}
                      onChange={(e) => setReviewComentario(e.target.value)}
                    ></textarea>
                    <div className="text-end text-muted small mt-1">{reviewComentario.length}/300</div>
                  </div>

                  {reviewError && <div className="admin-alert alert-error mb-3">{reviewError}</div>}

                  <div className="d-flex gap-2 justify-content-end">
                    <button className="btn btn-verify" onClick={enviarReview} disabled={enviandoReview}>
                      {enviandoReview ? 'Publicando...' : 'Publicar opinión'}
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
