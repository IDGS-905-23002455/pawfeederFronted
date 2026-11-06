import { useRecetas } from '../hooks/useRecetas.js'

export default function Recetas() {
  const {
    productos,
    recetas,
    productoSeleccionado,
    mostrandoFormulario,
    nuevoComponenteId,
    setNuevoComponenteId,
    nuevaCantidad,
    setNuevaCantidad,
    editandoReceta,
    setEditandoReceta,
    mensajeError,
    componentesDisponibles,
    seleccionarProducto,
    alternarFormulario,
    agregarComponente,
    iniciarEdicion,
    guardarEdicion,
    cancelarEdicion,
    eliminar,
  } = useRecetas()

  return (
    <div className="pf-inventario-panel">
      <div className="rec-container">
        <div className="header-section">
          <div>
            <span className="sub-tag">FABRICACIÓN</span>
            <h2>Recetas de Dispensadores</h2>
          </div>
        </div>

        {mensajeError && <div className="alert-error">{mensajeError}</div>}

        <div className="split-layout">
          <div className="left-panel">
            <div className="custom-card">
              <div className="card-header-custom bg-mint">
                <h5>Tipos de Dispensador</h5>
              </div>
              <div className="card-body-custom p-0">
                <div className="producto-list">
                  {productos.map((p) => (
                    <div
                      className={`producto-item${productoSeleccionado?.id === p.id ? ' active' : ''}`}
                      onClick={() => seleccionarProducto(p)}
                      key={p.id}
                    >
                      <div className="producto-info">
                        <span className="producto-nombre">{p.nombre}</span>
                        <span
                          className={`producto-badge ${
                            p.componentesCount > 0 ? 'badge-completa' : 'badge-incompleta'
                          }`}
                        >
                          {p.componentesCount} componente{p.componentesCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      <span className="producto-stock">Stock: {p.stock}</span>
                    </div>
                  ))}
                  {productos.length === 0 && (
                    <div className="text-center py-4 text-muted">No hay productos registrados</div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="right-panel">
            {!productoSeleccionado && (
              <div className="custom-card">
                <div className="card-body-custom text-center py-5 text-muted">
                  Selecciona un tipo de dispensador para ver o editar su receta
                </div>
              </div>
            )}

            {productoSeleccionado && (
              <div className="custom-card">
                <div className="card-header-custom">
                  <h5>Receta: {productoSeleccionado.nombre}</h5>
                </div>
                <div className="card-body-custom">
                  <div className="receta-actions">
                    <button className="btn-add-small" onClick={alternarFormulario}>
                      {mostrandoFormulario ? 'Cancelar' : '+ Agregar Componente'}
                    </button>
                  </div>

                  {mostrandoFormulario && (
                    <div className="add-form">
                      <select
                        className="custom-input"
                        value={nuevoComponenteId}
                        onChange={(e) => setNuevoComponenteId(Number(e.target.value))}
                      >
                        <option value="0">Seleccionar componente...</option>
                        {componentesDisponibles.map((c) => (
                          <option value={c.id} key={c.id}>
                            {c.nombre} (Stock: {c.stock})
                          </option>
                        ))}
                      </select>
                      <input
                        type="number"
                        className="custom-input w-cant"
                        placeholder="Cantidad"
                        min="1"
                        style={{ width: 100 }}
                        value={nuevaCantidad}
                        onChange={(e) => setNuevaCantidad(Number(e.target.value))}
                      />
                      <button
                        className="btn-custom-primary"
                        onClick={agregarComponente}
                        disabled={nuevoComponenteId <= 0 || nuevaCantidad <= 0}
                      >
                        Agregar
                      </button>
                    </div>
                  )}

                  <table className="custom-table">
                    <thead>
                      <tr>
                        <th>Componente</th>
                        <th className="text-center">Cantidad</th>
                        <th className="text-center">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recetas.map((r) => (
                        <tr key={r.id}>
                          <td className="fw-bold">{r.componenteNombre}</td>
                          <td className="text-center">{r.cantidadRequerida} pza</td>
                          <td className="text-center">
                            <div className="actions-wrapper">
                              <button className="btn-action-outline btn-edit-outline" onClick={() => iniciarEdicion(r)}>
                                Editar
                              </button>
                              <button className="btn-action-outline btn-delete-outline" onClick={() => eliminar(r)}>
                                Eliminar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {recetas.length === 0 && (
                        <tr>
                          <td colSpan="3" className="text-center py-3 text-muted">
                            Esta receta no tiene componentes registrados
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {editandoReceta && (
              <div className="custom-card">
                <div className="card-header-custom" style={{ backgroundColor: '#f59e0b' }}>
                  <h5>Editar: {editandoReceta.componenteNombre}</h5>
                </div>
                <div className="card-body-custom">
                  <form onSubmit={guardarEdicion} className="row-form">
                    <div className="form-group w-fixed">
                      <label>Cantidad</label>
                      <input
                        type="number"
                        className="custom-input"
                        min="1"
                        required
                        value={editandoReceta.cantidadRequerida}
                        onChange={(e) =>
                          setEditandoReceta((prev) => ({ ...prev, cantidadRequerida: Number(e.target.value) }))
                        }
                      />
                    </div>
                    <div className="form-group align-end d-flex gap-2" style={{ flexDirection: 'row' }}>
                      <button type="submit" className="btn-custom-primary">
                        Guardar
                      </button>
                      <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
                        Cancelar
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
