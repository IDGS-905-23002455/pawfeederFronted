import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import { useSesion } from './useSesion.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function usePerfil() {
  const { usuario, actualizarUsuario } = useSesion()
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [cargando, setCargando] = useState(true)
  const [guardando, setGuardando] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [exitoMsg, setExitoMsg] = useState('')

  const rol = usuario?.rol ?? 'cliente'

  useEffect(() => {
    let activo = true
    if (!usuario) {
      setCargando(false)
      return () => {
        activo = false
      }
    }

    setForm({ nombre: '', email: usuario.email ?? '', telefono: '' })
    api
      .getUsuario(usuario.id)
      .then((data) => {
        if (!activo) return
        setForm({
          nombre: data.nombre ?? '',
          email: data.email ?? '',
          telefono: data.telefono ?? '',
        })
        setCargando(false)
      })
      .catch(() => {
        if (!activo) return
        setForm((prev) => ({ ...prev, nombre: usuario.nombre ?? '' }))
        setCargando(false)
        setErrorMsg('No se pudo cargar tu perfil desde el servidor.')
      })
    return () => {
      activo = false
    }
  }, [usuario])

  const cambiar = useCallback((campo, valor) => {
    setForm((prev) => ({ ...prev, [campo]: valor }))
  }, [])

  const valido =
    form.nombre !== '' && form.telefono !== '' && form.email !== '' && EMAIL.test(form.email)

  const guardarPerfil = async (evento) => {
    evento.preventDefault()
    if (!valido || !usuario) return

    setGuardando(true)
    setErrorMsg('')
    setExitoMsg('')

    try {
      await api.actualizarPerfil(usuario.id, form.nombre, form.telefono)
      setGuardando(false)
      setExitoMsg('Perfil actualizado correctamente.')
      actualizarUsuario({ nombre: form.nombre })
    } catch (err) {
      setGuardando(false)
      setErrorMsg(err?.body?.mensaje ?? 'No se pudo actualizar el perfil. Intenta de nuevo.')
    }
  }

  return { form, cargando, guardando, errorMsg, exitoMsg, rol, valido, cambiar, guardarPerfil }
}
