import { Navigate, Outlet } from 'react-router-dom'
import { useSesion } from '../hooks/useSesion.js'

/**
 * Protege las rutas de panel por rol. En SSR no hay localStorage, así que se
 * deja renderizar la página para que las comprobaciones de render funcionen;
 * el guard real actúa en el cliente tras la hidratación.
 */
export function GuardRol({ rol }) {
  const { sesionIniciada, usuario } = useSesion()

  if (typeof window === 'undefined') return <Outlet />

  if (!sesionIniciada) return <Navigate to="/login" replace />
  if (usuario?.rol !== rol) return <Navigate to="/" replace />

  return <Outlet />
}
