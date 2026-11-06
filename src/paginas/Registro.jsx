import { Link } from 'react-router-dom'
import { CampoPassword } from '../componentes/CampoPassword.jsx'
import { CampoTexto } from '../componentes/CampoTexto.jsx'
import { ErrorCampo } from '../componentes/ErrorCampo.jsx'
import { MarcaMobile } from '../componentes/MarcaMobile.jsx'
import { PanelAuth } from '../componentes/PanelAuth.jsx'
import { useRegistro } from '../hooks/useRegistro.js'

export default function Registro() {
  const {
    form,
    cambiar,
    marcar,
    error,
    paso,
    errorMsg,
    successMsg,
    cargando,
    emailRegistrado,
    codigo,
    cambiarCodigo,
    codigoPrueba,
    mostrarCodigoPrueba,
    verificando,
    reenviando,
    verPassword,
    verConfirm,
    alternarPassword,
    alternarConfirm,
    registrar,
    verificar,
    reenviar,
  } = useRegistro()

  return (
    <div className="auth-split">
      <PanelAuth
        titulo="Tu mascota merece la mejor alimentación"
        subtitulo="Crea tu cuenta y empieza a programar comidas, monitorear el nivel de croquetas y controlar tu dispensador desde cualquier lugar."
        caracteristicas={[
          { fuerte: 'Registro gratuito', texto: 'en menos de un minuto', icono: 'check' },
          { fuerte: 'Control remoto', texto: 'desde tu teléfono', icono: 'candado' },
          { fuerte: 'Monitoreo en tiempo real', texto: 'del nivel de croquetas', icono: 'reloj' },
        ]}
      />

      <div className="auth-form-side">
        <div className="auth-form-box">
          <MarcaMobile />

          <span className="pf-auth-eyebrow">CREA TU CUENTA</span>
          <h2 className="auth-form-title mt-1">Únete a PawFeeder</h2>
          <p className="auth-form-sub mb-4">Programa, alimenta y monitorea — todo desde tu celular.</p>

          {paso === 'form' && (
            <form onSubmit={registrar} noValidate>
              <div className="row g-3">
                <CampoTexto
                  id="rg-nombre"
                  label="Nombre"
                  placeholder="Juan"
                  valor={form.nombre}
                  onChange={cambiar('nombre')}
                  onBlur={marcar('nombre')}
                  error={error('nombre')}
                  wrapperClassName="col-md-6 mb-1"
                />
                <CampoTexto
                  id="rg-apellido"
                  label="Apellido"
                  placeholder="Pérez"
                  valor={form.apellido}
                  onChange={cambiar('apellido')}
                  onBlur={marcar('apellido')}
                  error={error('apellido')}
                  wrapperClassName="col-md-6 mb-1"
                />
              </div>

              <CampoTexto
                id="rg-email"
                label="Correo"
                tipo="email"
                placeholder="tu@correo.com"
                valor={form.email}
                onChange={cambiar('email')}
                onBlur={marcar('email')}
                error={error('email')}
              />

              <CampoPassword
                id="rg-password"
                label="Contraseña"
                placeholder="Mínimo 8 caracteres"
                valor={form.password}
                onChange={cambiar('password')}
                onBlur={marcar('password')}
                error={error('password')}
                visible={verPassword}
                onAlternar={alternarPassword}
              />

              <CampoPassword
                id="rg-confirm"
                label="Confirmar contraseña"
                placeholder="Repite tu contraseña"
                valor={form.confirmPassword}
                onChange={cambiar('confirmPassword')}
                onBlur={marcar('confirmPassword')}
                error={error('confirmPassword')}
                visible={verConfirm}
                onAlternar={alternarConfirm}
              />

              <div className="form-check mb-3">
                <input
                  id="terminos"
                  type="checkbox"
                  className="form-check-input"
                  checked={form.aceptaTerminos}
                  onChange={cambiar('aceptaTerminos')}
                  onBlur={marcar('aceptaTerminos')}
                />
                <label className="form-check-label small text-muted" htmlFor="terminos">
                  Al continuar aceptas los{' '}
                  <span style={{ color: 'var(--pf-primary)', fontWeight: 600 }}>Términos</span> y la{' '}
                  <span style={{ color: 'var(--pf-primary)', fontWeight: 600 }}>Privacidad</span>.
                </label>
                <ErrorCampo>{error('aceptaTerminos')}</ErrorCampo>
              </div>

              <button type="submit" className="btn-pf-block" disabled={cargando}>
                {cargando ? (
                  <>
                    <span className="pf-spinner me-2" />
                    Creando cuenta...
                  </>
                ) : (
                  'Crear cuenta →'
                )}
              </button>
            </form>
          )}

          {paso === 'otp' && (
            <div className="text-center">
              <div className="mb-3">
                <img src="/imagenes/pawfeeder-mark-192.png" alt="PawFeeder" style={{ height: 56 }} />
              </div>
              <h3 className="auth-form-title mb-1">Verifica tu cuenta</h3>
              <p className="auth-form-sub mb-4">
                Te enviamos un código de 6 dígitos a <strong>{emailRegistrado}</strong>.
              </p>

              {mostrarCodigoPrueba && codigoPrueba && (
                <div className="alert alert-info py-2 small mb-3">
                  <strong>Tu código:</strong>{' '}
                  <span style={{ fontSize: '1.3rem', fontWeight: 700, letterSpacing: '0.2em', color: '#0c5460' }}>
                    {codigoPrueba}
                  </span>
                </div>
              )}

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={codigo}
                onChange={cambiarCodigo}
                className="form-control pf-input text-center"
                style={{ fontSize: '1.6rem', letterSpacing: '0.5em', fontWeight: 700 }}
                placeholder="••••••"
                aria-label="Código de verificación de 6 dígitos"
              />

              <button
                type="button"
                className="btn-pf-block mt-3"
                onClick={verificar}
                disabled={verificando || codigo.length !== 6}
              >
                {verificando ? (
                  <>
                    <span className="pf-spinner me-2" />
                    Verificando...
                  </>
                ) : (
                  'Verificar código'
                )}
              </button>

              <button type="button" className="btn btn-link mt-2 small" onClick={reenviar} disabled={reenviando}>
                {reenviando ? 'Enviando...' : '¿No recibiste el código? Reenviar'}
              </button>
            </div>
          )}

          {paso === 'listo' && (
            <div className="text-center">
              <div className="mb-3">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#2e7d32" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
              <h3 className="auth-form-title mb-1">¡Cuenta verificada!</h3>
              <p className="auth-form-sub mb-4">Ya puedes iniciar sesión con tu correo y contraseña.</p>
              <Link to="/login" className="btn-pf-block d-block text-decoration-none">
                Iniciar sesión
              </Link>
            </div>
          )}

          {errorMsg && <div className="alert alert-danger mt-3 mb-0 py-2 small">{errorMsg}</div>}
          {successMsg && paso !== 'form' && (
            <div className="alert alert-success mt-3 mb-0 py-2 small">{successMsg}</div>
          )}

          <p className="text-center text-muted small mt-4 mb-0">
            ¿Ya tienes cuenta?{' '}
            <Link to="/login" className="text-decoration-none fw-semibold" style={{ color: 'var(--pf-primary)' }}>
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
