import { formatearFechaHoraCorta } from '../datos/panel.js'
import { useInventarioDispensadores } from '../hooks/useInventarioDispensadores.js'

const ESTADOS = ['Pendiente', 'En proceso', 'Terminado']

const claseEstado = (estado) => {
  if (estado === 'Pendiente') return 'estado-pendiente'
  if (estado === 'En proceso') return 'estado-proceso'
  if (estado === 'Terminado') return 'estado-terminado'
  return ''
}

export default function InventarioDispensadores() {
  const {
    productos,
    unidades,
    totalTerminados,
    cargando,
    nuevoNombre,
    setNuevoNombre,
    cargarTodo,
    registrarProducto,
    fabricarDispensador,
    cambiarEstadoUnidad,
  } = useInventarioDispensadores()

  return (
    <div className="pf-inventario-panel">
      <div className="inv-disp-container">
        <div className="header-section">
          <div>
            <span className="sub-tag">INVENTARIO DE DISPENSADORES</span>
            <h2>Dispensadores PawFeeder</h2>
          </div>
          <button className="btn-refresh" onClick={cargarTodo} disabled={cargando}>
            Actualizar
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-label">Total Fabricados</span>
            <span className="stat-number">{unidades.length}</span>
          </div>
          <div className="stat-card stat-terminado">
            <span className="stat-label">Listos (Terminados)</span>
            <span className="stat-number">{totalTerminados}</span>
          </div>
          <div className="stat-card stat-proceso">
            <span className="stat-label">En Proceso</span>
            <span className="stat-number">{unidades.length - totalTerminados}</span>
          </div>
        </div>

        <div className="custom-card mb-4">
          <div className="card-header-custom">
            <h5>Registrar Nuevo Tipo de Dispensador</h5>
          </div>
          <div className="card-body-custom">
            <form onSubmit={registrarProducto} className="row-form">
              <div className="form-group flex-grow">
                <label>Nombre del Dispensador</label>
                <input
                  type="text"
                  className="custom-input"
                  placeholder="Ej. PawFeeder Pro, PawFeeder Lite..."
                  value={nuevoNombre}
                  onChange={(e) => setNuevoNombre(e.target.value)}
                  required
                />
              </div>
              <div className="form-group align-end">
                <button type="submit" className="btn-custom-primary" disabled={cargando}>
                  Registrar Tipo
                </button>
              </div>
            </form>
          </div>
        </div>

        <div className="custom-card mb-4">
          <div className="card-header-custom bg-mint">
            <h5>Tipos de Dispensador ({productos.length})</h5>
          </div>
          <div className="card-body-custom p-0">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nombre</th>
                  <th className="text-center">Stock Total</th>
                  <th className="text-center">Fabricar</th>
                </tr>
              </thead>
              <tbody>
                {productos.map((prod) => (
                  <tr key={prod.id}>
                    <td className="fw-bold text-dark">#{prod.id}</td>
                    <td className="fw-semibold text-dark">{prod.nombre}</td>
                    <td className="text-center">
                      <span className={`badge-stock${prod.stock <= 3 ? ' badge-low' : ''}`}>{prod.stock} pza</span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn-fabricar"
                        onClick={() => fabricarDispensador(prod.id, prod.nombre)}
                        disabled={cargando}
                      >
                        Fabricar +1
                      </button>
                    </td>
                  </tr>
                ))}
                {productos.length === 0 && !cargando && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay tipos de dispensador registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="custom-card full-width-card">
          <div className="card-header-custom">
            <h5>Unidades Fabricadas ({unidades.length})</h5>
          </div>
          <div className="card-body-custom p-0">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Código Único</th>
                  <th>Producto</th>
                  <th className="text-center">Estado</th>
                  <th>Fecha de Fabricación</th>
                </tr>
              </thead>
              <tbody>
                {unidades.map((u) => (
                  <tr key={u.id}>
                    <td>
                      <code className="code-badge">{u.codigoUnico}</code>
                    </td>
                    <td className="fw-semibold text-dark">{u.productoNombre}</td>
                    <td className="text-center">
                      <select
                        className={`estado-select ${claseEstado(u.estado)}`}
                        value={u.estado}
                        onChange={(e) => cambiarEstadoUnidad(u.id, e.target.value)}
                      >
                        {ESTADOS.map((estado) => (
                          <option value={estado} key={estado}>
                            {estado}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="text-muted">{formatearFechaHoraCorta(u.creadoEn)}</td>
                  </tr>
                ))}
                {unidades.length === 0 && !cargando && (
                  <tr>
                    <td colSpan="4" className="text-center py-4 text-muted">
                      No hay unidades fabricadas aún
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
