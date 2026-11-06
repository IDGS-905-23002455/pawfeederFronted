import { Link } from 'react-router-dom'
import { MockupApp } from '../componentes/MockupApp.jsx'

const CARACTERISTICAS = [
  {
    titulo: 'Horarios automáticos',
    texto:
      'Programa hasta 6 comidas diarias con porciones exactas. El dispensador funciona aunque no tengas internet.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
  },
  {
    titulo: 'Control desde tu móvil',
    texto:
      'Activa una comida manual, ajusta la porción o cambia el horario desde la app en cualquier momento.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
  },
  {
    titulo: 'Historial y alertas',
    texto:
      'Consulta cuándo y cuánto comió tu mascota. Recibe alertas cuando el nivel de croqueta sea bajo.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 14l4-4 4 3 5-6" />
      </svg>
    ),
  },
  {
    titulo: 'Múltiples mascotas',
    texto:
      'Registra varios perfiles con sus propias dietas y horarios. Ideal para hogares con más de una mascota.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 12c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" />
        <path d="M12 8v4l3 2" />
      </svg>
    ),
  },
  {
    titulo: 'Conexión segura',
    texto:
      'Comunicación cifrada entre el dispositivo y la app. Tus datos y los de tu mascota siempre protegidos.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" />
        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
      </svg>
    ),
  },
  {
    titulo: 'Fácil instalación',
    texto:
      'Conéctalo a tu red WiFi en menos de 5 minutos. Sin herramientas, sin configuraciones complicadas.',
    icono: (
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
]

const HARDWARE = [
  { nombre: 'Arduino + ESP8266', detalle: 'Microcontrolador WiFi' },
  { nombre: 'HC-SR04', detalle: 'Sensor ultrasónico' },
  { nombre: 'Servo 9g', detalle: 'Control de porciones' },
  { nombre: 'MQTT / HTTP', detalle: 'Protocolo IoT' },
]

export default function Home() {
  return (
    <>
      <section className="pf-hero">
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-6 order-lg-1 order-2">
              <span className="pf-badge mb-3">Dispensador IoT con Arduino</span>
              <h1 className="display-4 fw-black lh-sm mb-4" style={{ fontWeight: 900 }}>
                Alimenta a tu mascota
                <br />
                <span style={{ color: 'var(--pf-primary)' }}>desde cualquier lugar</span>
              </h1>
              <p className="text-muted fs-5 mb-5" style={{ maxWidth: 480 }}>
                PawFeeder es un dispensador inteligente de croquetas controlado por IoT. Programa horarios, ajusta
                porciones y monitorea a tu mascota en tiempo real.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/registro" className="btn-pf text-decoration-none">
                  <i className="bi bi-download me-2" />
                  Comenzar gratis
                </Link>
                <Link to="/about" className="btn-pf-outline text-decoration-none">
                  Conocer más
                </Link>
              </div>
              <div className="d-flex gap-4 mt-5">
                {[
                  { valor: '500+', texto: 'Mascotas felices' },
                  { valor: '99%', texto: 'Precisión en porciones' },
                  { valor: '24/7', texto: 'Monitoreo continuo' },
                ].map(({ valor, texto }) => (
                  <div key={texto}>
                    <div className="fw-bold fs-4" style={{ color: 'var(--pf-primary)' }}>{valor}</div>
                    <div className="text-muted small">{texto}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-lg-6 order-lg-2 order-1">
              <MockupApp />
            </div>
          </div>
        </div>
      </section>

      <section className="pf-section" id="features">
        <div className="container-xl">
          <div className="text-center mb-5">
            <div className="pf-section-label">¿Por qué PawFeeder?</div>
            <h2 className="fw-bold fs-1">Todo lo que tu mascota necesita</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: 500 }}>
              Tecnología IoT diseñada para hacer la vida de tu mascota más cómoda y la tuya más tranquila.
            </p>
          </div>
          <div className="row g-4">
            {CARACTERISTICAS.map(({ titulo, texto, icono }) => (
              <div className="col-md-6 col-lg-4" key={titulo}>
                <div className="pf-card h-100">
                  <div className="pf-icon">{icono}</div>
                  <h5 className="fw-bold mb-2">{titulo}</h5>
                  <p className="text-muted small mb-0">{texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: '#fff', padding: '5rem 0' }}>
        <div className="container-xl">
          <div className="row align-items-center g-5">
            <div className="col-lg-5">
              <img src="/imagenes/web-device.jpg" alt="Dispensador PawFeeder" className="pf-hero-img" />
            </div>
            <div className="col-lg-7">
              <div className="pf-section-label">El hardware</div>
              <h2 className="fw-bold fs-1 mb-3">
                Tecnología Arduino
                <br />al servicio de tu mascota
              </h2>
              <div className="pf-divider" />
              <p className="text-muted mb-4">
                El corazón de PawFeeder es un microcontrolador Arduino con módulo WiFi, sensor ultrasónico de nivel y
                un servo motor de precisión para controlar las porciones.
              </p>
              <div className="row g-3">
                {HARDWARE.map((item) => (
                  <div className="col-6" key={item.nombre}>
                    <div className="pf-stat">
                      <div className="fw-bold" style={{ color: 'var(--pf-primary)' }}>{item.nombre}</div>
                      <div className="small text-muted mt-1">{item.detalle}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="download"
        style={{
          background: 'linear-gradient(135deg,#1E3A5C,#2C5F8A)',
          padding: '5rem 0',
          color: '#fff',
        }}
      >
        <div className="container-xl text-center">
          <img
            src="/imagenes/pawfeeder-mark-192.png"
            alt="PawFeeder"
            style={{ height: '4rem', marginBottom: '1.5rem', filter: 'brightness(0) invert(1)' }}
          />
          <h2 className="fw-bold fs-1 mb-3">¿Listo para empezar?</h2>
          <p className="mb-5 opacity-75 fs-5 mx-auto" style={{ maxWidth: 460 }}>
            Crea tu cuenta gratis, descarga la aplicación y comienza a programar las comidas de tu mascota hoy mismo.
          </p>
          <div className="d-flex justify-content-center flex-wrap gap-3">
            <Link
              to="/registro"
              className="text-decoration-none px-5 py-3 fw-semibold rounded-pill"
              style={{ background: 'var(--pf-amber)', color: '#1E3A5C' }}
            >
              <i className="bi bi-person-plus me-2" />
              Crear cuenta
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
