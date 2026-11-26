import { useRef } from 'react'
import { usePerfil } from '../hooks/usePerfil.js'

export default function Perfil() {
  const { form, cargando, guardando, errorMsg, exitoMsg, rol, valido, cambiar, cambiarFoto, quitarFoto, guardarPerfil } = usePerfil()
  const inputFotoRef = useRef(null)

  const inicial = (form.nombre || 'U')[0].toUpperCase()

  return (
    <div className="pf-perfil-panel">
      <div className="panel-card profile-wrap">
        <div className="page-header">
          <div>
            <h1 className="page-title">Mi Perfil</h1>
            <p className="text-muted mb-0">Administra tu información personal y la foto de tu cuenta.</p>
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
              <div className="panel-card text-center p-4 pf-perfil-side">
                <div className="pf-avatar-wrap mb-3">
                  <div className="pf-avatar pf-avatar-lg">
                    {form.fotoUrl ? (
                      <img src={form.fotoUrl} alt="Foto de perfil" className="pf-avatar-img" />
                    ) : (
                      <span>{inicial}</span>
                    )}
                  </div>
                </div>

                <h4 className="mb-1 pf-perfil-name">{form.nombre || 'Usuario'}</h4>
                <p className="text-muted small mb-3">{form.email}</p>
                <span className={`badge-pf ${rol === 'admin' ? 'badge-pf-amber' : 'badge-pf-blue'}`}>
                  {rol === 'admin' ? 'Administrador' : 'Cliente'}
                </span>

                <div className="pf-foto-actions mt-4">
                  <input
                    ref={inputFotoRef}
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={cambiarFoto}
                  />
                  <button type="button" className="btn btn-pf-primary btn-sm w-100 mb-2" onClick={() => inputFotoRef.current?.click()}>
                    <i className="bi bi-camera me-2"></i>
                    {form.fotoUrl ? 'Cambiar foto' : 'Subir foto'}
                  </button>
                  {form.fotoUrl && (
                    <button type="button" className="btn btn-outline-secondary btn-sm w-100" onClick={quitarFoto}>
                      Quitar foto
                    </button>
                  )}
                  <p className="text-muted small mt-3 mb-0">JPG, PNG o WEBP. Máx. 5 MB. Se ajusta automáticamente.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="panel-card p-4">
                <div className="pf-perfil-section-head mb-4">
                  <h5 className="mb-1">Información personal</h5>
                  <p className="text-muted small mb-0">Mantén tus datos actualizados para una mejor experiencia.</p>
                </div>

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

                  <div className="d-flex justify-content-end">
                    <button type="submit" className="btn btn-pf-primary px-4" disabled={guardando || !valido}>
                      {guardando ? (
                        <>
                          <span className="pf-spinner me-2"></span> Guardando...
                        </>
                      ) : (
                        'Guardar cambios'
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
