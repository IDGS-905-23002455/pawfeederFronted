import { useState } from 'react'
import { api } from '../api.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VACIO = {
  nombre: '',
  apellido: '',
  email: '',
  password: '',
  confirmPassword: '',
  aceptaTerminos: false,
}

// Nunca mostrar el código de verificación en producción: solo sirve para pruebas locales.
const MOSTRAR_CODIGO_PRUEBA = import.meta.env.DEV

export function useRegistro() {
  const [form, setForm] = useState(VACIO)
  const [tocado, setTocado] = useState({})
  const [paso, setPaso] = useState('form')
  const [errorMsg, setErrorMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [cargando, setCargando] = useState(false)

  const [emailRegistrado, setEmailRegistrado] = useState('')
  const [codigo, setCodigo] = useState('')
  const [codigoPrueba, setCodigoPrueba] = useState('')
  const [verificando, setVerificando] = useState(false)
  const [reenviando, setReenviando] = useState(false)

  const [verPassword, setVerPassword] = useState(false)
  const [verConfirm, setVerConfirm] = useState(false)

  const cambiar = (campo) => (e) => {
    const valor = e.target.type === 'checkbox' ? e.target.checked : e.target.value
    setForm({ ...form, [campo]: valor })
  }

  const marcar = (campo) => () => setTocado({ ...tocado, [campo]: true })

  const errores = {
    nombre: form.nombre.trim() ? '' : 'El nombre es obligatorio.',
    apellido: form.apellido.trim() ? '' : 'El apellido es obligatorio.',
    email: !form.email.trim()
      ? 'El correo es obligatorio.'
      : EMAIL_RE.test(form.email.trim())
        ? ''
        : 'Ingresa un correo válido.',
    password: !form.password
      ? 'La contraseña es obligatoria.'
      : form.password.length < 8
        ? 'La contraseña debe tener al menos 8 caracteres.'
        : '',
    confirmPassword: !form.confirmPassword
      ? 'Confirma tu contraseña.'
      : form.confirmPassword !== form.password
        ? 'Las contraseñas no coinciden.'
        : '',
    aceptaTerminos: form.aceptaTerminos ? '' : 'Debes aceptar los términos y la privacidad.',
  }

  const error = (campo) => (tocado[campo] && errores[campo] ? errores[campo] : '')

  async function registrar(e) {
    e.preventDefault()
    setTocado({ nombre: true, apellido: true, email: true, password: true, confirmPassword: true, aceptaTerminos: true })

    if (Object.values(errores).some(Boolean)) return

    setCargando(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const respuesta = await api.registro(
        `${form.nombre} ${form.apellido}`.trim(),
        form.email.trim(),
        form.password,
      )
      setSuccessMsg(respuesta?.mensaje ?? '')
      setEmailRegistrado(form.email.trim())
      setCodigoPrueba(respuesta?.codigoPrueba ?? '')
      setPaso('otp')
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo crear la cuenta. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  async function verificar() {
    if (codigo.length !== 6) {
      setErrorMsg('El código debe tener 6 dígitos.')
      return
    }

    setVerificando(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const respuesta = await api.verificar(emailRegistrado, codigo)
      setSuccessMsg(respuesta?.mensaje ?? '')
      setPaso('listo')
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo verificar. Revisa el código.')
    } finally {
      setVerificando(false)
    }
  }

  async function reenviar() {
    setReenviando(true)
    setErrorMsg('')
    setSuccessMsg('')

    try {
      const respuesta = await api.reenviarCodigo(emailRegistrado)
      setSuccessMsg(respuesta?.mensaje ?? '')
      setCodigoPrueba(respuesta?.codigoPrueba ?? '')
      setCodigo('')
    } catch (err) {
      setErrorMsg(err.message || 'No se pudo reenviar el código.')
    } finally {
      setReenviando(false)
    }
  }

  return {
    form,
    cambiar,
    marcar,
    error,
    paso,
    errorMsg,
    successMsg,
    cargando,
    emailRegistrado,
    codigo,
    cambiarCodigo: (e) => setCodigo(e.target.value.replace(/\D/g, '')),
    codigoPrueba,
    mostrarCodigoPrueba: MOSTRAR_CODIGO_PRUEBA,
    verificando,
    reenviando,
    verPassword,
    verConfirm,
    alternarPassword: () => setVerPassword((v) => !v),
    alternarConfirm: () => setVerConfirm((v) => !v),
    registrar,
    verificar,
    reenviar,
  }
}
