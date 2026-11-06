import { useInventario } from '../hooks/useInventario.js'

export default function Inventario() {
  const {
    componentes,
    proveedores,
    cargando,
    nuevoNombre,
    setNuevoNombre,
    nuevoStock,
    setNuevoStock,
    componenteEditando,
    setComponenteEditando,
    pedidoComponenteId,
    setPedidoComponenteId,
    pedidoProveedorId,
    setPedidoProveedorId,
    pedidoCantidad,
    setPedidoCantidad,
    pedidos,
    pedidosRecibidos,
    stockBajo,
    obtenerInventario,
    hacerPedido,
    verDetallePedido,
    marcarRecibido,
    registrarComponente,
    seleccionarParaEditar,
    cancelarEdicion,
    guardarEdicion,
    eliminarComponente,
  } = useInventario()

  return (
    <div className="pf-inventario-panel">
      <div className="inventario-container">
        <div className="header-section">
          <div>
            <span className="sub-tag">MÓDULO DE HARDWARE E INVENTARIO</span>
            <h2>Control de Producción e Inventario PawFeeder</h2>
          </div>
          <button className="btn-refresh" onClick={obtenerInventario} disabled={cargando}>
            Actualizar Stocks
          </button>
        </div>

        <div className="custom-card mb-4">
          <div className="card-header-custom">
            <h5>Hacer Pedido a Proveedor</h5>
          </div>
          <div className="card-body-custom">
            <div className="row-form">
              <div className="form-group flex-grow">
                <label>Componente</label>
                <select
                  className="custom-input"
                  value={pedidoComponenteId ?? ''}
                  onChange={(e) => setPedidoComponenteId(e.target.value === '' ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    Selecciona un componente...
                  </option>
                  {componentes.map((c) => (
                    <option value={c.id} key={c.id}>
                      {c.nombre} ({c.stock} pza){c.stock <= 3 ? ' — ¡Stock bajo!' : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group flex-grow">
                <label>Proveedor</label>
                <select
                  className="custom-input"
                  value={pedidoProveedorId ?? ''}
                  onChange={(e) => setPedidoProveedorId(e.target.value === '' ? null : Number(e.target.value))}
                >
                  <option value="" disabled>
                    Selecciona un proveedor...
                  </option>
                  {proveedores.map((p) => (
                    <option value={p.id} key={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group w-fixed">
                <label>Cantidad</label>
                <input
                  type="number"
                  className="custom-input"
                  min="1"
                  step="1"
                  value={pedidoCantidad}
                  onChange={(e) => setPedidoCantidad(Number(e.target.value))}
                />
              </div>

              <div className="form-group align-end">
                <button type="button" className="btn-custom-primary" onClick={hacerPedido} disabled={cargando}>
                  Registrar Pedido
                </button>
              </div>
            </div>

            {stockBajo.length > 0 && (
              <div className="low-stock-hint">
                <i className="bi bi-exclamation-triangle-fill"></i>
                Componentes con stock bajo (≤ 3 pza):
                <strong>{stockBajo.map((c) => c.nombre).join(', ')}</strong>
              </div>
            )}
          </div>
        </div>

        <div className="custom-card full-width-card mb-4">
          <div className="card-header-custom bg-mint">
            <h5>Pedidos a Proveedor — Pendientes ({pedidos.length})</h5>
          </div>
          <div className="card-body-custom p-0">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Folio</th>
                  <th>Proveedor</th>
                  <th>Componente</th>
                  <th className="text-center">Cantidad</th>
                  <th>Fecha</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidos.map((pedido) => (
                  <tr key={pedido.folio}>
                    <td className="fw-bold text-dark">{pedido.folio}</td>
                    <td>{pedido.proveedor}</td>
                    <td>{pedido.componente}</td>
                    <td className="text-center">
                      <span className="badge-stock">
                        {pedido.cantidad} {pedido.unidadMedida}
                      </span>
                    </td>
                    <td>{pedido.fecha}</td>
                    <td className="text-center">
                      <div className="actions-wrapper">
                        <button className="btn-action-outline btn-edit-outline" onClick={() => verDetallePedido(pedido)}>
                          Detalle
                        </button>
                        <button className="btn-action-outline btn-received-outline" onClick={() => marcarRecibido(pedido)}>
                          Recibido
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {pedidos.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-muted">
                      No hay pedidos pendientes.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {pedidosRecibidos.length > 0 && (
          <div className="custom-card full-width-card mb-4">
            <div className="card-header-custom" style={{ backgroundColor: '#D8E7F5', color: '#25517A' }}>
              <h5>Pedidos Recibidos ({pedidosRecibidos.length})</h5>
            </div>
            <div className="card-body-custom p-0">
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>Folio</th>
                    <th>Proveedor</th>
                    <th>Componente</th>
                    <th className="text-center">Cantidad</th>
                    <th>Fecha</th>
                  </tr>
                </thead>
                <tbody>
                  {pedidosRecibidos.map((pedido) => (
                    <tr key={pedido.folio}>
                      <td className="fw-bold text-dark">{pedido.folio}</td>
                      <td>{pedido.proveedor}</td>
                      <td>{pedido.componente}</td>
                      <td className="text-center">
                        <span className="badge-stock">
                          {pedido.cantidad} {pedido.unidadMedida}
                        </span>
                      </td>
                      <td>{pedido.fecha}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="custom-card mb-4">
          <div className="card-header-custom">
            <h5>Alta de Nuevo Componente</h5>
          </div>
          <div className="card-body-custom">
            <form onSubmit={registrarComponente} className="row-form">
              <div className="form-group flex-grow">
                <label>Nombre del Componente</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Ej. Servomotor SG90, Sensor HC-SR04..."
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  required
                />
              </div>

              <div className="form-group w-fixed">
                <label>Cantidad (Piezas)</label>
                <input
                  type="number"
                  className="custom-input"
                  min="1"
                  step="1"
                  value={nuevoStock}
                  onChange={(e) => setNuevoStock(e.target.value)}
                  required
                />
              </div>

              <div className="form-group align-end">
                <button type="submit" className="btn-custom-primary" disabled={cargando}>
                  Guardar Componente
                </button>
              </div>
            </form>
          </div>
        </div>

        {componenteEditando && (
          <div className="custom-card mb-4 border-warning">
            <div className="card-header-custom bg-warning text-dark">
              <h5>Editar Componente: {componenteEditando.nombre}</h5>
            </div>
            <div className="card-body-custom">
              <form onSubmit={guardarEdicion} className="row-form">
                <div className="form-group flex-grow">
                  <label>Nombre</label>
                  <input
                    type="text"
                    className="custom-input"
                    value={componenteEditando.nombre}
                    onChange={(e) => setComponenteEditando((prev) => ({ ...prev, nombre: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group w-fixed">
                  <label>Cantidad</label>
                  <input
                    type="number"
                    className="custom-input"
                    min="0"
                    value={componenteEditando.stock}
                    onChange={(e) => setComponenteEditando((prev) => ({ ...prev, stock: e.target.value }))}
                    required
                  />
                </div>
                <div className="form-group align-end d-flex gap-2">
                  <button type="submit" className="btn-custom-primary" disabled={cargando}>
                    Actualizar
                  </button>
                  <button type="button" className="btn-cancel" onClick={cancelarEdicion}>
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="custom-card full-width-card">
          <div className="card-header-custom bg-mint">
            <h5>Materia Prima en Stock</h5>
          </div>
          <div className="card-body-custom p-0">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Componente</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {componentes.map((item) => (
                  <tr key={item.id}>
                    <td className="fw-bold text-dark">{item.nombre}</td>
                    <td className="text-center">
                      <span className={`badge-stock${item.stock <= 3 ? ' badge-low' : ''}`}>{item.stock} pza</span>
                    </td>
                    <td className="text-center">
                      <div className="actions-wrapper">
                        <button className="btn-action-outline btn-edit-outline" onClick={() => seleccionarParaEditar(item)}>
                          Editar
                        </button>
                        <button className="btn-action-outline btn-delete-outline" onClick={() => eliminarComponente(item)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {componentes.length === 0 && (
                  <tr>
                    <td colSpan="3" className="text-center py-4 text-muted">
                      No hay componentes registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
