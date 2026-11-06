import { useHorarios } from '../hooks/useHorarios.js'

const DIAS = [
  { clave: 'lunes', corto: 'L', etiqueta: 'Lun', id: 'chkL' },
  { clave: 'martes', corto: 'M', etiqueta: 'Mar', id: 'chkM' },
  { clave: 'miercoles', corto: 'X', etiqueta: 'Mié', id: 'chkMi' },
  { clave: 'jueves', corto: 'J', etiqueta: 'Jue', id: 'chkJ' },
  { clave: 'viernes', corto: 'V', etiqueta: 'Vie', id: 'chkV' },
  { clave: 'sabado', corto: 'S', etiqueta: 'Sáb', id: 'chkS' },
  { clave: 'domingo', corto: 'D', etiqueta: 'Dom', id: 'chkD' },
]

export default function Horarios() {
  const {
    listaHorarios,
    listaMascotas,
    horarioEnEdicionId,
    form,
    tocados,
    errorMsg,
    horaValida,
    porcionValida,
    valido,
    cambiar,
    tocar,
    limpiarFormulario,
    guardarHorario,
    seleccionarParaEditar,
    eliminarHorario,
    obtenerNombreMascota,
  } = useHorarios()

  return (
    <div className="pf-cliente-panel">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <h4 className="fw-bold text-success mb-3">
              {horarioEnEdicionId ? 'Editar Alerta' : 'Programar Comida'}
            </h4>

            <form onSubmit={guardarHorario}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre del Horario</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Desayuno o Almuerzo"
                  value={form.nombre}
                  onChange={(e) => cambiar('nombre', e.target.value)}
                />
              </div>

              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold">Hora (24h)</label>
                  <input
                    type="text"
                    className={`form-control${tocados.hora && !horaValida ? ' is-invalid' : ''}`}
                    placeholder="Ej. 14:30"
                    maxLength="5"
                    value={form.hora}
                    onChange={(e) => cambiar('hora', e.target.value)}
                    onBlur={() => tocar('hora')}
                  />
                  <div className="invalid-feedback small">Usa formato de 24h (HH:MM).</div>
                </div>

                <div className="col-6 mb-3">
                  <label className="form-label fw-semibold">Porción (g)</label>
                  <input
                    type="number"
                    className={`form-control${tocados.porcionGramos && !porcionValida ? ' is-invalid' : ''}`}
                    placeholder="100"
                    min="1"
                    value={form.porcionGramos}
                    onChange={(e) => cambiar('porcionGramos', e.target.value)}
                    onBlur={() => tocar('porcionGramos')}
                  />
                  <div className="invalid-feedback small">Ingresa un número entero válido.</div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Mascota Asignada</label>
                <select
                  className="form-select"
                  value={form.mascotaId}
                  onChange={(e) => cambiar('mascotaId', e.target.value)}
                >
                  <option value="">Cualquiera (General)</option>
                  {listaMascotas.map((m) => (
                    <option value={m.id} key={m.id}>
                      {m.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold d-block mb-2">Días de Repetición</label>
                <div className="d-flex flex-wrap gap-3 bg-white p-3 rounded border">
                  {DIAS.map(({ clave, etiqueta, id }) => (
                    <div className="form-check" key={clave}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id={id}
                        checked={!!form[clave]}
                        onChange={(e) => cambiar(clave, e.target.checked)}
                      />
                      <label className="form-check-label small" htmlFor={id}>
                        {etiqueta}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" disabled={!valido} className="btn btn-success fw-bold">
                  {horarioEnEdicionId ? 'Guardar Modificación' : 'Activar Horario'}
                </button>
                {horarioEnEdicionId && (
                  <button type="button" onClick={limpiarFormulario} className="btn btn-outline-secondary btn-sm">
                    Cancelar
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <h3 className="fw-bold mb-4">Cronograma de Distribución Automática</h3>

          {errorMsg && <div className="alert alert-danger border-0 shadow-sm">{errorMsg}</div>}

          {listaHorarios.length === 0 ? (
            <div className="alert alert-warning border-0 shadow-sm">
              No hay ninguna rutina programada en la base de datos todavía. ¡Crea la primera comida a la izquierda!
            </div>
          ) : (
            <div className="row">
              {listaHorarios.map((h) => (
                <div className="col-md-6 mb-3" key={h.id}>
                  <div className="card shadow-sm border-0 h-100 position-relative">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge bg-light text-primary border border-primary small">
                          {h.porcionGramos}g
                        </span>
                      </div>

                      <p className="text-muted small mb-1">
                        <strong>Mascota:</strong> {obtenerNombreMascota(h.mascotaId)}
                      </p>
                      <p className="fs-4 fw-bold  my-2">{h.hora}</p>

                      <div className="d-flex gap-1 mt-2 flex-wrap">
                        {DIAS.map(({ clave, corto }) => (
                          <span className={`badge ${h[clave] ? 'bg-success' : 'bg-light text-muted'}`} key={clave}>
                            {corto}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="card-footer bg-transparent border-0 d-flex gap-2 pb-3 pt-0">
                      <button
                        type="button"
                        onClick={() => seleccionarParaEditar(h)}
                        className="btn btn-sm btn-edit-outline flex-fill"
                      >
                        Editar
                      </button>
                      <button
                        type="button"
                        onClick={() => eliminarHorario(h.id)}
                        className="btn btn-sm btn-outline-danger flex-fill"
                      >
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
