import { Link } from 'react-router-dom'
import { PanelAlerta } from '../componentes/PanelAlerta.jsx'
import { formatearNumero } from '../datos/panel.js'
import { useDashboardAdmin } from '../hooks/useDashboardAdmin.js'

export default function DashboardAdmin() {
  const {
    usuarios,
    sesiones,
    inventario,
    ventas,
    general,
    cargando,
    error,
    mensajeError,
    filtroSesion,
    setFiltroSesion,
    sesionesFiltradas,
    maxProduccion,
    maxStock,
    pctClientes,
    pctAdmins,
    pctVerificados,
    pctActivos,
  } = useDashboardAdmin()

  return (
    <div className="pf-panel">
      <div className="admin-wrap">
        {error && <PanelAlerta tipo="error">{mensajeError}</PanelAlerta>}

        <div className="admin-header">
          <div>
            <span className="admin-eyebrow">PANEL ADMINISTRADOR</span>
            <h2 className="admin-title">Dashboard general</h2>
            <p className="admin-subtitle">Resumen global de usuarios, inventario y ventas</p>
          </div>
          <Link className="btn btn-pf-primary" to="/admin">Gestionar usuarios</Link>
        </div>

        {cargando ? (
          <div className="pf-loading-box">
            <span className="pf-loading-ring"></span>
            <span>Cargando dashboard...</span>
          </div>
        ) : (
          <>
            <h6 className="fw-bold text-uppercase small mb-2" style={{ color: 'var(--pf-muted)', letterSpacing: '0.08em' }}>Usuarios</h6>
            <div className="admin-stats">
              <Link className="stat-card clickable text-decoration-none" to="/admin" title="Ver usuarios">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
                </div>
                <div><h3>{usuarios.total}</h3><span>Usuarios totales</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/admin" title="Ver clientes">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 14s1.5 2 4 2 4-2 4-2" /><line x1="9" y1="9" x2="9.01" y2="9" /><line x1="15" y1="9" x2="15.01" y2="9" /></svg>
                </div>
                <div><h3>{usuarios.clientes}</h3><span>Clientes</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/admin" title="Ver administradores">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
                </div>
                <div><h3>{usuarios.admins}</h3><span>Administradores</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/admin" title="Ver verificados">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                </div>
                <div><h3>{usuarios.verificados}</h3><span>Verificados</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/admin" title="Ver activos">
                <div className="stat-icon icon-red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></svg>
                </div>
                <div><h3>{usuarios.activos}</h3><span>Activos</span></div>
              </Link>
            </div>

            <h6 className="fw-bold text-uppercase small mb-2" style={{ color: 'var(--pf-muted)', letterSpacing: '0.08em' }}>Ventas y dispositivo</h6>
            <div className="admin-stats">
              <Link className="stat-card clickable text-decoration-none" to="/inventario-dispensadores" title="Ver dispensadores">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" /><line x1="8" y1="2" x2="8" y2="22" /><line x1="16" y1="2" x2="16" y2="22" /></svg>
                </div>
                <div><h3>{inventario.unidadesFabricadas}</h3><span>Unidades fabricadas</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver inventario">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /></svg>
                </div>
                <div><h3>{inventario.unidadesTerminadas}</h3><span>Terminadas</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver pendientes">
                <div className="stat-icon icon-red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5" /><path d="M9 17h6" /></svg>
                </div>
                <div><h3>{inventario.unidadesPendientes}</h3><span>Pendientes</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario-dispensadores" title="Ver dispositivos">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>
                </div>
                <div><h3>{ventas.dispositivosRegistrados}</h3><span>Dispositivos registrados</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario-dispensadores" title="Ver activos">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>
                </div>
                <div><h3>{ventas.dispositivosActivos}</h3><span>Dispositivos activos</span></div>
              </Link>
            </div>

            <h6 className="fw-bold text-uppercase small mb-2" style={{ color: 'var(--pf-muted)', letterSpacing: '0.08em' }}>Inventario y stock</h6>
            <div className="admin-stats">
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver productos">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
                <div><h3>{inventario.productos.total}</h3><span>Productos</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver stock de productos">
                <div className="stat-icon icon-amber">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8V21H3V8" /><path d="M1 3h22v5H1z" /><path d="M10 12h4" /></svg>
                </div>
                <div><h3>{inventario.productos.stockTotal}</h3><span>Stock productos</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver componentes">
                <div className="stat-icon icon-blue">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                </div>
                <div><h3>{inventario.componentes.total}</h3><span>Componentes</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario" title="Ver stock de componentes">
                <div className="stat-icon icon-red">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 2v6h-6" /><path d="M3 12a9 9 0 0 1 15-6.7L21 8" /><path d="M3 22v-6h6" /><path d="M21 12a9 9 0 0 1-15 6.7L3 16" /></svg>
                </div>
                <div><h3>{inventario.componentes.stockTotal}</h3><span>Stock componentes</span></div>
              </Link>
            </div>

            <h6 className="fw-bold text-uppercase small mb-2 mt-4" style={{ color: 'var(--pf-muted)', letterSpacing: '0.08em' }}>Accesos rápidos</h6>
            <div className="admin-stats">
              <Link className="stat-card clickable text-decoration-none" to="/admin">
                <div className="stat-icon icon-blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg></div>
                <div><h3 className="fs-5">Usuarios</h3><span>Gestionar cuentas</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario">
                <div className="stat-icon icon-blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg></div>
                <div><h3 className="fs-5">Inventario</h3><span>Productos y stock</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/inventario-dispensadores">
                <div className="stat-icon icon-amber"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg></div>
                <div><h3 className="fs-5">Dispensadores</h3><span>Unidades y firmware</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/proveedores">
                <div className="stat-icon icon-red"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" /><polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" /></svg></div>
                <div><h3 className="fs-5">Proveedores</h3><span>Gestión de abasto</span></div>
              </Link>
              <Link className="stat-card clickable text-decoration-none" to="/recetas">
                <div className="stat-icon icon-amber"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 2 .5 4 1.5 5.5L5 22l3-2 2 2 2-2 2 2 2-2 3 2-1.5-7.5C20.5 13 21 11 21 9a7 7 0 0 0-7-7z" /><circle cx="9" cy="9" r="1" /><circle cx="15" cy="9" r="1" /></svg></div>
                <div><h3 className="fs-5">Recetas</h3><span>Fórmulas de comida</span></div>
              </Link>
            </div>

            <h6 className="fw-bold text-uppercase small mb-2 mt-4" style={{ color: 'var(--pf-muted)', letterSpacing: '0.08em' }}>Gráficas</h6>
            <div className="row g-4 mb-4">
              <div className="col-md-5">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Usuarios por rol</h5>
                  <div className="d-flex align-items-center gap-4 mt-3">
                    <div className="donut" style={{ '--pct': pctClientes }} role="img" aria-label="Usuarios por rol">
                      <span className="donut-center">{usuarios.total}</span>
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between small mb-1">
                        <span><span className="dot dot-blue"></span> Clientes</span>
                        <b>{usuarios.clientes} ({pctClientes}%)</b>
                      </div>
                      <div className="d-flex justify-content-between small mb-1">
                        <span><span className="dot dot-amber"></span> Administradores</span>
                        <b>{usuarios.admins} ({pctAdmins}%)</b>
                      </div>
                      <div className="d-flex justify-content-between small text-muted">
                        <span>Verificación</span>
                        <b>{usuarios.verificados} ({pctVerificados}%)</b>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-md-7">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Producción</h5>
                  <div className="mt-3">
                    <div className="chart-row">
                      <span className="chart-label">Fabricadas</span>
                      <div className="chart-track"><div className="chart-bar bar-blue" style={{ width: `${(inventario.unidadesFabricadas / maxProduccion) * 100}%` }}></div></div>
                      <span className="chart-value">{inventario.unidadesFabricadas}</span>
                    </div>
                    <div className="chart-row">
                      <span className="chart-label">Terminadas</span>
                      <div className="chart-track"><div className="chart-bar bar-green" style={{ width: `${(inventario.unidadesTerminadas / maxProduccion) * 100}%` }}></div></div>
                      <span className="chart-value">{inventario.unidadesTerminadas}</span>
                    </div>
                    <div className="chart-row">
                      <span className="chart-label">Pendientes</span>
                      <div className="chart-track"><div className="chart-bar bar-amber" style={{ width: `${(inventario.unidadesPendientes / maxProduccion) * 100}%` }}></div></div>
                      <span className="chart-value">{inventario.unidadesPendientes}</span>
                    </div>
                    <div className="chart-row">
                      <span className="chart-label">Stock productos</span>
                      <div className="chart-track"><div className="chart-bar bar-blue" style={{ width: `${(inventario.productos.stockTotal / maxStock) * 100}%` }}></div></div>
                      <span className="chart-value">{inventario.productos.stockTotal}</span>
                    </div>
                    <div className="chart-row">
                      <span className="chart-label">Stock componentes</span>
                      <div className="chart-track"><div className="chart-bar bar-amber" style={{ width: `${(inventario.componentes.stockTotal / maxStock) * 100}%` }}></div></div>
                      <span className="chart-value">{inventario.componentes.stockTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row g-4 mb-4">
              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Comunidad</h5>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Mascotas registradas</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{general.mascotas}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Horarios activos</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{general.horarios}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Opiniones</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{general.opiniones}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Calificación promedio</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{Number(general.calificacionPromedio || 0).toFixed(1)} / 5</span>
                  </div>
                  <Link to="/comentarios" className="small fw-semibold" style={{ color: 'var(--pf-primary)' }}>Ver y responder comentarios →</Link>
                </div>
              </div>

              <div className="col-md-6">
                <div className="admin-card h-100">
                  <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Actividad global</h5>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Dispensaciones ejecutadas</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{ventas.dispensacionesEjecutadas}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Comida dispensada total</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{formatearNumero(ventas.comidaTotalGramos)} g</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Inicios de sesión totales</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{sesiones.total}</span>
                  </div>
                  <div className="d-flex justify-content-between align-items-center py-2">
                    <span className="text-muted small">Usuarios activos</span>
                    <span className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{usuarios.activos} ({pctActivos}%)</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="admin-card">
              <h5 className="fw-bold" style={{ color: 'var(--pf-navy)' }}>Inicios de sesión por usuario</h5>
              <div className="mt-2 mb-1" style={{ maxWidth: 320 }}>
                <input
                  type="text"
                  className="form-control pf-input"
                  placeholder="Buscar por nombre o correo..."
                  value={filtroSesion}
                  onChange={(e) => setFiltroSesion(e.target.value)}
                />
              </div>
              {sesionesFiltradas.length === 0 ? (
                <p className="text-muted small mt-2 mb-0">No hay coincidencias.</p>
              ) : (
                <div className="table-responsive mt-2">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Usuario</th>
                        <th>Correo</th>
                        <th>Web</th>
                        <th>App</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sesionesFiltradas.map((s) => (
                        <tr key={s.usuarioId}>
                          <td className="fw-semibold">{s.nombre}</td>
                          <td className="mono">{s.email}</td>
                          <td>{s.web}</td>
                          <td>{s.app}</td>
                          <td className="fw-bold" style={{ color: 'var(--pf-navy)' }}>{s.total}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}
