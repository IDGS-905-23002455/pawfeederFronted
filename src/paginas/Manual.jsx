import { EncabezadoPagina } from '../componentes/EncabezadoPagina.jsx'
import { SeccionManual } from '../componentes/SeccionManual.jsx'
import { INDICE, PASOS_HORARIOS, PASOS_RAPIDOS } from '../datos/manual.js'

export default function Manual() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Documentación"
        titulo="Manual de uso"
        descripcion="Aprende a configurar y usar tu PawFeeder en pocos minutos."
        ancho={600}
      />

      <section className="pf-section">
        <div className="container-xl">
          <div className="row g-5">
            <div className="col-lg-3 d-none d-lg-block">
              <div className="pf-card sticky-top" style={{ top: '5rem' }}>
                <h6 className="fw-bold mb-3">Contenido</h6>
                <ul className="list-unstyled d-flex flex-column gap-1">
                  {INDICE.map(({ href, icono, texto }) => (
                    <li key={href}>
                      <a href={href} className="pf-footer-link d-flex align-items-center gap-2">
                        <i className={`bi ${icono}`} />
                        {texto}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="col-lg-9">
              <SeccionManual id="inicio-rapido" numero="01" titulo="Inicio rápido">
                <p className="text-muted">
                  Sigue estos pasos para tener tu PawFeeder funcionando en menos de 5 minutos:
                </p>
                <div className="row g-3 mt-2">
                  {PASOS_RAPIDOS.map(({ icono, titulo, texto }) => (
                    <div className="col-sm-6 col-lg-4" key={titulo}>
                      <div className="pf-card text-center">
                        <div className="pf-icon mx-auto">{icono}</div>
                        <h6 className="fw-bold">{titulo}</h6>
                        <p className="text-muted small mb-0">{texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SeccionManual>

              <SeccionManual id="conexion" numero="02" titulo="Conectar a WiFi">
                <ol className="text-muted d-flex flex-column gap-3 mt-3">
                  <li>Al encender por primera vez, el LED parpadeará en <strong>azul</strong>.</li>
                  <li>Conecta tu teléfono a la red <strong>PawFeeder_Setup</strong> (no requiere contraseña).</li>
                  <li>Abre la app y dirígete a <strong>Equipo → Configurar WiFi</strong>.</li>
                  <li>Selecciona tu red y escribe la contraseña.</li>
                  <li>El LED cambiará a <strong>verde fijo</strong> cuando la conexión sea exitosa.</li>
                </ol>
                <div className="pf-card mt-4" style={{ background: 'var(--pf-primary-light)', borderColor: 'var(--pf-primary)' }}>
                  <p className="mb-0 small">
                    <i className="bi bi-info-circle me-2" style={{ color: 'var(--pf-primary)' }} />
                    Solo es compatible con redes <strong>WiFi 2.4 GHz</strong>. Las redes 5 GHz no son compatibles con
                    el módulo ESP8266.
                  </p>
                </div>
              </SeccionManual>

              <SeccionManual id="horarios" numero="03" titulo="Programar horarios">
                <p className="text-muted">
                  Desde la sección <strong>Horarios</strong> de la app puedes crear hasta 6 alarmas diarias.
                </p>
                <ul className="list-unstyled d-flex flex-column gap-2 mt-3">
                  {PASOS_HORARIOS.map((texto, i) => (
                    <li className="d-flex gap-3 align-items-start" key={texto}>
                      <i className={`bi bi-${i + 1}-circle-fill mt-1`} style={{ color: 'var(--pf-primary)' }} />
                      <span>{texto}</span>
                    </li>
                  ))}
                </ul>
              </SeccionManual>

              <SeccionManual id="manual" numero="04" titulo="Comida manual">
                <p className="text-muted">
                  En la pantalla de <strong>Inicio</strong> de la app encontrarás el botón <em>Dispensar ahora</em>. Al
                  pulsarlo, el dispositivo servirá la porción predeterminada de inmediato.
                </p>
              </SeccionManual>

              <SeccionManual id="mascotas" numero="05" titulo="Perfil de mascota">
                <p className="text-muted">
                  Ve a <strong>Mascotas → Agregar mascota</strong> para registrar a tu compañero. Puedes ingresar
                  nombre, raza, peso y foto. El sistema usará el peso para sugerir la porción diaria recomendada.
                </p>
              </SeccionManual>

              <SeccionManual id="alertas" numero="06" titulo="Alertas y notificaciones" ultima>
                <p className="text-muted">PawFeeder envía alertas push cuando:</p>
                <ul className="text-muted d-flex flex-column gap-2">
                  <li>El nivel de croqueta baja del 20%.</li>
                  <li>El dispositivo pierde la conexión WiFi.</li>
                  <li>Se completa una comida programada.</li>
                </ul>
              </SeccionManual>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
