import { useCallback, useEffect, useRef, useState } from 'react'
import { api } from '../api.js'

export function useAdminUsuarios() {
  const [usuarios, setUsuarios] = useState([])
  const [dispensadores, setDispensadores] = useState([])
  const [cargando, setCargando] = useState(true)
  const [mensaje, setMensaje] = useState('')
  const [tipoMensaje, setTipoMensaje] = useState('ok')
  const temporizador = useRef(null)

  useEffect(() => () => clearTimeout(temporizador.current), [])

  const notificar = useCallback((ok, texto) => {
    setMensaje(texto)
    setTipoMensaje(ok ? 'ok' : 'error')
    clearTimeout(temporizador.current)
    temporizador.current = setTimeout(() => setMensaje(''), 4000)
  }, [])

  const cargarUsuarios = useCallback(async () => {
    setCargando(true)
    try {
      const data = await api.getUsuarios()
      setUsuarios(
        (Array.isArray(data) ? data : []).map((usuario) => ({
          id: usuario.id,
          nombre: usuario.nombre,
          correo: usuario.email,
          rol: usuario.rol,
          verificado: usuario.verificado,
          estado: usuario.activo ? 'Activo' : 'Inactivo',
          actuando: false,
        })),
      )
      setCargando(false)
    } catch {
      setUsuarios([])
      setCargando(false)
      notificar(false, 'No se pudieron cargar los usuarios. Revisa tu conexión a la API.')
    }
  }, [notificar])

  const cargarDispensadores = useCallback(async () => {
    try {
      const data = await api.getDispensadores()
      setDispensadores(Array.isArray(data) ? data : [])
    } catch {
      // Silencioso, igual que Angular.
    }
  }, [])

  useEffect(() => {
    cargarUsuarios()
    cargarDispensadores()
  }, [cargarUsuarios, cargarDispensadores])

  const marcarActuando = (id, valor) =>
    setUsuarios((prev) => prev.map((u) => (u.id === id ? { ...u, actuando: valor } : u)))

  const verificar = async (user) => {
    if (!window.confirm(`¿Verificar la cuenta de ${user.nombre}?`)) return
    marcarActuando(user.id, true)
    try {
      const resp = await api.verificarCuenta(user.id)
      setUsuarios((prev) => prev.map((u) => (u.id === user.id ? { ...u, verificado: true, actuando: false } : u)))
      notificar(true, resp?.mensaje ?? 'Cuenta verificada.')
    } catch {
      marcarActuando(user.id, false)
      notificar(false, 'No se pudo verificar la cuenta.')
    }
  }

  const cambiarRol = async (user) => {
    const esAdmin = user.rol === 'admin'
    const accion = esAdmin ? 'quitar los privilegios de administrador' : 'convertir en administrador'
    if (!window.confirm(`¿Seguro que deseas ${accion} a ${user.nombre}?`)) return

    const nuevoRol = esAdmin ? 'cliente' : 'admin'
    marcarActuando(user.id, true)
    try {
      const resp = await api.cambiarRol(user.id, nuevoRol)
      setUsuarios((prev) =>
        prev.map((u) => (u.id === user.id ? { ...u, rol: nuevoRol, actuando: false } : u)),
      )
      notificar(true, resp?.mensaje ?? 'Rol actualizado.')
    } catch {
      marcarActuando(user.id, false)
      notificar(false, 'No se pudo cambiar el rol.')
    }
  }

  const darDeBaja = async (user) => {
    const nuevoEstado = user.estado !== 'Activo'
    const accion = nuevoEstado ? 'activar' : 'suspender'
    if (!window.confirm(`¿Deseas ${accion} la cuenta de ${user.nombre}?`)) return

    marcarActuando(user.id, true)
    try {
      await api.actualizarEstado(user.id, nuevoEstado)
      setUsuarios((prev) =>
        prev.map((u) =>
          u.id === user.id ? { ...u, estado: nuevoEstado ? 'Activo' : 'Inactivo', actuando: false } : u,
        ),
      )
      notificar(true, nuevoEstado ? 'Cuenta activada.' : 'Cuenta suspendida.')
    } catch {
      marcarActuando(user.id, false)
      notificar(false, 'No se pudo actualizar el estado.')
    }
  }

  return {
    usuarios,
    dispensadores,
    cargando,
    mensaje,
    tipoMensaje,
    verificadosCount: usuarios.filter((u) => u.verificado).length,
    cargarUsuarios,
    verificar,
    cambiarRol,
    darDeBaja,
  }
}
