import { useEffect, useState } from 'react'
import { api } from '../api.js'

const VACIO = {
  usuarios: { total: 0, admins: 0, clientes: 0, verificados: 0, activos: 0 },
  sesiones: { total: 0, porUsuario: [] },
  inventario: {
    productos: { total: 0, stockTotal: 0, enProceso: 0, terminados: 0 },
    componentes: { total: 0, stockTotal: 0 },
    unidadesFabricadas: 0,
    unidadesTerminadas: 0,
    unidadesPendientes: 0,
  },
  ventas: {
    dispositivosRegistrados: 0,
    dispositivosActivos: 0,
    dispensacionesEjecutadas: 0,
    comidaTotalGramos: 0,
  },
  general: { mascotas: 0, horarios: 0, opiniones: 0, calificacionPromedio: 0 },
}

export function useDashboardAdmin() {
  const [datos, setDatos] = useState(VACIO)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(false)
  const [mensajeError, setMensajeError] = useState('')
  const [filtroSesion, setFiltroSesion] = useState('')

  useEffect(() => {
    let activo = true
    api
      .getDashboardAdmin()
      .then((data) => {
        if (!activo) return
        setDatos({
          usuarios: data.usuarios ?? VACIO.usuarios,
          sesiones: data.sesiones ?? VACIO.sesiones,
          inventario: data.inventario ?? VACIO.inventario,
          ventas: data.ventas ?? VACIO.ventas,
          general: data.general ?? VACIO.general,
        })
        setCargando(false)
      })
      .catch((err) => {
        if (!activo) return
        setMensajeError(
          `No se pudieron cargar los datos (${err?.status ?? 'sin respuesta'}). Verifica la conexión con la API.`,
        )
        setError(true)
        setCargando(false)
      })
    return () => {
      activo = false
    }
  }, [])

  const filtro = filtroSesion.trim().toLowerCase()
  const sesionesFiltradas = filtro
    ? datos.sesiones.porUsuario.filter(
        (s) => s.nombre?.toLowerCase().includes(filtro) || s.email?.toLowerCase().includes(filtro),
      )
    : datos.sesiones.porUsuario

  const maxProduccion = Math.max(
    1,
    datos.inventario.unidadesFabricadas,
    datos.inventario.unidadesTerminadas,
    datos.inventario.unidadesPendientes,
  )
  const maxStock = Math.max(1, datos.inventario.productos.stockTotal, datos.inventario.componentes.stockTotal)
  const pctClientes =
    datos.usuarios.total > 0 ? Math.round((datos.usuarios.clientes / datos.usuarios.total) * 100) : 0
  const pctAdmins = datos.usuarios.total > 0 ? 100 - pctClientes : 0
  const pctVerificados =
    datos.usuarios.total > 0 ? Math.round((datos.usuarios.verificados / datos.usuarios.total) * 100) : 0
  const pctActivos =
    datos.usuarios.total > 0 ? Math.round((datos.usuarios.activos / datos.usuarios.total) * 100) : 0

  return {
    ...datos,
    cargando,
    error,
    mensajeError,
    filtroSesion,
    setFiltroSesion,
    sesionesFiltradas,
    maxProduccion,
    maxStock,
    pctClientes,
    pctAdmins,
    pctVerificados,
    pctActivos,
  }
}
