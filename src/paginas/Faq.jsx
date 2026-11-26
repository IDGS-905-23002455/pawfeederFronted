import { Link } from 'react-router-dom'
import { ListaPreguntas } from '../componentes/ListaPreguntas.jsx'
import { CATEGORIAS } from '../datos/faq.js'
import { useAcordeon } from '../hooks/useAcordeon.js'

export default function Faq() {
  const { abierta, alternar } = useAcordeon()
  const totalPreguntas = CATEGORIAS.reduce((acc, c) => acc + c.preguntas.length, 0)

  return (
    <main className="pf-faq-page">
      <section className="pf-faq-hero">
        <div className="container-xl">
          <div className="pf-faq-hero-inner">
            <span className="pf-faq-eyebrow">
              <i className="bi bi-chat-square-heart" /> Centro de ayuda
            </span>
            <h1 className="pf-faq-title">
              Preguntas <span>frecuentes</span>
            </h1>
            <p className="pf-faq-lead">
              Encuentra respuestas rápidas sobre compra, uso diario y cuidado de tu PawFeeder.
            </p>
            <div className="pf-faq-stats">
              <div className="pf-faq-stat">
                <strong>{CATEGORIAS.length}</strong>
                <span>Categorías</span>
              </div>
              <div className="pf-faq-stat">
                <strong>{totalPreguntas}</strong>
                <span>Respuestas</span>
              </div>
              <div className="pf-faq-stat">
                <strong>24/7</strong>
                <span>Soporte por contacto</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pf-faq-content">
        <div className="container-xl">
          <div className="pf-faq-layout">
            <aside className="pf-faq-nav" aria-label="Categorías de preguntas frecuentes">
              <div className="pf-faq-nav-card">
                <p className="pf-faq-nav-title">Categorías</p>
                {CATEGORIAS.map((categoria) => (
                  <a
                    key={categoria.titulo}
                    href={`#faq-${categoria.titulo.toLowerCase().replace(/\s+/g, '-')}`}
                    className="pf-faq-nav-link"
                  >
                    <span className="pf-faq-nav-icon">
                      <i className={`bi ${categoria.icono}`} />
                    </span>
                    <span className="pf-faq-nav-text">
                      <strong>{categoria.titulo}</strong>
                      <small>{categoria.preguntas.length} preguntas</small>
                    </span>
                    <i className="bi bi-arrow-right-short pf-faq-nav-arrow" />
                  </a>
                ))}
              </div>
            </aside>

            <div className="pf-faq-main">
              {CATEGORIAS.map((categoria, c) => {
                const id = `faq-${categoria.titulo.toLowerCase().replace(/\s+/g, '-')}`
                return (
                  <section className="pf-faq-category" key={categoria.titulo} id={id}>
                    <div className="pf-faq-category-head">
                      <div className="pf-faq-category-icon">
                        <i className={`bi ${categoria.icono}`} />
                      </div>
                      <div>
                        <h2 className="pf-faq-category-title">{categoria.titulo}</h2>
                        <p className="pf-faq-category-meta">
                          {categoria.preguntas.length}{' '}
                          {categoria.preguntas.length === 1 ? 'pregunta' : 'preguntas'}
                        </p>
                      </div>
                    </div>

                    <ListaPreguntas
                      preguntas={categoria.preguntas}
                      categoria={c}
                      abierta={abierta}
                      alternar={alternar}
                    />
                  </section>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="pf-faq-cta">
        <div className="container-xl">
          <div className="pf-faq-cta-card">
            <div>
              <span className="pf-faq-eyebrow pf-faq-eyebrow-light">
                <i className="bi bi-headset" /> ¿Aún tienes dudas?
              </span>
              <h2 className="pf-faq-cta-title">Estamos aquí para ayudarte</h2>
              <p className="pf-faq-cta-text">
                Si no encontraste lo que buscabas, escríbenos y te respondemos lo antes posible.
              </p>
            </div>
            <div className="pf-faq-cta-actions">
              <Link to="/contacto" className="btn-pf-primary text-decoration-none">
                <i className="bi bi-envelope" /> Contactar soporte
              </Link>
              <Link to="/manual" className="pf-faq-cta-secondary text-decoration-none">
                Ver manual <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
