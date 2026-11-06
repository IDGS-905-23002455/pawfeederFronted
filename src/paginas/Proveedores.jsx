import { useProveedores } from '../hooks/useProveedores.js'

const TELEFONO = /^[0-9]*$/
const CORREO = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function CamposProveedor({ datos, tocados, cambiar, tocar }) {
  return (
    <>
      <div className="form-group flex-grow">
        <label>Nombre *</label>
        <input
          type="text"
          className="custom-input"
          placeholder="Nombre del proveedor"
          value={datos.nombre ?? ''}
          onChange={(e) => cambiar('nombre', e.target.value)}
          onBlur={() => tocar('nombre')}
          required
        />
        {tocados.nombre && !datos.nombre?.trim() && <span className="error-msg">El nombre es obligatorio</span>}
      </div>
      <div className="form-group flex-grow">
        <label>Contacto</label>
        <input
          type="text"
          className="custom-input"
          placeholder="Nombre del contacto"
          value={datos.contacto ?? ''}
          onChange={(e) => cambiar('contacto', e.target.value)}
        />
      </div>
      <div className="form-group w-fixed">
        <label>Teléfono</label>
        <input
          type="text"
          className="custom-input"
          placeholder="Teléfono"
          value={datos.telefono ?? ''}
          onChange={(e) => cambiar('telefono', e.target.value)}
          onBlur={() => tocar('telefono')}
        />
        {tocados.telefono && !TELEFONO.test(datos.telefono ?? '') && (
          <span className="error-msg">Solo números</span>
        )}
      </div>
      <div className="form-group flex-grow">
        <label>Correo</label>
        <input
          type="text"
          className="custom-input"
          placeholder="correo@ejemplo.com"
          value={datos.correo ?? ''}
          onChange={(e) => cambiar('correo', e.target.value)}
          onBlur={() => tocar('correo')}
        />
        {tocados.correo && datos.correo && !CORREO.test(datos.correo) && (
          <span className="error-msg">Ingresa un correo válido (ej: user@dominio.com)</span>
        )}
      </div>
      <div className="form-group flex-grow">
        <label>Dirección</label>
        <input
          type="text"
          className="custom-input"
          placeholder="Dirección"
          value={datos.direccion ?? ''}
          onChange={(e) => cambiar('direccion', e.target.value)}
        />
      </div>
    </>
  )
}

export default function Proveedores() {
  const {
    proveedores,
    cargando,
    mostrandoFormulario,
    nuevo,
    tocadosNuevo,
    editandoItem,
    tocadosEdicion,
    validoNuevo,
    validoEdicion,
    alternarFormulario,
    cambiarNuevo,
    tocarNuevo,
    cambiarEdicion,
    tocarEdicion,
    guardar,
    iniciarEdicion,
    cancelarEdicion,
    guardarEdicion,
    eliminar,
  } = useProveedores()

  return (
    <div className="pf-inventario-panel">
      <div className="prov-container">
        <div className="header-section">
          <div>
            <span className="sub-tag">MÓDULO DE COMPRAS</span>
            <h2>Proveedores</h2>
          </div>
          <button className="btn-add" onClick={alternarFormulario} disabled={cargando}>
            {mostrandoFormulario ? 'Cancelar' : '+ Nuevo Proveedor'}
          </button>
        </div>

        {mostrandoFormulario && (
          <div className="custom-card mb-4">
            <div className="card-header-custom">
              <h5>Registrar Proveedor</h5>
            </div>
            <div className="card-body-custom">
              <form onSubmit={guardar} className="row-form" noValidate>
                <CamposProveedor datos={nuevo} tocados={tocadosNuevo} cambiar={cambiarNuevo} tocar={tocarNuevo} />
                <div className="form-group align-end">
                  <button type="submit" className="btn-custom-primary" disabled={!validoNuevo}>
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        <div className="custom-card full-width-card">
          <div className="card-header-custom bg-mint">
            <h5>Proveedores Registrados ({proveedores.length})</h5>
          </div>
          <div className="card-body-custom p-0">
            <table className="custom-table">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Contacto</th>
                  <th>Teléfono</th>
                  <th>Correo</th>
                  <th>Dirección</th>
                  <th className="text-center">Estado</th>
                  <th className="text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {proveedores.map((p) => (
                  <tr key={p.id}>
                    <td className="fw-bold text-dark">{p.nombre}</td>
                    <td>{p.contacto || '-'}</td>
                    <td>{p.telefono || '-'}</td>
                    <td>{p.correo || '-'}</td>
                    <td>{p.direccion || '-'}</td>
                    <td className="text-center">
                      <span className={`badge-estado ${p.activo ? 'estado-terminado' : 'estado-pendiente'}`}>
                        {p.activo ? 'Activo' : 'Inactivo'}
                      </span>
                    </td>
                    <td className="text-center">
                      <div className="actions-wrapper">
                        <button className="btn-action-outline btn-edit-outline" onClick={() => iniciarEdicion(p)}>
                          Editar
                        </button>
                        <button className="btn-action-outline btn-delete-outline" onClick={() => eliminar(p)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {proveedores.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-muted">
                      No hay proveedores registrados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {editandoItem && (
          <div className="custom-card">
            <div className="card-header-custom" style={{ backgroundColor: '#f59e0b' }}>
              <h5>Editar: {editandoItem.nombre}</h5>
            </div>
            <div className="card-body-custom">
              <form onSubmit={guardarEdicion} className="row-form" noValidate>
                <CamposProveedor
                  datos={editandoItem}
                  tocados={tocadosEdicion}
                  cambiar={cambiarEdicion}
                  tocar={tocarEdicion}
                />
                <div className="form-group align-end d-flex gap-2" style={{ flexDirection: 'row' }}>
                  <button type="submit" className="btn-custom-primary" disabled={!validoEdicion}>
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
  )
}
