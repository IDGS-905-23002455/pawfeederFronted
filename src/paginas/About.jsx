import { Link } from 'react-router-dom'
import { Cotizador } from '../componentes/Cotizador.jsx'
import { EncabezadoPagina } from '../componentes/EncabezadoPagina.jsx'

export default function About() {
  return (
    <>
      <EncabezadoPagina
        etiqueta="Sobre nosotros"
        titulo="El proyecto PawFeeder"
        descripcion="PawFeeder nace como un proyecto universitario de IoT con el objetivo de mejorar el bienestar animal mediante tecnología accesible y de código abierto."
        ancho={640}
      />

      <section className="pf-section">
        <div className="container-xl">
          <div className="row g-5 align-items-center">
            <div className="col-lg-6">
              <img src="/imagenes/web-hero.jpg" alt="PawFeeder" className="pf-hero-img" />
            </div>
            <div className="col-lg-6">
              <div className="pf-section-label">¿Qué es?</div>
              <h2 className="fw-bold mb-3">Un dispensador inteligente para mascotas</h2>
              <p className="text-muted mb-3">
                PawFeeder combina hardware Arduino con una aplicación web/móvil para ofrecer un sistema completo de
                alimentación automatizada. El dispositivo se conecta a tu red WiFi y responde a comandos en tiempo real.
              </p>
              <p className="text-muted mb-4">
                Puedes programar horarios fijos, activar comidas manualmente desde cualquier lugar y recibir
                notificaciones cuando el nivel de alimento sea bajo.
              </p>
              <ul className="list-unstyled d-flex flex-column gap-2">
                {[
                  'Control remoto via WiFi / MQTT',
                  'Sensor ultrasónico para medir nivel de croqueta',
                  'App web responsiva con prototipo móvil',
                  'Historial de comidas y reportes',
                ].map((texto) => (
                  <li className="d-flex align-items-center gap-2" key={texto}>
                    <i className="bi bi-check-circle-fill" style={{ color: 'var(--pf-primary)' }} />
                    <span>{texto}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container-xl">
          <div className="text-center mb-5">
            <div className="pf-section-label">El equipo</div>
            <h2 className="fw-bold">Desarrollado en IDGS 905</h2>
            <p className="text-muted">Proyecto de la materia Arquitectura de Software — IDGS 905</p>
          </div>
          <div className="row justify-content-center g-4">
            <div className="col-sm-6 col-md-4 col-lg-3">
              <div className="pf-card text-center">
                <div
                  className="mx-auto mb-3 rounded-circle bg-success bg-opacity-10 d-flex align-items-center justify-content-center"
                  style={{ width: '4rem', height: '4rem' }}
                >
                  <i className="bi bi-person-fill fs-2" style={{ color: 'var(--pf-primary)' }} />
                </div>
                <h6 className="fw-bold mb-1">NEXUS</h6>
                <span className="pf-badge">Desarrollador</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ padding: '4rem 0', background: 'var(--pf-primary-light)' }}>
        <div className="container-xl text-center">
          <h2 className="fw-bold mb-3">¿Tienes preguntas?</h2>
          <p className="text-muted mb-4">Consulta el manual o contáctanos directamente.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/contacto" className="btn-pf-outline text-decoration-none">
              Contacto
            </Link>
          </div>
        </div>
      </section>

      <Cotizador />
    </>
  )
}
