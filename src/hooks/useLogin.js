import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSesion } from './useSesion.js'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function useLogin() {
  const [form, setForm] = useState({ email: '', password: '' })
  const [tocado, setTocado] = useState({})
  const [errorMsg, setErrorMsg] = useState('')
  const [cargando, setCargando] = useState(false)
  const [verPassword, setVerPassword] = useState(false)
  const { login } = useSesion()
  const navegar = useNavigate()

  const errores = {
    email: !form.email.trim()
      ? 'El correo es obligatorio.'
      : EMAIL_RE.test(form.email.trim())
        ? ''
        : 'Ingresa un correo válido.',
    password: form.password ? '' : 'La contraseña es obligatoria.',
  }

  const error = (campo) => (tocado[campo] && errores[campo] ? errores[campo] : '')
  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })
  const marcar = (campo) => () => setTocado({ ...tocado, [campo]: true })

  async function enviar(e) {
    e.preventDefault()
    setTocado({ email: true, password: true })

    if (Object.values(errores).some(Boolean)) return

    setCargando(true)
    setErrorMsg('')

    try {
      await login(form.email.trim(), form.password)
      navegar('/')
    } catch (err) {
      setErrorMsg(err.message || 'Credenciales inválidas. Intenta de nuevo.')
    } finally {
      setCargando(false)
    }
  }

  return {
    form,
    cambiar,
    marcar,
    error,
    enviar,
    errorMsg,
    cargando,
    verPassword,
    alternarPassword: () => setVerPassword((v) => !v),
  }
}
