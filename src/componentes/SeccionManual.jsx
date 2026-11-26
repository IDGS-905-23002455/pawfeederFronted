export function SeccionManual({ id, numero, titulo, icono, ultima = false, children }) {
  return (
    <section id={id} className={`pf-manual-section${ultima ? '' : ' mb-4'}`}>
      <div className="pf-manual-section-head">
        <div className="pf-manual-section-num">{numero}</div>
        <div className="pf-manual-section-title-wrap">
          <h2 className="pf-manual-section-title">
            {icono && <i className={`bi ${icono} me-2`} aria-hidden="true"></i>}
            {titulo}
          </h2>
        </div>
      </div>
      <div className="pf-manual-section-body">{children}</div>
    </section>
  )
}
