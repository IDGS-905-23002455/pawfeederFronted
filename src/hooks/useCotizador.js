import { useState } from 'react'
import { api } from '../api.js'
import { MODELO, PRECIO_BASE, PRECIO_CAMARA } from '../datos/cotizador.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useCotizador() {
  const [incluyeCamara, setIncluyeCamara] = useState(false)
  const [cantidad, setCantidad] = useState(1)
  const [correo, setCorreo] = useState('')
  const [mostrarCorreo, setMostrarCorreo] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const cantidadNum = Math.min(10, Math.max(1, Math.trunc(Number(cantidad)) || 1))
  const total = (PRECIO_BASE + (incluyeCamara ? PRECIO_CAMARA : 0)) * cantidadNum

  function cambiarCantidad(e) {
    const valor = e.target.value
    if (valor === '') {
      setCantidad('')
      return
    }

    const numero = Math.trunc(Number(valor))
    if (Number.isNaN(numero)) return
    setCantidad(String(Math.min(10, Math.max(1, numero))))
  }

  function abrirMailto(correoDestino) {
    const asunto = encodeURIComponent('Cotización PawFeeder')
    const cuerpo = encodeURIComponent(
      `Hola,\n\nSolicito cotización PawFeeder:\n\n` +
        `- Modelo: ${MODELO}\n` +
        `- Cámara de monitoreo: ${incluyeCamara ? 'Sí (+$350 MXN)' : 'No'}\n` +
        `- Cantidad: ${cantidadNum}\n` +
        `- Total estimado: $${total} MXN\n\n` +
        `Correo de contacto: ${correoDestino}\n`,
    )
    window.location.href = `mailto:ganzalezpao11@gmail.com?subject=${asunto}&body=${cuerpo}`
  }

  async function enviar() {
    const correoLimpio = correo.trim()
    if (!EMAIL_RE.test(correoLimpio)) {
      setMensaje({ tipo: 'danger', texto: 'Ingresa un correo electrónico válido.' })
      return
    }

    setEnviando(true)
    setMensaje(null)

    try {
      const respuesta = await api.enviarCotizacion({
        correo: correoLimpio,
        contenedor: 'grande',
        material: 'premium',
        cantidad: cantidadNum,
        total,
      })
      setMensaje({
        tipo: 'success',
        texto: respuesta?.mensaje ?? 'La cotización fue enviada correctamente.',
      })
      setCorreo('')
      setMostrarCorreo(false)
    } catch (error) {
      const texto = error.message || 'No se pudo enviar por correo automático.'
      setMensaje({
        tipo: 'warning',
        texto: `${texto} Puedes enviarla manualmente por correo.`,
      })
      abrirMailto(correoLimpio)
    } finally {
      setEnviando(false)
    }
  }

  return {
    incluyeCamara,
    setIncluyeCamara,
    cantidad,
    cambiarCantidad,
    ajustarCantidad: () => setCantidad(String(cantidadNum)),
    correo,
    setCorreo,
    mostrarCorreo,
    setMostrarCorreo,
    mensaje,
    enviando,
    total,
    cantidadNum,
    enviar,
  }
}
