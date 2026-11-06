import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import {
  CATALOGO_BASE,
  enriquecerCatalogo,
  guardarReview,
  leerCompras,
  registrarCompra,
} from '../datos/compras.js'
import { useSesion } from './useSesion.js'

export function useMisCompras() {
  const { usuario } = useSesion()
  const [catalogo, setCatalogo] = useState([])
  const [cargandoCatalogo, setCargandoCatalogo] = useState(true)
  const [errorCatalogo, setErrorCatalogo] = useState(false)
  const [compras, setCompras] = useState([])
  const [compraEnReviewId, setCompraEnReviewId] = useState(null)
  const [reviewCalificacion, setReviewCalificacion] = useState(5)
  const [reviewComentario, setReviewComentario] = useState('')
  const [enviandoReview, setEnviandoReview] = useState(false)
  const [reviewError, setReviewError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const [mensajeError, setMensajeError] = useState('')

  const usuarioNombre = usuario?.nombre ?? ''
  const compraEnReview = compras.find((c) => c.id === compraEnReviewId) ?? null
  const comprasPendientes = compras.filter((c) => !c.review)

  const cargarCompras = useCallback(
    (usuarioId) => {
      const lista = leerCompras(usuarioId)
      setCompras(lista)

      const pendientes = lista.filter((c) => !c.review)
      if (pendientes.length === 0) {
        setCompraEnReviewId(null)
        return
      }

      setCompraEnReviewId((prev) => {
        if (prev !== null && lista.some((c) => c.id === prev)) return prev
        setReviewCalificacion(5)
        setReviewComentario('')
        setReviewError('')
        return pendientes[0].id
      })
    },
    [],
  )

  useEffect(() => {
    if (!usuario) return
    cargarCompras(usuario.id)

    let activo = true
    api
      .getProductos()
      .then((productos) => {
        if (!activo) return
        setCatalogo(enriquecerCatalogo(productos))
        setCargandoCatalogo(false)
      })
      .catch(() => {
        if (!activo) return
        setCatalogo(CATALOGO_BASE)
        setCargandoCatalogo(false)
        setErrorCatalogo(true)
      })

    return () => {
      activo = false
    }
  }, [usuario, cargarCompras])

  const seleccionarCompra = (compra) => {
    setCompraEnReviewId(compra.id)
    setReviewCalificacion(5)
    setReviewComentario('')
    setReviewError('')
  }

  const onSelectProducto = (valor) => {
    const id = Number(valor)
    const compra = compras.find((c) => c.id === id)
    if (compra) seleccionarCompra(compra)
  }

  const comprar = (producto) => {
    if (!usuario) return
    registrarCompra(usuario.id, producto)
    cargarCompras(usuario.id)
    setMensajeError('')
    setMensajeExito(`Compra de "${producto.nombre}" registrada correctamente.`)
    document.getElementById('mis-compras')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const abrirReview = (compra) => {
    seleccionarCompra(compra)
    document.getElementById('dejar-opinion')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const enviarReview = async () => {
    if (!compraEnReview || !usuario) return

    const comentario = reviewComentario.trim()
    if (!comentario) {
      setReviewError('Escribe un comentario sobre el producto antes de publicar.')
      return
    }
    if (comentario.length > 300) {
      setReviewError('El comentario no puede superar los 300 caracteres.')
      return
    }

    const compra = compraEnReview
    const opinion = {
      nombreUsuario,
      detallesMascota: `Producto: ${compra.nombreProducto}`,
      calificacion: reviewCalificacion,
      comentario,
      fecha: new Date().toLocaleDateString('es-MX'),
    }

    setEnviandoReview(true)
    setReviewError('')

    try {
      await api.crearOpinion(opinion)
      guardarReview(usuario.id, compra.id, {
        calificacion: reviewCalificacion,
        comentario,
        fecha: opinion.fecha,
      })
      setEnviandoReview(false)
      setCompraEnReviewId(null)
      cargarCompras(usuario.id)
      setMensajeExito(
        `¡Gracias! Tu opinión sobre "${compra.nombreProducto}" fue publicada en la sección de Comentarios.`,
      )
    } catch (err) {
      setEnviandoReview(false)
      setReviewError(`No se pudo publicar la opinión (${err?.status ?? 'sin respuesta'}). Intenta de nuevo.`)
    }
  }

  const tieneReview = (compra) => !!compra.review

  return {
    usuarioNombre,
    catalogo,
    cargandoCatalogo,
    errorCatalogo,
    compras,
    compraEnReview,
    compraEnReviewId,
    reviewCalificacion,
    setReviewCalificacion,
    reviewComentario,
    setReviewComentario,
    enviandoReview,
    reviewError,
    mensajeExito,
    mensajeError,
    comprasPendientes,
    totalCompras: compras.reduce((acc, c) => acc + c.cantidad, 0),
    totalInvertido: compras.reduce((acc, c) => acc + c.precio * c.cantidad, 0),
    pendientesOpinion: compras.filter((c) => !c.review).length,
    comprar,
    abrirReview,
    enviarReview,
    onSelectProducto,
    tieneReview,
  }
}
