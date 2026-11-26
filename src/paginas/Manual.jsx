import { EncabezadoPagina } from '../componentes/EncabezadoPagina.jsx'
import { SeccionManual } from '../componentes/SeccionManual.jsx'
import { ALERTAS, INDICE, PASOS_HORARIOS, PASOS_RAPIDOS, PASOS_WIFI } from '../datos/manual.js'

export default function Manual() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Documentación"
        titulo="Manual de uso"
        descripcion="Aprende a configurar y aprovechar tu PawFeeder paso a paso, desde la instalación hasta las alertas diarias."
        ancho={680}
      />

      <section className="pf-manual-page">
        <div className="container-xl">
          <div className="pf-manual-layout">
            <aside className="pf-manual-aside d-none d-lg-block">
              <div className="pf-manual-toc">
                <p className="pf-manual-toc-title">Contenido</p>
                <nav aria-label="Índice del manual">
                  <ul className="list-unstyled mb-0 d-flex flex-column gap-1">
                    {INDICE.map(({ href, icono, texto }, i) => (
                      <li key={href}>
                        <a href={href} className="pf-manual-toc-link">
                          <span className="pf-manual-toc-num">{String(i + 1).padStart(2, '0')}</span>
                          <i className={`bi ${icono}`} aria-hidden="true"></i>
                          <span>{texto}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
                <div className="pf-manual-toc-tip">
                  <i className="bi bi-lightbulb" aria-hidden="true"></i>
                  <span>¿Necesitas ayuda? Visita <a href="/faq">Preguntas frecuentes</a>.</span>
                </div>
              </div>
            </aside>

            <div className="pf-manual-content">
              <SeccionManual id="inicio-rapido" numero="01" titulo="Inicio rápido" icono="bi-rocket-takeoff">
                <p className="pf-manual-lead">
                  Ten tu PawFeeder listo en pocos minutos con estos pasos básicos.
                </p>
                <div className="row g-3">
                  {PASOS_RAPIDOS.map(({ icono, titulo, texto }, i) => (
                    <div className="col-md-4" key={titulo}>
                      <div className="pf-manual-step-card">
                        <div className="pf-manual-step-top">
                          <div className="pf-manual-step-icon"><i className={`bi ${icono}`} aria-hidden="true"></i></div>
                          <span className="pf-manual-step-badge">Paso {i + 1}</span>
                        </div>
                        <h3 className="pf-manual-step-title">{titulo}</h3>
                        <p className="pf-manual-step-text">{texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SeccionManual>

              <SeccionManual id="conexion" numero="02" titulo="Conectar a WiFi" icono="bi-wifi">
                <p className="pf-manual-lead">
                  Conecta tu dispensador a la red de tu hogar para controlarlo desde la app.
                </p>
                <div className="pf-manual-timeline">
                  {PASOS_WIFI.map(({ titulo, texto }, i) => (
                    <div className="pf-manual-timeline-item" key={titulo}>
                      <div className="pf-manual-timeline-marker">{i + 1}</div>
                      <div className="pf-manual-timeline-body">
                        <h3>{titulo}</h3>
                        <p>{texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pf-manual-callout">
                  <div className="pf-manual-callout-icon"><i className="bi bi-info-circle" aria-hidden="true"></i></div>
                  <div>
                    <strong>Importante:</strong> PawFeeder es compatible solo con redes <strong>WiFi 2.4 GHz</strong>. Las redes 5 GHz no son compatibles con el módulo ESP8266.
                  </div>
                </div>
              </SeccionManual>

              <SeccionManual id="horarios" numero="03" titulo="Programar horarios" icono="bi-calendar-check">
                <p className="pf-manual-lead">
                  Desde la sección <strong>Horarios</strong> puedes crear rutinas de alimentación automáticas.
                </p>
                <div className="pf-manual-checklist">
                  {PASOS_HORARIOS.map((texto, i) => (
                    <div className="pf-manual-check-item" key={texto}>
                      <span className="pf-manual-check-num">{i + 1}</span>
                      <span>{texto}</span>
                    </div>
                  ))}
                </div>
              </SeccionManual>

              <SeccionManual id="manual" numero="04" titulo="Comida manual" icono="bi-hand-index-thumb">
                <div className="pf-manual-info-card">
                  <div className="pf-manual-info-icon"><i className="bi bi-hand-index-thumb" aria-hidden="true"></i></div>
                  <div>
                    <h3>Dispensa al instante</h3>
                    <p>
                      En la pantalla de <strong>Inicio</strong> encontrarás el botón <em>Dispensar ahora</em>. Al pulsarlo, el dispositivo servirá la porción predeterminada de inmediato, sin modificar tus horarios programados.
                    </p>
                  </div>
                </div>
              </SeccionManual>

              <SeccionManual id="mascotas" numero="05" titulo="Perfil de mascota" icono="bi-heart-pulse">
                <div className="pf-manual-info-card">
                  <div className="pf-manual-info-icon"><i className="bi bi-heart-pulse" aria-hidden="true"></i></div>
                  <div>
                    <h3>Personaliza la alimentación</h3>
                    <p>
                      Ve a <strong>Mascotas &gt; Agregar mascota</strong> para registrar a tu compañero. Puedes ingresar nombre, raza, peso y foto. El sistema usará el peso para sugerir la porción diaria recomendada.
                    </p>
                  </div>
                </div>
              </SeccionManual>

              <SeccionManual id="alertas" numero="06" titulo="Alertas y notificaciones" icono="bi-bell" ultima>
                <p className="pf-manual-lead">PawFeeder te mantiene informado con alertas importantes.</p>
                <div className="row g-3">
                  {ALERTAS.map(({ icono, titulo, texto }) => (
                    <div className="col-md-4" key={titulo}>
                      <div className="pf-manual-alert-card">
                        <div className="pf-manual-alert-icon"><i className={`bi ${icono}`} aria-hidden="true"></i></div>
                        <h3>{titulo}</h3>
                        <p>{texto}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </SeccionManual>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
