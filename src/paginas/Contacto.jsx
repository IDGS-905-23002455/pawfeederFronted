import { Link } from 'react-router-dom'
import { EncabezadoPagina } from '../componentes/EncabezadoPagina.jsx'
import { ASUNTOS, CORREO_SOPORTE } from '../datos/contacto.js'
import { useContacto } from '../hooks/useContacto.js'

export default function Contacto() {
  const { form, cambiar, enviar } = useContacto()

  return (
    <>
      <EncabezadoPagina
        etiqueta="Soporte"
        titulo="Contáctanos"
        descripcion="¿Tienes dudas, sugerencias o encontraste un problema? Escríbenos y te responderemos a la brevedad."
        ancho={540}
      />

      <section className="pf-section">
        <div className="container-xl">
          <div className="row g-5">
            <div className="col-lg-5">
              <div className="d-flex flex-column gap-4">
                <div className="pf-card d-flex gap-4 align-items-start">
                  <div className="pf-icon flex-shrink-0">📧</div>
                  <div>
                    <h6 className="fw-bold mb-1">Correo electrónico</h6>
                    <p className="text-muted small mb-0">Respuesta en menos de 24 horas.</p>
                    <a
                      href={`mailto:${CORREO_SOPORTE}`}
                      className="text-decoration-none"
                      style={{ color: 'var(--pf-primary)' }}
                    >
                      {CORREO_SOPORTE}
                    </a>
                  </div>
                </div>

                <div className="pf-card d-flex gap-4 align-items-start">
                  <div className="pf-icon flex-shrink-0">🐙</div>
                  <div>
                    <h6 className="fw-bold mb-1">GitHub</h6>
                    <p className="text-muted small mb-0">Reporta bugs o contribuye al proyecto.</p>
                    <a
                      href="https://github.com/pawfeeder"
                      target="_blank"
                      rel="noreferrer"
                      className="text-decoration-none"
                      style={{ color: 'var(--pf-primary)' }}
                    >
                      github.com/pawfeeder
                    </a>
                  </div>
                </div>

                <div className="pf-card d-flex gap-4 align-items-start">
                  <div className="pf-icon flex-shrink-0">📖</div>
                  <div>
                    <h6 className="fw-bold mb-1">Manual de uso</h6>
                    <p className="text-muted small mb-0">Antes de escribirnos, revisa la documentación.</p>
                    <Link to="/manual" className="text-decoration-none" style={{ color: 'var(--pf-primary)' }}>
                      Ver manual
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-7">
              <div className="pf-card">
                <h4 className="fw-bold mb-4">Envíanos un mensaje</h4>
                <p className="text-muted small mb-3">
                  Al enviar se abrirá tu aplicación de correo con el mensaje ya redactado.
                </p>

                <form onSubmit={enviar}>
                  <div className="row g-3">
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small" htmlFor="ct-nombre">Nombre</label>
                      <input
                        id="ct-nombre"
                        type="text"
                        name="nombre"
                        className="form-control pf-input"
                        placeholder="Tu nombre"
                        value={form.nombre}
                        onChange={cambiar('nombre')}
                        required
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="form-label fw-semibold small" htmlFor="ct-email">Correo electrónico</label>
                      <input
                        id="ct-email"
                        type="email"
                        name="email"
                        className="form-control pf-input"
                        placeholder="tu@correo.com"
                        value={form.email}
                        onChange={cambiar('email')}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small" htmlFor="ct-asunto">Asunto</label>
                      <select
                        id="ct-asunto"
                        name="asunto"
                        className="form-select pf-input"
                        value={form.asunto}
                        onChange={cambiar('asunto')}
                      >
                        <option value="">Selecciona un asunto</option>
                        {ASUNTOS.map((a) => (
                          <option key={a}>{a}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small" htmlFor="ct-mensaje">Mensaje</label>
                      <textarea
                        id="ct-mensaje"
                        name="mensaje"
                        className="form-control pf-input"
                        rows="5"
                        placeholder="Describe tu consulta con el mayor detalle posible..."
                        value={form.mensaje}
                        onChange={cambiar('mensaje')}
                        required
                      />
                    </div>
                    <div className="col-12">
                      <button type="submit" className="btn-pf w-100 py-3">
                        <i className="bi bi-send me-2" />
                        Enviar mensaje
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
