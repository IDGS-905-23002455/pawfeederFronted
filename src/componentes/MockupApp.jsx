function IconoReloj() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2C5F8A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 12c0 4.4-3.6 8-8 8s-8-3.6-8-8 3.6-8 8-8 8 3.6 8 8z" />
      <path d="M12 8v4l3 2" />
    </svg>
  )
}

function IconoCasa() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 10.5 12 3l9 7.5" />
      <path d="M5 9.5V21h14V9.5" />
    </svg>
  )
}

function IconoAjustes() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3h.1a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9v.1a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" />
    </svg>
  )
}

export function MockupApp() {
  return (
    <div className="phone-shell mx-auto" style={{ maxWidth: 330 }}>
      <div className="phone-screen" style={{ height: 660 }}>
        <div className="phone-notch" />
        <div className="phone-statusbar">
          <span>9:41</span>
          <span>● ● ●</span>
        </div>

        <div className="phone-content">
          <div style={{ position: 'relative' }}>
            <img
              src="/imagenes/auth-bg.jpg"
              alt="App PawFeeder"
              style={{ width: '100%', height: 190, objectFit: 'cover', display: 'block' }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top,rgba(30,58,92,0.75),rgba(0,0,0,0.15))',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: 12,
                left: 16,
                background: 'rgba(255,255,255,0.9)',
                borderRadius: 999,
                padding: '4px 12px',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <img
                src="/imagenes/pawfeeder-mark-192.png"
                alt="PawFeeder"
                style={{ height: 18, width: 18, objectFit: 'contain' }}
              />
              <span style={{ fontSize: 11, fontWeight: 800, color: '#2C5F8A' }}>PawFeeder</span>
            </div>
            <div
              style={{
                position: 'absolute',
                bottom: 12,
                right: 14,
                background: 'rgba(0,0,0,0.45)',
                color: '#fff',
                padding: '3px 10px',
                borderRadius: 999,
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: '0.1em',
              }}
            >
              IOT · SMART FEEDER
            </div>
          </div>

          <div style={{ padding: '18px 18px 24px', background: '#F5F0E8' }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', color: '#2C5F8A' }}>
              BUENOS DÍAS
            </div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#1A1A1A', margin: '4px 0 2px' }}>
              Tu mascota te espera
            </div>
            <div style={{ fontSize: 12, color: '#6C757D', marginBottom: 16 }}>
              Próxima comida en 2 horas.
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: 14,
                marginBottom: 10,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: '#EAF2FA',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconoReloj />
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Max</div>
                <div style={{ fontSize: 11, color: '#6C757D' }}>Dispensador: Cocina · 82%</div>
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  background: '#E6F7F0',
                  color: '#0f7a4d',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 999,
                }}
              >
                En línea
              </span>
            </div>

            <div
              style={{
                background: '#fff',
                borderRadius: 14,
                padding: 14,
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <div
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 12,
                  background: '#FBF0DC',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#CC8A25" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#1A1A1A' }}>Desayuno</div>
                <div style={{ fontSize: 11, color: '#6C757D' }}>Hoy 08:00 · 40 g</div>
              </div>
              <span
                style={{
                  marginLeft: 'auto',
                  background: '#FBF0DC',
                  color: '#9a6b12',
                  fontSize: 9,
                  fontWeight: 700,
                  padding: '3px 8px',
                  borderRadius: 999,
                }}
              >
                Listo
              </span>
            </div>
          </div>
        </div>

        <div className="phone-bottomnav">
          <span className="phone-nav-item active">
            <IconoCasa />
            <span className="phone-label">Inicio</span>
          </span>
          <span className="phone-nav-item">
            <IconoReloj />
            <span className="phone-label">Mascotas</span>
          </span>
          <span className="phone-nav-item">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span className="phone-label">Horarios</span>
          </span>
          <span className="phone-nav-item">
            <IconoAjustes />
            <span className="phone-label">Ajustes</span>
          </span>
        </div>
      </div>
    </div>
  )
}
