import { useState } from 'react'
import { api } from '../api.js'
import { CONTENEDORES, MATERIALES, PRECIO_BASE } from '../datos/cotizador.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useCotizador() {
  const [contenedor, setContenedor] = useState('chico')
  const [material, setMaterial] = useState('plastico')
  const [cantidad, setCantidad] = useState(1)
  const [correo, setCorreo] = useState('')
  const [mostrarCorreo, setMostrarCorreo] = useState(false)
  const [mensaje, setMensaje] = useState(null)
  const [enviando, setEnviando] = useState(false)

  const cantidadNum = Math.min(10, Math.max(1, Math.trunc(Number(cantidad)) || 1))
  const total = (PRECIO_BASE + CONTENEDORES[contenedor] + MATERIALES[material]) * cantidadNum

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

  async function enviar() {
    if (!EMAIL_RE.test(correo.trim())) {
      setMensaje({ tipo: 'danger', texto: 'Ingresa un correo electrónico válido.' })
      return
    }

    setEnviando(true)
    setMensaje(null)

    try {
      const respuesta = await api.enviarCotizacion({
        correo: correo.trim(),
        contenedor,
        material,
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
      setMensaje({ tipo: 'danger', texto: error.message })
    } finally {
      setEnviando(false)
    }
  }

  return {
    contenedor,
    setContenedor,
    material,
    setMaterial,
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
