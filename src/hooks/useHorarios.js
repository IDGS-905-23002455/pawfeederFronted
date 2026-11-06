import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import { useSesion } from './useSesion.js'

const HORA = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/
const ENTERO = /^[0-9]+$/

const FORM_VACIO = {
  nombre: '',
  hora: '',
  porcionGramos: '100',
  icono: 'sun',
  mascotaId: '',
  lunes: false,
  martes: false,
  miercoles: false,
  jueves: false,
  viernes: false,
  sabado: false,
  domingo: false,
}

const DIAS = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo']

export function useHorarios() {
  const { usuario } = useSesion()
  const [listaHorarios, setListaHorarios] = useState([])
  const [listaMascotas, setListaMascotas] = useState([])
  const [horarioEnEdicionId, setHorarioEnEdicionId] = useState(null)
  const [form, setForm] = useState(FORM_VACIO)
  const [tocados, setTocados] = useState({ hora: false, porcionGramos: false })
  const [cargando, setCargando] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const cargarHorarios = useCallback(async (usuarioId) => {
    setCargando(true)
    setErrorMsg('')
    try {
      const data = await api.getHorarios(usuarioId)
      setListaHorarios(Array.isArray(data) ? data : [])
      setCargando(false)
    } catch {
      setCargando(false)
      setErrorMsg('No se pudieron cargar tus horarios. Verifica tu conexión e intenta de nuevo.')
    }
  }, [])

  const cargarMascotas = useCallback(async (usuarioId) => {
    try {
      const data = await api.getMascotas(usuarioId)
      setListaMascotas((Array.isArray(data) ? data : []).filter((m) => m.nombre))
    } catch {
      // Angular solo registra el error en consola.
    }
  }, [])

  useEffect(() => {
    if (!usuario) {
      setCargando(false)
      return
    }
    cargarHorarios(usuario.id)
    cargarMascotas(usuario.id)
  }, [usuario, cargarHorarios, cargarMascotas])

  const cambiar = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }))

  const tocar = (campo) => setTocados((prev) => ({ ...prev, [campo]: true }))

  const horaValida = HORA.test(form.hora)
  const porcionValida =
    ENTERO.test(String(form.porcionGramos)) &&
    Number(form.porcionGramos) >= 1 &&
    Number(form.porcionGramos) <= 9999
  const valido = form.nombre !== '' && horaValida && porcionValida

  const limpiarFormulario = () => {
    setHorarioEnEdicionId(null)
    setForm(FORM_VACIO)
    setTocados({ hora: false, porcionGramos: false })
  }

  const guardarHorario = async (evento) => {
    evento.preventDefault()
    if (!valido || !usuario) {
      setTocados({ hora: true, porcionGramos: true })
      return
    }

    const datosHorario = {
      id: horarioEnEdicionId ?? 0,
      usuarioId: usuario.id,
      mascotaId: form.mascotaId ? Number(form.mascotaId) : null,
      dispensadorId: null,
      nombre: form.nombre,
      hora: form.hora,
      porcionGramos: Number(form.porcionGramos),
      icono: form.icono,
      lunes: !!form.lunes,
      martes: !!form.martes,
      miercoles: !!form.miercoles,
      jueves: !!form.jueves,
      viernes: !!form.viernes,
      sabado: !!form.sabado,
      domingo: !!form.domingo,
      activo: true,
    }

    try {
      if (horarioEnEdicionId !== null) {
        await api.actualizarHorario(horarioEnEdicionId, datosHorario)
        setListaHorarios((prev) =>
          prev.map((h) => (h.id === horarioEnEdicionId ? { ...datosHorario, id: horarioEnEdicionId } : h)),
        )
        limpiarFormulario()
      } else {
        const nuevoHorario = await api.crearHorario(datosHorario)
        setListaHorarios((prev) => [...prev, nuevoHorario])
        limpiarFormulario()
      }
    } catch {
      // Angular solo registra el error en consola.
    }
  }

  const seleccionarParaEditar = (horario) => {
    setHorarioEnEdicionId(horario.id)
    setForm({
      nombre: horario.nombre ?? '',
      hora: horario.hora ?? '',
      porcionGramos: String(horario.porcionGramos ?? '100'),
      icono: horario.icono ?? 'sun',
      mascotaId: horario.mascotaId ?? '',
      ...Object.fromEntries(DIAS.map((dia) => [dia, !!horario[dia]])),
    })
  }

  const eliminarHorario = async (id) => {
    if (!window.confirm('¿Deseas eliminar esta programación de alimento?')) return
    try {
      await api.eliminarHorario(id)
      setListaHorarios((prev) => prev.filter((h) => h.id !== id))
      if (horarioEnEdicionId === id) limpiarFormulario()
    } catch {
      // Angular solo registra el error en consola.
    }
  }

  const obtenerNombreMascota = (mascotaId) => {
    if (!mascotaId) return 'Todos'
    const mascota = listaMascotas.find((m) => m.id == mascotaId)
    return mascota ? mascota.nombre : 'Mascota'
  }

  return {
    listaHorarios,
    listaMascotas,
    horarioEnEdicionId,
    form,
    tocados,
    cargando,
    errorMsg,
    horaValida,
    porcionValida,
    valido,
    cambiar,
    tocar,
    limpiarFormulario,
    guardarHorario,
    seleccionarParaEditar,
    eliminarHorario,
    obtenerNombreMascota,
  }
}
