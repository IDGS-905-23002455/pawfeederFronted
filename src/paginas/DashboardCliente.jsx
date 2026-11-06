import { Link } from 'react-router-dom'
import { PanelAlerta } from '../componentes/PanelAlerta.jsx'
import { formatearNumero } from '../datos/panel.js'
import { useDashboardCliente } from '../hooks/useDashboardCliente.js'

export default function DashboardCliente() {
  const {
    usuarioNombre,
    comprasCount,
    mascotas,
    horarios,
    comida,
    comida7Dias,
    dispensadores,
    sesiones,
    notificaciones,
    cargando,
    error,
    mensajeError,
    barraComida,
  } = useDashboardCliente()

  return (
    <div className="pf-panel">
      <div className="admin-wrap">
        {error && <PanelAlerta tipo="error">{mensajeError}</PanelAlerta>}

        <div className="admin-header">
          <div>
            <span className="admin-eyebrow">RESUMEN</span>
            <h2 className="admin-title">Hola, {usuarioNombre}</h2>
            <p className="admin-subtitle">Así va tu PawFeeder hoy</p>
          </div>
        </div>

        {cargando ? (
          <div className="text-center py-5 text-muted">Cargando datos...</div>
        ) : (
          <>
            <div className="admin-stats">
              <Link className="stat-card clickable text-decoration-none" to="/mascotas" title="Ver mascotas">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <div>
                  <h3>{mascotas.total}</h3>
                  <span>Mascotas registradas</span>
                </div>
              </Link>

              <Link className="stat-card clickable text-decoration-none" to="/horarios" title="Ver horarios">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></svg>
                </div>
                <div>
                  <h3>{horarios.total}</h3>
                  <span>Horarios guardados</span>
                </div>
              </Link>

              <div className="stat-card">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4" /><path d="M16 2v4" /><rect x="3" y="4" width="18" height="18" rx="2" /><path d="M3 10h18" /></svg>
                </div>
                <div>
                  <h3>{formatearNumero(comida.semanaGramos)} g</h3>
                  <span>Comida esta semana</span>
                </div>
              </div>

              <div className="stat-card">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" /></svg>
                </div>
                <div>
                  <h3>{formatearNumero(comida.hoyGramos)} g</h3>
                  <span>Comida hoy</span>
                </div>
              </div>

              <Link className="stat-card clickable text-decoration-none" to="/perfil" title="Ver perfil">
                <div className="stat-icon icon-red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 29h4" /><path d="M12 2a7 7 0 0 1 7 7c0 4-2 5-2 8h-10c0-3-2-4-2-8a7 7 0 0 1 7-7z" /></svg>
                </div>
                <div>
                  <h3>{sesiones.total}</h3>
                  <span>Inicios de sesión</span>
                </div>
              </Link>

              <Link className="stat-card clickable text-decoration-none" to="/mis-compras" title="Ver mis compras">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
                </div>
                <div>
                  <h3>{comprasCount}</h3>
                  <span>Mis compras</span>
                </div>
              </Link>
            </div>

            <div className="admin-card mb-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0" style={{ color: 'var(--pf-navy)' }}>Comida dispensada · últimos 7 días</h5>
                <span className="text-muted small">{formatearNumero(comida.semanaGramos)} g en total</span>
              </div>
              {comida7Dias.length === 0 ? (
                <p className="text-muted small mb-0">Aún no hay dispensaciones esta semana.</p>
              ) : (
                <div className="bars-week">
                  {comida7Dias.map((d) => (
                    <div className="bars-col" key={d.fecha}>
                      <span className="bars-value">{d.gramos}g</span>
                      <div className="bars-track">
                        <div
                          className="bars-bar"
                          style={{ height: `${barraComida(d)}%` }}
                          title={`${d.etiqueta}: ${d.gramos} g`}
                        ></div>
                      </div>
                      <span className="bars-label">{d.etiqueta}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Mis mascotas</h5>
                  {mascotas.lista.length === 0 ? (
                    <p className="text-muted small mt-2 mb-0">Aún no has registrado mascotas.</p>
                  ) : (
                    <ul className="list-group list-group-flush mt-2">
                      {mascotas.lista.map((m) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" key={m.id}>
                          <div>
                            <div className="fw-semibold">{m.nombre}</div>
                            <div className="small text-muted">{m.raza} · {m.tamano}</div>
                          </div>
                          <span className={`badge ${m.activa ? 'badge-ok' : 'badge-pending'}`}>
                            {m.activa ? 'Activa' : 'Inactiva'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link className="btn btn-verify btn-sm mt-3" to="/mascotas">Gestionar</Link>
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Próximos horarios</h5>
                  {horarios.lista.length === 0 ? (
                    <p className="text-muted small mt-2 mb-0">Aún no tienes horarios configurados.</p>
                  ) : (
                    <ul className="list-group list-group-flush mt-2">
                      {horarios.lista.slice(0, 5).map((h) => (
                        <li className="list-group-item d-flex justify-content-between align-items-center px-0" key={h.id}>
                          <div>
                            <div className="fw-semibold">{h.nombre}</div>
                            <div className="small text-muted">{h.hora} · {h.porcionGramos} g</div>
                          </div>
                          <span className={`badge ${h.activo ? 'badge-ok' : 'badge-pending'}`}>
                            {h.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link className="btn btn-verify btn-sm mt-3" to="/horarios">Gestionar</Link>
                </div>
              </div>
            </div>

            <div className="row g-4">
              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Mi dispensador</h5>
                  {dispensadores.length === 0 ? (
                    <p className="text-muted small mt-2 mb-0">No tienes dispensadores vinculados a tu cuenta.</p>
                  ) : (
                    dispensadores.map((d) => (
                      <div key={d.id}>
                        <div className="d-flex justify-content-between align-items-center py-2">
                          <div>
                            <div className="fw-semibold">{d.nombre}</div>
                            <div className="small text-muted mono">{d.codigoUnico}</div>
                          </div>
                          <span className={`badge ${d.activo ? 'badge-ok' : 'badge-error'}`}>
                            {d.activo ? 'En línea' : 'Desconectado'}
                          </span>
                        </div>
                        <div className="mb-2">
                          <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Batería</span><span>{d.bateriaPercent}%</span>
                          </div>
                          <div className="progress" style={{ height: 8 }}>
                            <div className="progress-bar" style={{ width: `${d.bateriaPercent}%`, background: 'var(--pf-primary)' }}></div>
                          </div>
                        </div>
                        <div className="mb-3">
                          <div className="d-flex justify-content-between small text-muted mb-1">
                            <span>Tolva</span><span>{d.nivelTolvaPct}%</span>
                          </div>
                          <div className="progress" style={{ height: 8 }}>
                            <div className="progress-bar" style={{ width: `${d.nivelTolvaPct}%`, background: 'var(--pf-amber)' }}></div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Actividad</h5>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Dispensaciones hoy</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{comida.dispensacionesHoy}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Dispensaciones totales</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{comida.totalDispensaciones}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Notificaciones sin leer</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{notificaciones.noLeidas}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Inicios desde la web</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{sesiones.web}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Inicios desde la app</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{sesiones.app}</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
