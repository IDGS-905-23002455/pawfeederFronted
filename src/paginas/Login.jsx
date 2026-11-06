import { Link } from 'react-router-dom'
import { CampoPassword } from '../componentes/CampoPassword.jsx'
import { CampoTexto } from '../componentes/CampoTexto.jsx'
import { MarcaMobile } from '../componentes/MarcaMobile.jsx'
import { PanelAuth } from '../componentes/PanelAuth.jsx'
import { useLogin } from '../hooks/useLogin.js'

export default function Login() {
  const { form, error, cambiar, marcar, enviar, errorMsg, cargando, verPassword, alternarPassword } = useLogin()

  return (
    <div className="auth-split">
      <PanelAuth
        titulo="Alimentación inteligente para tu mascota"
        subtitulo="Programa comidas, controla tu dispensador a distancia y monitorea la comida de tu peludo desde cualquier lugar."
        caracteristicas={[
          { fuerte: 'Programa horarios', texto: 'de comida automáticos', icono: 'check' },
          { fuerte: 'Control remoto', texto: 'desde tu teléfono', icono: 'candado' },
          { fuerte: 'Monitoreo en tiempo real', texto: 'del nivel de croquetas', icono: 'reloj' },
        ]}
      />

      <div className="auth-form-side">
        <div className="auth-form-box">
          <MarcaMobile />

          <span className="pf-auth-eyebrow">BIENVENIDO DE VUELTA</span>
          <h2 className="auth-form-title mt-1">
            Hora de alimentar
            <br />a tu peludo
          </h2>
          <p className="auth-form-sub mb-4">Inicia sesión para controlar tu dispensador.</p>

          {errorMsg && <div className="alert alert-danger py-2 small">{errorMsg}</div>}

          <form onSubmit={enviar} noValidate>
            <CampoTexto
              id="lg-email"
              label="Correo"
              tipo="email"
              placeholder="tu@correo.com"
              value={form.email}
              onChange={cambiar('email')}
              onBlur={marcar('email')}
              error={error('email')}
              autoComplete="email"
            />

            <CampoPassword
              id="lg-password"
              label="Contraseña"
              placeholder="••••••••"
              value={form.password}
              onChange={cambiar('password')}
              onBlur={marcar('password')}
              error={error('password')}
              visible={verPassword}
              onAlternar={alternarPassword}
              autoComplete="current-password"
              wrapperClassName="mb-4"
            />

            <button type="submit" className="btn-pf-block mb-3" disabled={cargando}>
              {cargando ? (
                <>
                  <span className="pf-spinner me-2" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar sesión →'
              )}
            </button>
          </form>

          <p className="text-center text-muted small mb-0">
            ¿No tienes cuenta?{' '}
            <Link to="/registro" className="text-decoration-none fw-semibold" style={{ color: 'var(--pf-primary)' }}>
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
