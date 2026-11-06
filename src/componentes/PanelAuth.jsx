const ICONOS = {
  check: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  candado: (
    <>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </>
  ),
  reloj: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
}

export function PanelAuth({ titulo, subtitulo, caracteristicas }) {
  return (
    <div className="auth-panel">
      <div className="auth-panel-inner">
        <div className="auth-panel-brand">
          <img src="/imagenes/pawfeeder-mark-192.png" alt="PawFeeder" style={{ height: 40 }} />
          <span className="auth-panel-logo">
            <span className="paw">Paw</span>
            <span className="feeder">Feeder</span>
          </span>
        </div>

        <div className="auth-panel-content">
          <span className="auth-panel-badge">IOT · SMART FEEDER</span>
          <h1 className="auth-panel-title">{titulo}</h1>
          <p className="auth-panel-sub">{subtitulo}</p>

          <ul className="auth-panel-features">
            {caracteristicas.map(({ fuerte, texto, icono }) => (
              <li key={fuerte}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  {ICONOS[icono]}
                </svg>
                <span>
                  <strong>{fuerte}</strong> {texto}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="auth-panel-footer">
          <p>© 2026 PawFeeder · Proyecto IoT con Arduino</p>
        </div>
      </div>
    </div>
  )
}
