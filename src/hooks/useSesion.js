import { useContext } from 'react'
import { ContextoSesion } from '../sesion.jsx'

export function useSesion() {
  const contexto = useContext(ContextoSesion)
  if (!contexto) {
    throw new Error('useSesion debe usarse dentro de ProveedorSesion')
  }
  return contexto
}
