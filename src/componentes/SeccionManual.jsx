export function SeccionManual({ id, numero, titulo, ultima = false, children }) {
  return (
    <div id={id} className={ultima ? undefined : 'mb-5'}>
      <h2 className="fw-bold mb-3">
        <span className="me-2" style={{ color: 'var(--pf-primary)' }}>{numero}.</span>
        {titulo}
      </h2>
      <div className="pf-divider" />
      {children}
    </div>
  )
}
