import { useMascotas } from '../hooks/useMascotas.js'

export default function Mascotas() {
  const {
    listaMascotas,
    mascotaEnEdicionId,
    form,
    cargando,
    errorMsg,
    valido,
    cambiar,
    limpiarFormulario,
    guardarMascota,
    seleccionarMascotaParaEditar,
    eliminarMascota,
  } = useMascotas()

  return (
    <div className="pf-cliente-panel">
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 p-4 bg-light">
            <h4 className="fw-bold text-success mb-3">
              {mascotaEnEdicionId ? 'Editar Mascota' : 'Registrar Mascota'}
            </h4>

            <form onSubmit={guardarMascota}>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Rocky"
                  value={form.nombre}
                  onChange={(e) => cambiar('nombre', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Raza</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ej. Golden Retriever"
                  value={form.raza}
                  onChange={(e) => cambiar('raza', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Edad (años)</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Ej. 2"
                  value={form.edadAnos}
                  onChange={(e) => cambiar('edadAnos', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Peso (kg)</label>
                <input
                  type="number"
                  step="0.01"
                  className="form-control"
                  placeholder="Ej. 25.5"
                  value={form.pesoKg}
                  onChange={(e) => cambiar('pesoKg', e.target.value)}
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Tamaño</label>
                <select
                  className="form-select"
                  value={form.tamano}
                  onChange={(e) => cambiar('tamano', e.target.value)}
                >
                  <option value="pequeño">Pequeño</option>
                  <option value="mediano">Mediano</option>
                  <option value="grande">Grande</option>
                  <option value="gigante">Gigante</option>
                </select>
              </div>

              <div className="d-grid gap-2">
                <button type="submit" disabled={!valido} className="btn btn-success fw-bold">
                  {mascotaEnEdicionId ? 'Actualizar Cambios' : 'Agregar a PawFeeder'}
                </button>

                {mascotaEnEdicionId && (
                  <button type="button" onClick={limpiarFormulario} className="btn btn-outline-secondary btn-sm">
                    Cancelar Edición
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        <div className="col-md-8">
          <h3 className="fw-bold mb-4">Mis Mascotas en Vinculación</h3>

          {errorMsg && <div className="alert alert-danger shadow-sm">{errorMsg}</div>}

          {listaMascotas.length === 0 ? (
            <div className="alert alert-info shadow-sm d-flex align-items-center gap-2">
              {cargando ? (
                <div className="spinner-border spinner-border-sm text-info" role="status"></div>
              ) : null}
              <span>Conectando con el servidor de C# o sin mascotas registradas...</span>
            </div>
          ) : (
            <div className="row">
              {listaMascotas.map((mascota) => (
                <div className="col-md-6 mb-3" key={mascota.id}>
                  <div className="card shadow-sm border-0 h-100 d-flex flex-column justify-content-between">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-start">
                        <div>
                          <h5 className="card-title text-primary fw-bold mb-1">{mascota.nombre}</h5>
                          <p className="text-muted small mb-2">{mascota.raza}</p>
                        </div>
                        <span className={`badge ${mascota.activa ? 'bg-success' : 'bg-danger'}`}>
                          {mascota.activa ? 'Activo' : 'Inactivo'}
                        </span>
                      </div>

                      <hr className="text-muted my-2" />

                      <p className="card-text small text-secondary mb-3">
                        <strong>Edad:</strong> {mascota.edadAnos} años <br />
                        <strong>Peso:</strong> {mascota.pesoKg} kg <br />
                        <strong>Tamaño:</strong> <span className="text-capitalize">{mascota.tamano}</span>
                      </p>
                    </div>

                    <div className="card-footer bg-transparent border-0 pt-0 pb-3 px-3 d-flex gap-2">
                      <button
                        onClick={() => seleccionarMascotaParaEditar(mascota)}
                        className="btn btn-sm btn-edit-outline flex-fill d-flex align-items-center justify-content-center gap-1"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => eliminarMascota(mascota.id)}
                        className="btn btn-sm btn-outline-danger flex-fill d-flex align-items-center justify-content-center gap-1"
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
