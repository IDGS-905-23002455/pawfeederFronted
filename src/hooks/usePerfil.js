import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import { useSesion } from './useSesion.js'

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function redimensionarImagen(file, max = 320, calidad = 0.82) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('No se pudo leer la imagen.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('El archivo no es una imagen válida.'))
      img.onload = () => {
        const escala = Math.min(1, max / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.max(1, Math.round(img.width * escala))
        canvas.height = Math.max(1, Math.round(img.height * escala))
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', calidad))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}

export function usePerfil() {
  const { usuario, actualizarUsuario } = useSesion()
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', fotoUrl: '' })
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

    setForm({ nombre: '', email: usuario.email ?? '', telefono: '', fotoUrl: usuario.fotoUrl ?? '' })
    api
      .getUsuario(usuario.id)
      .then((data) => {
        if (!activo) return
        setForm({
          nombre: data.nombre ?? '',
          email: data.email ?? '',
          telefono: data.telefono ?? '',
          fotoUrl: data.fotoUrl ?? '',
        })
        setCargando(false)
      })
      .catch(() => {
        if (!activo) return
        setForm((prev) => ({ ...prev, nombre: usuario.nombre ?? '', fotoUrl: usuario.fotoUrl ?? '' }))
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

  const cambiarFoto = useCallback(async (evento) => {
    const file = evento.target.files?.[0]
    evento.target.value = ''
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setErrorMsg('Selecciona un archivo de imagen válido.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('La imagen debe pesar máximo 5 MB.')
      return
    }
    try {
      setErrorMsg('')
      const dataUrl = await redimensionarImagen(file)
      setForm((prev) => ({ ...prev, fotoUrl: dataUrl }))
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo procesar la imagen.')
    }
  }, [])

  const quitarFoto = useCallback(() => {
    setForm((prev) => ({ ...prev, fotoUrl: '' }))
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
      await api.actualizarPerfil(usuario.id, form.nombre, form.telefono, form.fotoUrl || null)
      setGuardando(false)
      setExitoMsg('Perfil actualizado correctamente.')
      actualizarUsuario({ nombre: form.nombre, fotoUrl: form.fotoUrl || null })
    } catch (err) {
      setGuardando(false)
      setErrorMsg(err?.body?.mensaje ?? err?.body ?? 'No se pudo actualizar el perfil. Intenta de nuevo.')
    }
  }

  return { form, cargando, guardando, errorMsg, exitoMsg, rol, valido, cambiar, cambiarFoto, quitarFoto, guardarPerfil }
}
