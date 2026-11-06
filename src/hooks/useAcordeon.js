import { useState } from 'react'

export function useAcordeon() {
  const [abierta, setAbierta] = useState(null)

  const alternar = (clave) => setAbierta((actual) => (actual === clave ? null : clave))

  return { abierta, alternar }
}
