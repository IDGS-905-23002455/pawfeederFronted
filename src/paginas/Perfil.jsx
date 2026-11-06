import { usePerfil } from '../hooks/usePerfil.js'

export default function Perfil() {
  const { form, cargando, guardando, errorMsg, exitoMsg, rol, valido, cambiar, guardarPerfil } = usePerfil()

  return (
    <div className="pf-perfil-panel">
      <div className="panel-card profile-wrap">
        <div className="page-header">
          <div>
            <h1 className="page-title">Mi Perfil</h1>
            <p className="text-muted mb-0">Configuración general de tu cuenta PawFeeder.</p>
          </div>
        </div>

        {cargando ? (
          <div className="pf-loading-box">
            <span className="pf-spinner"></span>
            <span>Cargando tu perfil...</span>
          </div>
        ) : (
          <div className="row g-4">
            <div className="col-lg-4">
              <div className="panel-card text-center p-4">
                <div className="pf-avatar mb-3">
                  <span>{(form.nombre || 'U')[0].toUpperCase()}</span>
                </div>
                <h4 className="mb-1">{form.nombre || 'Usuario'}</h4>
                <p className="text-muted small mb-3">{form.email}</p>
                <span className={`badge-pf ${rol === 'admin' ? 'badge-pf-amber' : 'badge-pf-blue'}`}>
                  {rol === 'admin' ? 'Administrador' : 'Cliente'}
                </span>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="panel-card">
                <form onSubmit={guardarPerfil}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Nombre completo</label>
                    <input
                      type="text"
                      className="form-control pf-input"
                      placeholder="Tu nombre"
                      value={form.nombre}
                      onChange={(e) => cambiar('nombre', e.target.value)}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Correo electrónico</label>
                    <input
                      type="email"
                      className="form-control pf-input"
                      readOnly
                      style={{ backgroundColor: 'var(--pf-primary-light)' }}
                      value={form.email}
                    />
                    <small className="text-muted">El correo electrónico no se puede cambiar.</small>
                  </div>

                  <div className="mb-4">
                    <label className="form-label fw-semibold">Teléfono de contacto</label>
                    <input
                      type="text"
                      className="form-control pf-input"
                      placeholder="Ej. 4771234567"
                      value={form.telefono}
                      onChange={(e) => cambiar('telefono', e.target.value)}
                    />
                  </div>

                  {errorMsg && <div className="alert alert-danger py-2 small">{errorMsg}</div>}
                  {exitoMsg && <div className="alert alert-success py-2 small">{exitoMsg}</div>}

                  <button type="submit" className="btn btn-pf-block" disabled={guardando || !valido}>
                    {guardando ? (
                      <>
                        <span className="pf-spinner me-2"></span> Guardando...
                      </>
                    ) : (
                      'Guardar Cambios'
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
