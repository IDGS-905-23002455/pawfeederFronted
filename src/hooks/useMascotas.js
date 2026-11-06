import { useCallback, useEffect, useState } from 'react'
import { api } from '../api.js'
import { useSesion } from './useSesion.js'

const FORM_VACIO = { nombre: '', raza: '', edadAnos: '', pesoKg: '', tamano: 'mediano' }

export function useMascotas() {
  const { usuario } = useSesion()
  const [listaMascotas, setListaMascotas] = useState([])
  const [mascotaEnEdicionId, setMascotaEnEdicionId] = useState(null)
  const [mascotaOriginal, setMascotaOriginal] = useState(null)
  const [form, setForm] = useState(FORM_VACIO)
  const [cargando, setCargando] = useState(true)
  const [errorMsg, setErrorMsg] = useState('')

  const cargarMascotas = useCallback(async (usuarioId) => {
    setCargando(true)
    setErrorMsg('')
    try {
      const data = await api.getMascotas(usuarioId)
      setListaMascotas((Array.isArray(data) ? data : []).filter((m) => m.nombre))
      setCargando(false)
    } catch {
      setCargando(false)
      setErrorMsg('No se pudieron cargar tus mascotas. Verifica tu conexión e intenta de nuevo.')
    }
  }, [])

  useEffect(() => {
    if (!usuario) {
      setCargando(false)
      return
    }
    cargarMascotas(usuario.id)
  }, [usuario, cargarMascotas])

  const cambiar = (campo, valor) => setForm((prev) => ({ ...prev, [campo]: valor }))

  const valido =
    form.nombre !== '' &&
    form.raza !== '' &&
    form.edadAnos !== '' &&
    form.pesoKg !== '' &&
    Number(form.edadAnos) >= 0 &&
    Number(form.pesoKg) >= 0

  const limpiarFormulario = () => {
    setMascotaEnEdicionId(null)
    setMascotaOriginal(null)
    setForm(FORM_VACIO)
  }

  const guardarMascota = async (evento) => {
    evento.preventDefault()
    if (!valido || !usuario) return

    const datosMascota = {
      id: mascotaEnEdicionId ?? 0,
      usuarioId: usuario.id,
      nombre: form.nombre,
      raza: form.raza,
      edadAnos: Number(form.edadAnos),
      // El PUT del backend sobrescribe estos campos: al editar se conservan los valores guardados.
      edadMeses: mascotaEnEdicionId !== null ? (mascotaOriginal?.edadMeses ?? 0) : 0,
      pesoKg: Number(form.pesoKg),
      tamano: form.tamano,
      activa: true,
      fotoUri: mascotaEnEdicionId !== null ? (mascotaOriginal?.fotoUri ?? null) : null,
    }

    try {
      if (mascotaEnEdicionId !== null) {
        await api.actualizarMascota(mascotaEnEdicionId, datosMascota)
        setListaMascotas((prev) =>
          prev.map((m) => (m.id === mascotaEnEdicionId ? { ...m, ...datosMascota, id: mascotaEnEdicionId } : m)),
        )
        limpiarFormulario()
      } else {
        const mascotaGuardada = await api.crearMascota(datosMascota)
        setListaMascotas((prev) => [...prev, mascotaGuardada])
        limpiarFormulario()
      }
    } catch {
      // Angular solo registra el error en consola; no se muestra alerta.
    }
  }

  const seleccionarMascotaParaEditar = (mascota) => {
    setMascotaEnEdicionId(mascota.id)
    setMascotaOriginal(mascota)
    setForm({
      nombre: mascota.nombre,
      raza: mascota.raza,
      edadAnos: mascota.edadAnos,
      pesoKg: mascota.pesoKg,
      tamano: mascota.tamano,
    })
  }

  const eliminarMascota = async (id) => {
    if (!window.confirm('¿Estás segura de que deseas eliminar esta mascota de PawFeeder?')) return
    try {
      await api.eliminarMascota(id)
      setListaMascotas((prev) => prev.filter((m) => m.id !== id))
      if (mascotaEnEdicionId === id) limpiarFormulario()
    } catch {
      window.alert('No se pudo eliminar la mascota.')
    }
  }

  return {
    listaMascotas,
    mascotaEnEdicionId,
    form,
    cargando,
    errorMsg,
    valido,
    cambiar,
    limpiarFormulario,
    guardarMascota,
    seleccionarMascotaParaEditar,
    eliminarMascota,
  }
}
