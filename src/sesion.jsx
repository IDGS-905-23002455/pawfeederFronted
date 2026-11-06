import { createContext, useCallback, useMemo, useState } from 'react'
import { api, CLAVE_TOKEN } from './api.js'

const CLAVE = 'pawfeeder_user'

const ContextoSesion = createContext(null)

function leerSesion() {
  if (typeof window === 'undefined') return null
  try {
    const guardada = window.localStorage.getItem(CLAVE)
    const datos = guardada ? JSON.parse(guardada) : null
    if (!datos) return null

    // Sesiones antiguas guardaban el token dentro del usuario: se migra a su propia clave.
    if (datos.token) window.localStorage.setItem(CLAVE_TOKEN, datos.token)

    return normalizar(datos)
  } catch {
    return null
  }
}

function normalizar(datos) {
  if (!datos || typeof datos !== 'object') return null

  // El backend puede devolver { token, usuario } o un usuario plano.
  const { token: _token, usuario, user, ...resto } = datos
  const base = usuario ?? user ?? resto

  return {
    ...base,
    // El rol debe venir del backend; nunca se deduce del correo en el cliente.
    rol: base.rol ?? 'cliente',
  }
}

export function ProveedorSesion({ children }) {
  const [usuario, setUsuario] = useState(leerSesion)

  const guardar = useCallback((datos) => {
    const nuevo = normalizar(datos)
    if (!nuevo) return null

    if (datos.token) {
      window.localStorage.setItem(CLAVE_TOKEN, datos.token)
    }

    window.localStorage.setItem(CLAVE, JSON.stringify(nuevo))
    setUsuario(nuevo)
    return nuevo
  }, [])

  const login = useCallback(
    async (email, password) => {
      const datos = await api.login(email, password)
      return guardar(datos)
    },
    [guardar],
  )

  const logout = useCallback(() => {
    window.localStorage.removeItem(CLAVE)
    window.localStorage.removeItem(CLAVE_TOKEN)
    setUsuario(null)
  }, [])

  // Actualiza parcialmente al usuario en memoria y en localStorage (p. ej. al guardar el perfil).
  const actualizarUsuario = useCallback((cambios) => {
    setUsuario((actual) => {
      if (!actual) return actual
      const nuevo = normalizar({ ...actual, ...cambios })
      window.localStorage.setItem(CLAVE, JSON.stringify(nuevo))
      return nuevo
    })
  }, [])

  const valor = useMemo(
    () => ({ usuario, sesionIniciada: !!usuario, login, logout, actualizarUsuario }),
    [usuario, login, logout, actualizarUsuario],
  )

  return <ContextoSesion.Provider value={valor}>{children}</ContextoSesion.Provider>
}

export { ContextoSesion }