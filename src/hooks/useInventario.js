import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

function mapPedido(p) {
  return {
    id: p.id,
    folio: p.folio,
    proveedor: p.proveedorNombre ?? p.proveedor ?? '',
    proveedorId: p.proveedorId,
    componente: p.componenteNombre ?? p.componente ?? '',
    componenteId: p.componenteId,
    cantidad: p.cantidad,
    unidadMedida: p.unidadMedida || 'pza',
    fecha: p.fecha ? new Date(p.fecha).toLocaleString('es-MX') : '',
    estado: p.estado,
  }
}

export function useInventario() {
  const [componentes, setComponentes] = useState([])
  const [productos, setProductos] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [pedidos, setPedidos] = useState([])
  const [pedidosRecibidos, setPedidosRecibidos] = useState([])
  const [cargando, setCargando] = useState(false)

  const [nuevoNombre, setNuevoNombre] = useState('')
  const [nuevoStock, setNuevoStock] = useState(1)
  const [componenteEditando, setComponenteEditando] = useState(null)

  const [pedidoComponenteId, setPedidoComponenteId] = useState(null)
  const [pedidoProveedorId, setPedidoProveedorId] = useState(null)
  const [pedidoCantidad, setPedidoCantidad] = useState(10)

  const cargarProveedores = useCallback(async () => {
    try {
      const data = await api.getProveedores()
      setProveedores((Array.isArray(data) ? data : []).filter((p) => p.activo))
    } catch {
      // mantener estado actual
    }
  }, [])

  const cargarPedidos = useCallback(async () => {
    try {
      const data = await api.getPedidosProveedor()
      const lista = (Array.isArray(data) ? data : []).map(mapPedido)
      setPedidos(lista.filter((p) => p.estado === 'pendiente'))
      setPedidosRecibidos(lista.filter((p) => p.estado === 'recibido'))
    } catch {
      // mantener estado actual
    }
  }, [])

  const obtenerInventario = useCallback(async () => {
    setCargando(true)
    try {
      const [componentesData, productosData] = await Promise.all([
        api.getComponentes(),
        api.getProductos(),
        cargarPedidos(),
      ])
      setComponentes([...(Array.isArray(componentesData) ? componentesData : [])])
      setProductos([...(Array.isArray(productosData) ? productosData : [])])
    } catch {
      // mantener estado actual
    } finally {
      setCargando(false)
    }
  }, [cargarPedidos])

  useEffect(() => {
    obtenerInventario()
    cargarProveedores()
  }, [obtenerInventario, cargarProveedores])

  const stockBajo = componentes.filter((c) => c.stock <= 3)

  const hacerPedido = async () => {
    const componente = componentes.find((c) => c.id === Number(pedidoComponenteId))
    const proveedor = proveedores.find((p) => p.id === Number(pedidoProveedorId))

    if (!componente) {
      window.alert('Selecciona un componente para el pedido.')
      return
    }
    if (!proveedor) {
      window.alert('Selecciona un proveedor para el pedido.')
      return
    }
    if (!Number.isInteger(pedidoCantidad) || pedidoCantidad <= 0) {
      window.alert('La cantidad debe ser un número entero mayor a 0.')
      return
    }

    setCargando(true)
    try {
      const creado = await api.crearPedidoProveedor({
        proveedorId: proveedor.id,
        componenteId: componente.id,
        cantidad: pedidoCantidad,
      })
      const pedido = mapPedido(creado)
      setPedidos((prev) => [pedido, ...prev])
      setPedidoComponenteId(null)
      setPedidoProveedorId(null)
      setPedidoCantidad(10)
      window.alert(`Pedido ${pedido.folio} registrado:\n${pedido.componente} x${pedido.cantidad} → ${pedido.proveedor}`)
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : err?.body?.mensaje || 'No se pudo registrar el pedido.'
      window.alert(msj)
    } finally {
      setCargando(false)
    }
  }

  const verDetallePedido = (pedido) => {
    window.alert(
      [
        `Folio: ${pedido.folio}`,
        `Proveedor: ${pedido.proveedor}`,
        `Componente: ${pedido.componente}`,
        `Cantidad: ${pedido.cantidad} ${pedido.unidadMedida}`,
        `Fecha: ${pedido.fecha}`,
        `Estado: ${pedido.estado}`,
      ].join('\n'),
    )
  }

  const marcarRecibido = async (pedido) => {
    if (!window.confirm(`¿Marcar el pedido ${pedido.folio} como recibido?`)) return
    setCargando(true)
    try {
      const actualizado = await api.recibirPedidoProveedor(pedido.id)
      const pedidoActualizado = mapPedido(actualizado)
      setPedidos((prev) => prev.filter((p) => p.id !== pedido.id))
      setPedidosRecibidos((prev) => [pedidoActualizado, ...prev])
      await obtenerInventario()
      window.alert(`Pedido ${pedido.folio} marcado como recibido. El stock se actualizó.`)
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : err?.body?.mensaje || 'No se pudo marcar el pedido como recibido.'
      window.alert(msj)
      setCargando(false)
    }
  }

  const registrarComponente = async (evento) => {
    evento.preventDefault()
    const nombreLimpio = nuevoNombre?.trim()
    const stockIngresado = Number(nuevoStock)

    if (!nombreLimpio) {
      window.alert('Por favor ingresa el nombre del componente.')
      return
    }
    if (/^\d+$/.test(nombreLimpio)) {
      window.alert('El nombre del componente debe contener letras, no solo números.')
      return
    }
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/.test(nombreLimpio)) {
      window.alert('El nombre del componente debe incluir al menos una letra.')
      return
    }
    if (isNaN(stockIngresado) || stockIngresado <= 0) {
      window.alert('La cantidad debe ser un número entero mayor a 0.')
      return
    }
    if (!Number.isInteger(stockIngresado)) {
      window.alert('La cantidad debe ser un número entero sin decimales.')
      return
    }

    setCargando(true)
    try {
      const res = await api.crearComponente({ nombre: nombreLimpio, stock: stockIngresado, unidadMedida: 'pza' })
      window.alert(`Componente '${res.nombre}' guardado exitosamente.`)
      setNuevoNombre('')
      setNuevoStock(1)
      obtenerInventario()
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : err?.body?.mensaje || 'Hubo un error al registrar el componente.'
      window.alert(msj)
      setCargando(false)
    }
  }

  const seleccionarParaEditar = (item) => setComponenteEditando({ ...item })
  const cancelarEdicion = () => setComponenteEditando(null)

  const guardarEdicion = async (evento) => {
    evento.preventDefault()
    if (!componenteEditando) return

    const nombreLimpio = componenteEditando.nombre?.trim()
    const stockIngresado = Number(componenteEditando.stock)

    if (!nombreLimpio) {
      window.alert('El nombre del componente no puede estar vacío.')
      return
    }
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ]/.test(nombreLimpio)) {
      window.alert('El nombre debe contener al menos una letra.')
      return
    }
    if (isNaN(stockIngresado) || stockIngresado < 0) {
      window.alert('La cantidad no puede ser negativa.')
      return
    }

    setCargando(true)
    try {
      await api.actualizarComponente(componenteEditando.id, { ...componenteEditando, nombre: nombreLimpio, stock: stockIngresado })
      window.alert('Componente actualizado correctamente.')
      setComponenteEditando(null)
      obtenerInventario()
    } catch {
      window.alert('Hubo un error al actualizar el componente.')
      setCargando(false)
    }
  }

  const eliminarComponente = async (item) => {
    if (!window.confirm(`¿Estás segura de eliminar el componente '${item.nombre}'?`)) return

    setCargando(true)
    try {
      await api.eliminarComponente(item.id)
      window.alert(`Componente '${item.nombre}' eliminado.`)
      obtenerInventario()
    } catch {
      window.alert('No se pudo eliminar el componente. Puede estar asociado a una receta de producción.')
      setCargando(false)
    }
  }

  return {
    componentes,
    productos,
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
  }
}
