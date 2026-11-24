import { useCotizador } from '../hooks/useCotizador.js'
import { PRECIO_BASE, PRECIO_CAMARA } from '../datos/cotizador.js'

export function Cotizador() {
  const {
    incluyeCamara,
    setIncluyeCamara,
    cantidad,
    cambiarCantidad,
    ajustarCantidad,
    correo,
    setCorreo,
    mostrarCorreo,
    setMostrarCorreo,
    mensaje,
    enviando,
    total,
    cantidadNum,
    enviar,
  } = useCotizador()

  const cambiarCantidadBoton = (delta) => {
    const siguiente = Math.min(10, Math.max(1, cantidadNum + delta))
    cambiarCantidad({ target: { value: String(siguiente) } })
  }

  return (
    <section style={{ padding: '5rem 0', background: 'linear-gradient(180deg,#fff 0%,#F5F0E8 100%)' }}>
      <div className="container-xl">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: 680 }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              fontSize: '.72rem',
              fontWeight: 800,
              letterSpacing: '.08em',
              textTransform: 'uppercase',
              color: '#2C5F8A',
              background: '#EAF2FA',
              padding: '.45rem .9rem',
              borderRadius: 999,
              marginBottom: '1rem',
            }}
          >
            Cotización
          </div>
          <h2 className="fw-bold mb-3" style={{ color: '#1E3A5C', fontSize: 'clamp(1.8rem,3.4vw,2.6rem)' }}>
            Personaliza y cotiza tu <span style={{ color: '#2C5F8A' }}>PawFeeder</span>
          </h2>
          <p className="text-muted mb-0" style={{ fontSize: '1.05rem' }}>
            Nuestro dispensador premium en acero inoxidable, con contenedor grande. Personaliza los extras y recibe tu cotización al instante.
          </p>
        </div>

        <div className="row g-4 align-items-stretch">
          <div className="col-lg-7">
            <div className="bg-white h-100" style={{ border: '1px solid rgba(30,58,92,.08)', borderRadius: 24, padding: '2rem', boxShadow: '0 12px 40px rgba(30,58,92,.06)' }}>
              <div className="d-flex align-items-center gap-3 pb-4 mb-4" style={{ borderBottom: '1px solid rgba(30,58,92,.08)' }}>
                <span style={{ width: 48, height: 48, borderRadius: 14, background: '#EAF2FA', color: '#2C5F8A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.25rem' }}>
                  <i className="bi bi-sliders2" />
                </span>
                <div>
                  <h5 className="fw-bold mb-0" style={{ color: '#1E3A5C' }}>Configura tu pedido</h5>
                  <p className="text-muted small mb-0">Nuestro PawFeeder viene en una sola presentación premium.</p>
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 fw-bold mb-3" style={{ color: '#1E3A5C' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#2C5F8A', color: '#fff', fontSize: '.72rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}><i className="bi bi-check-lg" /></span>
                  Especificaciones incluidas
                </div>
                <div className="d-grid gap-2">
                  {[
                    { icon: 'bi-box-seam', name: 'Contenedor grande', desc: '3.0 kg de capacidad, ideal para uso diario' },
                    { icon: 'bi-shield-check', name: 'Acero inoxidable', desc: 'Estructura resistente, higiénica y de acabado premium' },
                  ].map((item) => (
                    <div key={item.name} className="d-flex align-items-center gap-3" style={{ padding: '1rem 1.1rem', border: '1.5px solid rgba(44,95,138,.18)', borderRadius: 16, background: '#EAF2FA' }}>
                      <span style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', color: '#2C5F8A', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>
                        <i className={`bi ${item.icon}`} />
                      </span>
                      <div className="flex-grow-1">
                        <div className="fw-bold" style={{ color: '#1E3A5C' }}>{item.name}</div>
                        <div className="text-muted small">{item.desc}</div>
                      </div>
                      <span style={{ fontSize: '.72rem', fontWeight: 800, color: '#25517A', background: 'rgba(44,95,138,.12)', padding: '.2rem .6rem', borderRadius: 999 }}>Incluido</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <div className="d-flex align-items-center gap-2 fw-bold mb-3" style={{ color: '#1E3A5C' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#2C5F8A', color: '#fff', fontSize: '.72rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>1</span>
                  Extra opcional
                </div>
                <label
                  className="d-flex align-items-center gap-3 w-100"
                  style={{
                    padding: '1rem 1.1rem',
                    border: `1.5px solid ${incluyeCamara ? '#2C5F8A' : 'rgba(30,58,92,.12)'}`,
                    borderRadius: 16,
                    background: incluyeCamara ? '#EAF2FA' : '#fbfcfd',
                    cursor: 'pointer',
                    boxShadow: incluyeCamara ? '0 0 0 4px rgba(44,95,138,.1)' : 'none',
                  }}
                >
                  <input type="checkbox" className="d-none" checked={incluyeCamara} onChange={(e) => setIncluyeCamara(e.target.checked)} />
                  <div className="flex-grow-1">
                    <div className="d-flex justify-content-between gap-2 flex-wrap">
                      <span className="fw-bold" style={{ color: '#1E3A5C' }}><i className="bi bi-camera-video me-2" />Cámara de monitoreo</span>
                      <span style={{ fontSize: '.75rem', fontWeight: 800, color: incluyeCamara ? '#fff' : '#25517A', background: incluyeCamara ? '#2C5F8A' : 'rgba(44,95,138,.1)', padding: '.2rem .6rem', borderRadius: 999 }}>+${PRECIO_CAMARA}</span>
                    </div>
                    <div className="text-muted small">Vigila a tu mascota mientras come, desde la app</div>
                  </div>
                  <span aria-hidden="true" style={{ width: 48, height: 28, background: incluyeCamara ? '#2C5F8A' : 'rgba(30,58,92,.18)', borderRadius: 999, padding: 3, display: 'inline-flex', alignItems: 'center', flexShrink: 0, transition: 'background .2s' }}>
                    <span style={{ width: 22, height: 22, borderRadius: '50%', background: '#fff', boxShadow: '0 1px 4px rgba(0,0,0,.18)', transform: incluyeCamara ? 'translateX(20px)' : 'translateX(0)', transition: 'transform .2s' }} />
                  </span>
                </label>
              </div>

              <div>
                <div className="d-flex align-items-center gap-2 fw-bold mb-3" style={{ color: '#1E3A5C' }}>
                  <span style={{ width: 24, height: 24, borderRadius: '50%', background: '#2C5F8A', color: '#fff', fontSize: '.72rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>2</span>
                  Cantidad
                </div>
                <div className="d-inline-flex align-items-center gap-2 p-1" style={{ background: '#F5F0E8', borderRadius: 16, border: '1px solid rgba(30,58,92,.08)' }}>
                  <button type="button" className="btn btn-light" style={{ width: 44, height: 44, borderRadius: 12, fontWeight: 700 }} onClick={() => cambiarCantidadBoton(-1)} aria-label="Reducir cantidad">
                    <i className="bi bi-dash-lg" />
                  </button>
                  <div className="text-center px-2" style={{ minWidth: 88 }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1E3A5C', lineHeight: 1.1 }}>{cantidadNum}</div>
                    <div className="text-muted" style={{ fontSize: '.72rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.04em' }}>{cantidadNum === 1 ? 'unidad' : 'unidades'}</div>
                  </div>
                  <button type="button" className="btn btn-light" style={{ width: 44, height: 44, borderRadius: 12, fontWeight: 700 }} onClick={() => cambiarCantidadBoton(1)} aria-label="Aumentar cantidad">
                    <i className="bi bi-plus-lg" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="bg-white h-100 d-flex flex-column position-relative overflow-hidden" style={{ border: '1px solid rgba(30,58,92,.08)', borderRadius: 24, padding: '2rem', boxShadow: '0 12px 40px rgba(30,58,92,.06)' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 5, background: 'linear-gradient(90deg,#2C5F8A,#E8A838)' }} />
              <div className="pb-4 mb-4" style={{ borderBottom: '1px dashed rgba(30,58,92,.15)' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', fontSize: '.72rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#25517A', background: '#EAF2FA', padding: '.35rem .75rem', borderRadius: 999, marginBottom: '.9rem' }}>
                  <i className="bi bi-receipt-cutoff me-2" />Resumen
                </div>
                <h4 className="fw-bold mb-1" style={{ color: '#1E3A5C' }}>Tu cotización</h4>
                <p className="text-muted small mb-0">Estimado en MXN, sujeto a disponibilidad.</p>
              </div>

              <div className="d-grid gap-3 mb-4">
                <div className="d-flex justify-content-between gap-3">
                  <span className="text-muted"><i className="bi bi-cpu me-2" style={{ color: '#2C5F8A' }} />PawFeeder grande · acero inoxidable</span>
                  <span className="fw-bold" style={{ color: '#1E3A5C' }}>${PRECIO_BASE}.00</span>
                </div>
                <div className="d-flex justify-content-between gap-3">
                  <span className="text-muted"><i className="bi bi-box-seam me-2" style={{ color: '#2C5F8A' }} />Contenedor 3.0 kg</span>
                  <span className="fw-bold" style={{ color: '#25517A', fontSize: '.8rem' }}>Incluido</span>
                </div>
                <div className="d-flex justify-content-between gap-3" style={{ opacity: incluyeCamara ? 1 : 0.55 }}>
                  <span className="text-muted"><i className="bi bi-camera-video me-2" style={{ color: incluyeCamara ? '#2C5F8A' : '#B8C5D0' }} />Cámara de monitoreo</span>
                  <span className="fw-bold" style={{ color: '#1E3A5C' }}>{incluyeCamara ? `+ $${PRECIO_CAMARA}.00` : '—'}</span>
                </div>
                <div className="d-flex justify-content-between gap-3 pt-3" style={{ borderTop: '1px solid rgba(30,58,92,.06)' }}>
                  <span className="text-muted"><i className="bi bi-layers me-2" style={{ color: '#2C5F8A' }} />Cantidad</span>
                  <span className="fw-bold" style={{ color: '#1E3A5C' }}>× {cantidadNum}</span>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-end gap-3 py-4 mb-4" style={{ borderTop: '2px solid #1E3A5C', borderBottom: '1px solid rgba(30,58,92,.08)' }}>
                <div>
                  <div style={{ fontSize: '.78rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.06em', color: '#5F6E7D' }}>Total estimado</div>
                  <div className="text-muted small">{cantidadNum} {cantidadNum === 1 ? 'dispositivo' : 'dispositivos'} configurado{cantidadNum === 1 ? '' : 's'}</div>
                </div>
                <div className="text-end">
                  <div style={{ fontSize: '.72rem', fontWeight: 800, color: '#5F6E7D', letterSpacing: '.06em' }}>MXN</div>
                  <div style={{ fontSize: 'clamp(2rem,4vw,2.75rem)', fontWeight: 700, color: '#2C5F8A', lineHeight: 1 }}>${total}</div>
                </div>
              </div>

              <div className="mt-auto">
                {!mostrarCorreo ? (
                  <button type="button" className="btn w-100 fw-bold text-white" style={{ background: '#2C5F8A', borderRadius: 14, padding: '.95rem 1.5rem' }} onClick={() => setMostrarCorreo(true)}>
                    <i className="bi bi-envelope-paper me-2" />Enviar cotización a mi correo
                  </button>
                ) : (
                  <div style={{ background: '#F5F0E8', padding: '1.25rem', borderRadius: 16, border: '1px solid rgba(30,58,92,.06)' }}>
                    <label className="form-label fw-bold small" htmlFor="cotiza-correo" style={{ color: '#1E3A5C' }}>¿A dónde te la enviamos?</label>
                    <div className="d-flex gap-2 flex-column flex-sm-row">
                      <input id="cotiza-correo" type="email" className="form-control" placeholder="tu@correo.com" value={correo} onChange={(e) => setCorreo(e.target.value)} style={{ borderRadius: 12 }} />
                      <button type="button" className="btn fw-bold text-white" style={{ background: '#2C5F8A', borderRadius: 12, whiteSpace: 'nowrap' }} onClick={enviar} disabled={enviando}>
                        {enviando ? 'Enviando...' : 'Enviar'}
                      </button>
                    </div>
                    <button type="button" className="btn btn-link p-0 mt-2 small text-muted" onClick={() => setMostrarCorreo(false)}>Cancelar</button>
                  </div>
                )}

                {mensaje && <div className={`alert alert-${mensaje.tipo} py-2 small mt-3 mb-0`}>{mensaje.texto}</div>}
                <p className="text-center mt-3 mb-0" style={{ fontSize: '.75rem', color: '#8697A5' }}><i className="bi bi-lock me-1" />Tu correo solo se usa para enviarte esta cotización.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
