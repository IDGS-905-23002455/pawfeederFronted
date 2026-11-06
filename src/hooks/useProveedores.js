import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

const TELEFONO = /^[0-9]*$/
const CORREO = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

const validar = (datos) =>
  !!datos.nombre?.trim() &&
  TELEFONO.test(datos.telefono ?? '') &&
  (datos.correo ? CORREO.test(datos.correo) : true)

export function useProveedores() {
  const [proveedores, setProveedores] = useState([])
  const [cargando, setCargando] = useState(false)
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false)
  const [nuevo, setNuevo] = useState({})
  const [tocadosNuevo, setTocadosNuevo] = useState({})
  const [editandoItem, setEditandoItem] = useState(null)
  const [tocadosEdicion, setTocadosEdicion] = useState({})

  const cargarProveedores = useCallback(async () => {
    setCargando(true)
    try {
      const data = await api.getProveedores()
      setProveedores([...(Array.isArray(data) ? data : [])])
    } catch {
      // Angular no muestra mensaje al cargar.
    } finally {
      setCargando(false)
    }
  }, [])

  useEffect(() => {
    cargarProveedores()
  }, [cargarProveedores])

  const alternarFormulario = () => {
    setMostrandoFormulario((prev) => !prev)
    setNuevo({})
    setTocadosNuevo({})
  }

  const cambiarNuevo = (campo, valor) => setNuevo((prev) => ({ ...prev, [campo]: valor }))
  const tocarNuevo = (campo) => setTocadosNuevo((prev) => ({ ...prev, [campo]: true }))

  const cambiarEdicion = (campo, valor) =>
    setEditandoItem((prev) => ({ ...prev, [campo]: valor }))
  const tocarEdicion = (campo) => setTocadosEdicion((prev) => ({ ...prev, [campo]: true }))

  const validoNuevo = validar(nuevo)
  const validoEdicion = editandoItem ? validar(editandoItem) : false

  const guardar = async (evento) => {
    evento.preventDefault()
    if (!validoNuevo) return

    const { nombre, contacto, telefono, correo, direccion } = nuevo
    const payload = { nombre: nombre.trim(), contacto, telefono, correo, direccion, activo: true }

    try {
      await api.crearProveedor(payload)
      setNuevo({})
      setMostrandoFormulario(false)
      cargarProveedores()
    } catch (err) {
      const msj = typeof err?.body === 'string' ? err.body : 'Error al guardar.'
      window.alert(msj)
    }
  }

  const iniciarEdicion = (proveedor) => {
    setEditandoItem({ ...proveedor })
    setTocadosEdicion({})
  }

  const cancelarEdicion = () => {
    setEditandoItem(null)
    setTocadosEdicion({})
  }

  const guardarEdicion = async (evento) => {
    evento.preventDefault()
    if (!editandoItem || !validoEdicion) return

    try {
      await api.actualizarProveedor(editandoItem.id, editandoItem)
      setEditandoItem(null)
      cargarProveedores()
    } catch {
      window.alert('Error al actualizar.')
    }
  }

  const eliminar = async (proveedor) => {
    if (!window.confirm(`¿Eliminar proveedor '${proveedor.nombre}'?`)) return
    try {
      await api.eliminarProveedor(proveedor.id)
      cargarProveedores()
    } catch {
      window.alert('Error al eliminar.')
    }
  }

  return {
    proveedores,
    cargando,
    mostrandoFormulario,
    nuevo,
    tocadosNuevo,
    editandoItem,
    tocadosEdicion,
    validoNuevo,
    validoEdicion,
    cargarProveedores,
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
  }
}
