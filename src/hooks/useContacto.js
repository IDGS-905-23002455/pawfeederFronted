import { useState } from 'react'
import { CORREO_SOPORTE } from '../datos/contacto.js'

export function useContacto() {
  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' })

  const cambiar = (campo) => (e) => setForm({ ...form, [campo]: e.target.value })

  function enviar(e) {
    e.preventDefault()

    const asunto = form.asunto || 'Consulta desde PawFeeder'
    const cuerpo = `${form.mensaje}\n\n—\nNombre: ${form.nombre}\nCorreo: ${form.email}`

    window.location.href = `mailto:${CORREO_SOPORTE}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`
  }

  return { form, cambiar, enviar }
}
