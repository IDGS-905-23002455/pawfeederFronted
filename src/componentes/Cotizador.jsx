import { useCotizador } from '../hooks/useCotizador.js'
import { CONTENEDORES, MATERIALES, PRECIO_BASE } from '../datos/cotizador.js'

export function Cotizador() {
  const {
    contenedor,
    setContenedor,
    material,
    setMaterial,
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

  return (
    <div className="container my-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold text-success">Personaliza y Cotiza tu PawFeeder</h2>
        <p className="text-muted">
          Selecciona las especificaciones de hardware ideales para las necesidades de tu mascota.
        </p>
      </div>

      <div className="row g-4">
        <div className="col-md-7">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <div className="mb-4">
              <label className="form-label fw-bold text-dark" htmlFor="cot-contenedor">
                1. Capacidad del contenedor de croquetas
              </label>
              <select
                id="cot-contenedor"
                className="form-select border-2"
                value={contenedor}
                onChange={(e) => setContenedor(e.target.value)}
              >
                <option value="chico">Estándar (0.5 kg) — Incluido</option>
                <option value="mediano">Mediano (1.5 kg) — +$200 MXN</option>
                <option value="grande">Grande (3.0 kg) — +$450 MXN</option>
              </select>
            </div>

            <div className="mb-4">
              <span className="form-label fw-bold text-dark d-block">2. Acabado de la estructura externa</span>
              <div className="d-flex gap-3 flex-column flex-sm-row">
                {[
                  { valor: 'plastico', texto: 'Plástico ABS Estándar' },
                  { valor: 'premium', texto: 'Acero Inoxidable (+$500 MXN)' },
                ].map((opcion) => (
                  <div
                    className="form-check flex-fill bg-white p-3 rounded border border-2"
                    key={opcion.valor}
                  >
                    <input
                      className="form-check-input"
                      type="radio"
                      id={`mat-${opcion.valor}`}
                      name="material"
                      value={opcion.valor}
                      checked={material === opcion.valor}
                      onChange={(e) => setMaterial(e.target.value)}
                    />
                    <label className="form-check-label fw-semibold" htmlFor={`mat-${opcion.valor}`}>
                      {opcion.texto}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label fw-bold text-dark" htmlFor="cot-cantidad">
                3. Cantidad de dispositivos a cotizar
              </label>
              <input
                id="cot-cantidad"
                type="number"
                min="1"
                max="10"
                className="form-control border-2 w-25"
                value={cantidad}
                onChange={cambiarCantidad}
                onBlur={ajustarCantidad}
              />
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="card h-100 shadow border-2 border-success p-4 position-relative overflow-hidden bg-white">
            <div className="bg-success position-absolute top-0 start-0 w-100" style={{ height: 8 }} />

            <h4 className="fw-bold mb-4 mt-2">Resumen de Cotización</h4>

            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Kit Base (Arduino + Servos)</span>
              <span className="fw-semibold">${PRECIO_BASE}.00</span>
            </div>
            <div className="d-flex justify-content-between mb-2">
              <span className="text-muted">Contenedor seleccionado</span>
              <span className="fw-semibold">+ ${CONTENEDORES[contenedor]}.00</span>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <span className="text-muted">Estructura externa</span>
              <span className="fw-semibold">+ ${MATERIALES[material]}.00</span>
            </div>

            <hr />

            <div className="d-flex justify-content-between align-items-center my-4">
              <div>
                <h5 className="fw-bold m-0 text-dark">Total Estimado</h5>
                <small className="text-muted">
                  Multiplicado por {cantidadNum} {cantidadNum === 1 ? 'unidad' : 'unidades'}
                </small>
              </div>
              <span className="fs-2 fw-black text-success">
                ${total}.00 <small className="fs-6 text-muted">MXN</small>
              </span>
            </div>

            <div className="mt-auto">
              {!mostrarCorreo ? (
                <button
                  type="button"
                  className="btn btn-success w-100 rounded-pill py-2 fw-bold shadow-sm"
                  onClick={() => setMostrarCorreo(true)}
                >
                  Enviar cotización a mi correo
                </button>
              ) : (
                <div className="mt-3">
                  <input
                    type="email"
                    className="form-control mb-3"
                    placeholder="Ingresa tu correo electrónico"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                  />
                  <button
                    type="button"
                    className="btn btn-success w-100 rounded-pill"
                    onClick={enviar}
                    disabled={enviando}
                  >
                    {enviando ? 'Enviando...' : 'Confirmar envío'}
                  </button>
                </div>
              )}

              {mensaje && (
                <div className={`alert alert-${mensaje.tipo} py-2 small mt-3 mb-0`}>{mensaje.texto}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
