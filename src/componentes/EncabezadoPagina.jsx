export function EncabezadoPagina({ etiqueta, titulo, descripcion, ancho = 600 }) {
  return (
    <section style={{ background: 'linear-gradient(135deg,#F5F0E8,#fff)', padding: '5rem 0 3rem' }}>
      <div className="container-xl">
        <div className="pf-section-label">{etiqueta}</div>
        <h1 className="display-5 fw-bold mb-3">{titulo}</h1>
        <div className="pf-divider" />
        <p className="text-muted fs-5" style={{ maxWidth: ancho }}>
          {descripcion}
        </p>
      </div>
    </section>
  )
}
