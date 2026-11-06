import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'

const FORMULARIO_VACIO = {
  nombreUsuario: '',
  detallesMascota: '',
  calificacion: 5,
  comentario: '',
}

export function useOpiniones() {
  const [opiniones, setOpiniones] = useState([])
  const [cargando, setCargando] = useState(true)
  const [errorCarga, setErrorCarga] = useState('')
  const [form, setForm] = useState(FORMULARIO_VACIO)
  const [tocado, setTocado] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [mensaje, setMensaje] = useState(null)

  const cargar = useCallback(async () => {
    try {
      const datos = await api.getOpiniones()
      setOpiniones(datos)
      setErrorCarga('')
    } catch (error) {
      setErrorCarga(error.message)
    } finally {
      setCargando(false)
    }
  }, [])

  // Carga inicial desde la API: sincronizar con un sistema externo es el uso previsto de un efecto.
  useEffect(() => {
    cargar()
  }, [cargar])

  function recargar() {
    setCargando(true)
    cargar()
  }

  const cambiar = (campo) => (e) => {
    const valor = e.target.value
    setForm({ ...form, [campo]: campo === 'calificacion' ? Number(valor) : valor })
    setMensaje(null)
  }

  const marcar = (campo) => () => setTocado({ ...tocado, [campo]: true })

  const errores = {
    nombreUsuario: form.nombreUsuario.trim() ? '' : 'Escribe tu nombre.',
    detallesMascota: form.detallesMascota.trim() ? '' : 'Cuéntanos de tu mascota.',
    comentario: form.comentario.trim()
      ? form.comentario.length > 300
        ? 'Máximo 300 caracteres.'
        : ''
      : 'Escribe un comentario.',
  }

  const valido = Object.values(errores).every((e) => !e)
  const error = (campo) => (tocado[campo] && errores[campo] ? errores[campo] : '')

  async function enviar(e) {
    e.preventDefault()
    setTocado({ nombreUsuario: true, detallesMascota: true, comentario: true })

    if (!valido) return

    setEnviando(true)
    setMensaje(null)

    try {
      await api.crearOpinion({
        nombreUsuario: form.nombreUsuario.trim(),
        detallesMascota: form.detallesMascota.trim(),
        calificacion: Number(form.calificacion),
        comentario: form.comentario.trim(),
        fecha: new Date().toLocaleDateString('es-MX'),
      })
      setForm(FORMULARIO_VACIO)
      setTocado({})
      setMensaje({ tipo: 'success', texto: '¡Gracias! Tu comentario fue publicado.' })
      await cargar()
    } catch (error) {
      setMensaje({ tipo: 'danger', texto: error.message })
    } finally {
      setEnviando(false)
    }
  }

  return {
    opiniones,
    cargando,
    errorCarga,
    form,
    cambiar,
    marcar,
    error,
    enviando,
    mensaje,
    enviar,
    recargar,
  }
}
