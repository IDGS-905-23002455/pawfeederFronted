import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import { leerCompras } from '../datos/compras.js'
import { useSesion } from './useSesion.js'

const VACIO = {
  mascotas: { total: 0, activas: 0, lista: [] },
  horarios: { total: 0, activos: 0, lista: [] },
  comida: { semanaGramos: 0, hoyGramos: 0, totalDispensaciones: 0, dispensacionesHoy: 0 },
  comida7Dias: [],
  dispensadores: [],
  sesiones: { total: 0, web: 0, app: 0 },
  notificaciones: { noLeidas: 0 },
}

export function useDashboardCliente() {
  const { usuario } = useSesion()
  const [datos, setDatos] = useState(VACIO)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [comprasCount, setComprasCount] = useState(0)

  const cargar = useCallback(async (actual) => {
    setCargando(true)
    setError(false)
    setMensajeError('')
    setComprasCount(leerCompras(actual.id).reduce((acc, c) => acc + (c.cantidad || 0), 0))

    try {
      const data = await api.getDashboardCliente(actual.id)
      setDatos((prev) => ({
        ...prev,
        mascotas: data.mascotas ?? VACIO.mascotas,
        horarios: data.horarios ?? VACIO.horarios,
        comida: data.comida ?? VACIO.comida,
        dispensadores: data.dispensadores ?? [],
        sesiones: data.sesiones ?? VACIO.sesiones,
        notificaciones: data.notificaciones ?? VACIO.notificaciones,
      }))
      setCargando(false)
    } catch (err) {
      setMensajeError(
        `No se pudieron cargar los datos (${err?.status ?? 'sin respuesta'}). Verifica la conexión con la API.`,
      )
      setError(true)
      setCargando(false)
    }

    try {
      const dias = await api.getComida7Dias(actual.id)
      setDatos((prev) => ({ ...prev, comida7Dias: Array.isArray(dias) ? dias : [] }))
    } catch {
      // El gráfico de 7 días es opcional; se mantiene vacío si falla.
    }
  }, [])

  useEffect(() => {
    if (!usuario) return
    cargar(usuario)
  }, [usuario, cargar])

  const maxComidaSemana = Math.max(1, ...datos.comida7Dias.map((d) => d.gramos ?? 0))
  const barraComida = (d) => ((d.gramos ?? 0) / maxComidaSemana) * 100

  return {
    usuarioNombre: usuario?.nombre ?? '',
    comprasCount,
    ...datos,
    cargando,
    error,
    mensajeError,
    barraComida,
  }
}
