import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

export function useInventarioDispensadores() {
  const [productos, setProductos] = useState([])
  const [unidades, setUnidades] = useState([])
  const [totalTerminados, setTotalTerminados] = useState(0)
  const [cargando, setCargando] = useState(false)
  const [nuevoNombre, setNuevoNombre] = useState('')

  const cargarProductos = useCallback(async () => {
    try {
      const data = await api.getProductos()
      setProductos([...(Array.isArray(data) ? data : [])])
    } catch {
      // Silencioso, igual que Angular.
    }
  }, [])

  const cargarUnidades = useCallback(async () => {
    try {
      const data = await api.getDispensadoresInventario()
      setUnidades([...(Array.isArray(data) ? data : [])])
    } catch {
      // Silencioso, igual que Angular.
    }
  }, [])

  const cargarConteo = useCallback(async () => {
    try {
      const data = await api.getConteoTerminados()
      setTotalTerminados(data?.total ?? 0)
    } catch {
      // Silencioso, igual que Angular.
    }
  }, [])

  const cargarTodo = useCallback(() => {
    cargarProductos()
    cargarUnidades()
    cargarConteo()
  }, [cargarProductos, cargarUnidades, cargarConteo])

  useEffect(() => {
    cargarTodo()
  }, [cargarTodo])

  const registrarProducto = async (evento) => {
    evento.preventDefault()
    const nombre = nuevoNombre?.trim()

    if (!nombre) {
      window.alert('Por favor ingresa el nombre del dispensador.')
      return
    }
    if (/^\d+$/.test(nombre)) {
      window.alert('El nombre debe contener letras, no solo números.')
      return
    }
    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombre)) {
      window.alert('El nombre debe incluir al menos una letra.')
      return
    }

    setCargando(true)
    try {
      await api.crearProducto({ nombre, stock: 0 })
      window.alert(`¡Dispensador '${nombre}' registrado!`)
      setNuevoNombre('')
      cargarTodo()
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : 'Error al registrar.'
      window.alert(msj)
      setCargando(false)
    }
  }

  const fabricarDispensador = async (productoId, nombre) => {
    if (!window.confirm(`¿Fabricar 1 dispensador "${nombre}"?\nSe descontarán los componentes del hardware.`)) return

    setCargando(true)
    try {
      const res = await api.fabricarDispensador(productoId)
      window.alert(res?.mensaje || '¡Dispensador fabricado!')
      cargarTodo()
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : 'No hay suficiente stock de componentes.'
      window.alert(`Error: ${msj}`)
      setCargando(false)
    }
  }

  const cambiarEstadoUnidad = async (dispensadorId, nuevoEstado) => {
    try {
      await api.actualizarEstadoDispensador(dispensadorId, nuevoEstado)
      setUnidades((prev) => prev.map((u) => (u.id === dispensadorId ? { ...u, estado: nuevoEstado } : u)))
      cargarConteo()
    } catch {
      window.alert('No se pudo actualizar el estado.')
    }
  }

  return {
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
  }
}
