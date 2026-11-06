import { Link } from 'react-router-dom'
import { EncabezadoPagina } from '../componentes/EncabezadoPagina.jsx'
import { ListaPreguntas } from '../componentes/ListaPreguntas.jsx'
import { CATEGORIAS } from '../datos/faq.js'
import { useAcordeon } from '../hooks/useAcordeon.js'

export default function Faq() {
  const { abierta, alternar } = useAcordeon()

  return (
    <>
      <EncabezadoPagina
        etiqueta="Ayuda"
        titulo="Preguntas frecuentes"
        descripcion={
          <>
            Resolvemos las dudas más comunes sobre el PawFeeder. ¿No encuentras tu respuesta?{' '}
            <Link to="/contacto" className="text-decoration-none" style={{ color: 'var(--pf-primary)', fontWeight: 600 }}>
              Contáctanos
            </Link>
            .
          </>
        }
        ancho={620}
      />

      {CATEGORIAS.map((categoria, c) => (
        <section className={`pf-faq-section${c % 2 === 1 ? ' pf-faq-alt' : ''}`} key={categoria.titulo}>
          <div className="container-xl">
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="pf-icon">
                <i className={`bi ${categoria.icono}`} />
              </div>
              <div>
                <h2 className="fw-bold mb-0">{categoria.titulo}</h2>
                <span className="pf-badge">
                  {categoria.preguntas.length}{' '}
                  {categoria.preguntas.length === 1 ? 'pregunta' : 'preguntas'}
                </span>
              </div>
            </div>

            <ListaPreguntas
              preguntas={categoria.preguntas}
              categoria={c}
              abierta={abierta}
              alternar={alternar}
            />
          </div>
        </section>
      ))}

      <section style={{ padding: '4rem 0', background: 'var(--pf-primary-light)' }}>
        <div className="container-xl text-center">
          <h2 className="fw-bold mb-3">¿Aún tienes dudas?</h2>
          <p className="text-muted mb-4">Consulta el manual de uso o escríbenos directamente.</p>
          <div className="d-flex justify-content-center gap-3 flex-wrap">
            <Link to="/contacto" className="btn-pf-outline text-decoration-none">
              Contacto
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
