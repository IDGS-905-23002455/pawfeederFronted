import { PanelAlerta } from '../componentes/PanelAlerta.jsx'
import { useAdminUsuarios } from '../hooks/useAdminUsuarios.js'

export default function Admin() {
  const {
    usuarios,
    dispensadores,
    cargando,
    mensaje,
    tipoMensaje,
    verificadosCount,
    cargarUsuarios,
    verificar,
    cambiarRol,
    darDeBaja,
  } = useAdminUsuarios()

  return (
    <div className="pf-panel">
      <div className="admin-wrap">
        {mensaje && <PanelAlerta tipo={tipoMensaje === 'ok' ? 'ok' : 'error'}>{mensaje}</PanelAlerta>}

        <div className="admin-header">
          <div>
            <span className="admin-eyebrow">PANEL DE CONTROL</span>
            <h2 className="admin-title">Consola de Administración</h2>
            <p className="admin-subtitle">Gestiona usuarios, verificaciones y hardware de PawFeeder</p>
          </div>
          <button className="btn btn-outline btn-sm" onClick={cargarUsuarios} disabled={cargando}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 4 }}><path d="M21 12a9 9 0 1 1-2.6-6.4" /><path d="M21 3v6h-6" /></svg>
            Refrescar
          </button>
        </div>

        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon icon-blue"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg></div>
            <div>
              <h3>{cargando ? '…' : usuarios.length}</h3>
              <span>Usuarios totales</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon icon-amber"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg></div>
            <div>
              <h3>{cargando ? '…' : verificadosCount}</h3>
              <span>Verificados</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon icon-red"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#b91c1c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" /><path d="M12 18h.01" /></svg></div>
            <div>
              <h3>{dispensadores.length}</h3>
              <span>Dispositivos</span>
            </div>
          </div>
        </div>

        <div className="admin-card">
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th>Correo</th>
                  <th>Rol</th>
                  <th>Verificación</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {cargando ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">Cargando usuarios…</td>
                  </tr>
                ) : (
                  <>
                    {usuarios.map((user) => (
                      <tr key={user.id}>
                        <td className="mono">#{user.id}</td>
                        <td className="fw-semibold">{user.nombre}</td>
                        <td className="text-muted">{user.correo}</td>
                        <td>
                          <span className={`badge ${user.rol === 'admin' ? 'badge-admin' : 'badge-cliente'}`}>
                            {user.rol === 'admin' ? 'Admin' : 'Cliente'}
                          </span>
                        </td>
                        <td>
                          {user.verificado ? (
                            <span className="badge badge-ok"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 3, verticalAlign: -1 }}><polyline points="20 6 9 17 4 12" /></svg>Verificado</span>
                          ) : (
                            <span className="badge badge-pending"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 3, verticalAlign: -1 }}><circle cx="12" cy="12" r="6" /></svg>Sin verificar</span>
                          )}
                        </td>
                        <td>
                          <span className={`badge ${user.estado === 'Activo' ? 'badge-ok' : 'badge-error'}`}>
                            {user.estado}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex flex-wrap gap-1">
                            {!user.verificado && (
                              <button className="btn btn-sm btn-verify" onClick={() => verificar(user)} disabled={user.actuando}>
                                {user.actuando ? '…' : 'Verificar'}
                              </button>
                            )}
                            <button
                              className={`btn btn-sm ${user.rol === 'admin' ? 'btn-rol-out' : 'btn-rol-up'}`}
                              onClick={() => cambiarRol(user)}
                              disabled={user.actuando}
                            >
                              {user.rol === 'admin' ? 'Quitar admin' : 'Hacer admin'}
                            </button>
                            <button
                              className={`btn btn-sm ${user.estado === 'Activo' ? 'btn-suspender' : 'btn-activar'}`}
                              onClick={() => darDeBaja(user)}
                              disabled={user.actuando}
                            >
                              {user.estado === 'Activo' ? 'Suspender' : 'Activar'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {usuarios.length === 0 && (
                      <tr>
                        <td colSpan="7" className="text-center text-muted py-4">No hay usuarios registrados</td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
