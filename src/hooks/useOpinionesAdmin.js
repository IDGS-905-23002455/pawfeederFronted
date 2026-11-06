import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

const ESTADOS_VALIDOS = ['Nuevo', 'En revisión', 'Resuelto']
const OPCIONES_ESTADO = ['Todos', ...ESTADOS_VALIDOS]

const estadoDe = (op) => op.estado || 'Nuevo'

const badgeClase = (estado) => {
  switch (estado || 'Nuevo') {
    case 'Nuevo':
      return 'text-bg-danger'
    case 'En revisión':
      return 'text-bg-warning'
    case 'Resuelto':
      return 'text-bg-success'
    default:
      return 'text-bg-secondary'
  }
}

export function useOpinionesAdmin() {
  const [opiniones, setOpiniones] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [filtroEstado, setFiltroEstado] = useState('Todos')
  const [busqueda, setBusqueda] = useState('')
  const [editando, setEditando] = useState(null)
  const [editEstado, setEditEstado] = useState('Nuevo')
  const [editRespuesta, setEditRespuesta] = useState('')
  const [guardando, setGuardando] = useState(false)

  const cargarOpiniones = useCallback(async () => {
    setCargando(true)
    try {
      const data = await api.getOpiniones()
      setOpiniones(Array.isArray(data) ? data : [])
      setCargando(false)
    } catch (err) {
      setCargando(false)
      setError(true)
      setMensajeError(
        `No se pudieron cargar los comentarios (${err?.status ?? 'sin respuesta'}). Verifica la conexión con la API.`,
      )
    }
  }, [])

  useEffect(() => {
    cargarOpiniones()
  }, [cargarOpiniones])

  const q = busqueda.trim().toLowerCase()
  const opinionesFiltradas = opiniones.filter((o) => {
    if (filtroEstado !== 'Todos' && estadoDe(o) !== filtroEstado) return false
    if (!q) return true
    const texto = `${o.nombreUsuario} ${o.detallesMascota} ${o.comentario} ${o.respuestaAdmin ?? ''}`.toLowerCase()
    return texto.includes(q)
  })

  const total = opiniones.length
  const totales = {
    total,
    nuevos: opiniones.filter((o) => estadoDe(o) === 'Nuevo').length,
    enRevision: opiniones.filter((o) => estadoDe(o) === 'En revisión').length,
    resueltos: opiniones.filter((o) => estadoDe(o) === 'Resuelto').length,
    calif: (total > 0 ? opiniones.reduce((s, o) => s + o.calificacion, 0) / total : 0).toFixed(1),
  }

  const iniciarEdicion = (op) => {
    setEditando({ ...op })
    setEditEstado(estadoDe(op))
    setEditRespuesta(op.respuestaAdmin || '')
  }

  const cancelarEdicion = () => {
    setEditando(null)
    setEditRespuesta('')
    setEditEstado('Nuevo')
  }

  const guardarSeguimiento = async () => {
    if (!editando || !editando.id) return
    if (!ESTADOS_VALIDOS.includes(editEstado)) {
      window.alert('Selecciona un estado válido.')
      return
    }

    setGuardando(true)
    try {
      await api.actualizarOpinion(editando.id, {
        estado: editEstado,
        respuestaAdmin: editRespuesta.trim(),
      })
      setGuardando(false)
      cargarOpiniones()
      cancelarEdicion()
    } catch {
      setGuardando(false)
      window.alert('No se pudo guardar el seguimiento. Revisa la conexión con la API.')
    }
  }

  const eliminar = async (op) => {
    if (!op.id) return
    if (!window.confirm(`¿Eliminar el comentario de ${op.nombreUsuario}? Esta acción no se puede deshacer.`)) return
    try {
      await api.eliminarOpinion(op.id)
      cargarOpiniones()
    } catch {
      window.alert('No se pudo eliminar el comentario.')
    }
  }

  const obtenerEstrellas = (calificacion) => Array(calificacion).fill(0)
  const obtenerEstrellasVacias = (calificacion) => Array(Math.max(0, 5 - calificacion)).fill(0)

  return {
    opiniones,
    cargando,
    error,
    setError,
    mensajeError,
    opcionesEstado: OPCIONES_ESTADO,
    filtroEstado,
    setFiltroEstado,
    busqueda,
    setBusqueda,
    editando,
    editEstado,
    setEditEstado,
    editRespuesta,
    setEditRespuesta,
    guardando,
    opinionesFiltradas,
    totales,
    estadoDe,
    badgeClase,
    cargarOpiniones,
    iniciarEdicion,
    cancelarEdicion,
    guardarSeguimiento,
    eliminar,
    obtenerEstrellas,
    obtenerEstrellasVacias,
    estadosEdicion: ESTADOS_VALIDOS,
  }
}
