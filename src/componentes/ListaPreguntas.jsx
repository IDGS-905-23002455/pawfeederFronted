export function ListaPreguntas({ preguntas, categoria, abierta, alternar }) {
  return (
    <div className="pf-faq-list">
      {preguntas.map(({ pregunta, respuesta }, i) => {
        const clave = `${categoria}-${i}`
        const estaAbierta = abierta === clave

        return (
          <div className={`pf-faq-item${estaAbierta ? ' abierta' : ''}`} key={pregunta}>
            <button
              type="button"
              id={`faq-head-${clave}`}
              className="pf-faq-head"
              onClick={() => alternar(clave)}
              aria-expanded={estaAbierta}
              aria-controls={`faq-body-${clave}`}
            >
              <span className="pf-faq-num">{i + 1}</span>
              <span className="pf-faq-question">{pregunta}</span>
              <i className={`bi bi-chevron-down pf-faq-icon${estaAbierta ? ' rotado' : ''}`} />
            </button>
            <div
              id={`faq-body-${clave}`}
              className={`pf-faq-body${estaAbierta ? ' abierto' : ''}`}
              role="region"
              aria-labelledby={`faq-head-${clave}`}
              aria-hidden={!estaAbierta}
            >
              <p className="pf-faq-answer">{respuesta}</p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
