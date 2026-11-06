import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

export function useRecetas() {
  const [productos, setProductos] = useState([])
  const [recetas, setRecetas] = useState([])
  const [componentes, setComponentes] = useState([])
  const [productoSeleccionado, setProductoSeleccionado] = useState(null)
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false)
  const [nuevoComponenteId, setNuevoComponenteId] = useState(0)
  const [nuevaCantidad, setNuevaCantidad] = useState(1)
  const [editandoReceta, setEditandoReceta] = useState(null)
  const [mensajeError, setMensajeError] = useState('')

  const cargarProductos = useCallback(async () => {
    try {
      const data = await api.getProductosConReceta()
      setProductos([...(Array.isArray(data) ? data : [])])
    } catch {
      setMensajeError('Error al cargar productos. ¿El backend está corriendo?')
    }
  }, [])

  const cargarComponentes = useCallback(async () => {
    try {
      const data = await api.getComponentes()
      setComponentes([...(Array.isArray(data) ? data : [])])
    } catch {
      setMensajeError('Error al cargar componentes. ¿El backend está corriendo?')
    }
  }, [])

  const cargarDatos = useCallback(() => {
    setMensajeError('')
    cargarProductos()
    cargarComponentes()
  }, [cargarProductos, cargarComponentes])

  useEffect(() => {
    cargarDatos()
  }, [cargarDatos])

  const cargarRecetas = useCallback(async (productoId) => {
    try {
      const data = await api.getRecetaPorProducto(productoId)
      setRecetas([...(Array.isArray(data) ? data : [])])
    } catch {
      setMensajeError('Error al cargar la receta.')
    }
  }, [])

  const seleccionarProducto = (producto) => {
    setProductoSeleccionado(producto)
    setMostrandoFormulario(false)
    setEditandoReceta(null)
    cargarRecetas(producto.id)
  }

  const alternarFormulario = () => {
    setMostrandoFormulario((prev) => !prev)
    setNuevoComponenteId(0)
    setNuevaCantidad(1)
  }

  const componentesDisponibles = (() => {
    if (!productoSeleccionado) return []
    const idsEnReceta = new Set(recetas.map((r) => r.componenteId))
    return componentes.filter((c) => !idsEnReceta.has(c.id))
  })()

  const agregarComponente = async () => {
    if (!productoSeleccionado || nuevoComponenteId <= 0 || nuevaCantidad <= 0) return

    const payload = {
      productoId: productoSeleccionado.id,
      componenteId: nuevoComponenteId,
      cantidadRequerida: nuevaCantidad,
      dispensador: productoSeleccionado.nombre,
    }

    try {
      await api.crearReceta(payload)
      setNuevoComponenteId(0)
      setNuevaCantidad(1)
      setMostrandoFormulario(false)
      cargarRecetas(productoSeleccionado.id)
      cargarDatos()
    } catch (err) {
      window.alert(typeof err?.body === 'string' ? err.body : 'Error al agregar componente.')
    }
  }

  const iniciarEdicion = (item) => setEditandoReceta({ ...item })
  const cancelarEdicion = () => setEditandoReceta(null)

  const guardarEdicion = async (evento) => {
    evento.preventDefault()
    if (!editandoReceta) return

    const payload = {
      productoId: editandoReceta.productoId,
      componenteId: editandoReceta.componenteId,
      cantidadRequerida: editandoReceta.cantidadRequerida,
      dispensador: editandoReceta.dispensador,
    }

    try {
      await api.actualizarReceta(editandoReceta.id, payload)
      setEditandoReceta(null)
      if (productoSeleccionado) cargarRecetas(productoSeleccionado.id)
    } catch {
      window.alert('Error al actualizar.')
    }
  }

  const eliminar = async (item) => {
    if (!window.confirm(`¿Eliminar '${item.componenteNombre}' de la receta?`)) return
    try {
      await api.eliminarReceta(item.id)
      if (productoSeleccionado) cargarRecetas(productoSeleccionado.id)
      cargarDatos()
    } catch {
      window.alert('Error al eliminar.')
    }
  }

  return {
    productos,
    recetas,
    componentes,
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
  }
}
