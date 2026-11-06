// Formato compartido por los paneles (equivalente a los pipes de Angular).
export const formatearNumero = (valor) => new Intl.NumberFormat('es-MX').format(Number(valor) || 0)

export const formatearFecha = (fecha) => {
  if (!fecha) return ''
  const valor = new Date(fecha)
  return Number.isNaN(valor.getTime()) ? String(fecha) : valor.toLocaleDateString('es-MX')
}

export const formatearFechaHora = (fecha) => {
  if (!fecha) return ''
  const valor = new Date(fecha)
  return Number.isNaN(valor.getTime()) ? String(fecha) : valor.toLocaleString('es-MX')
}

// Equivale al pipe de Angular date:'dd/MM/yyyy HH:mm'.
export const formatearFechaHoraCorta = (fecha) => {
  if (!fecha) return ''
  const valor = new Date(fecha)
  if (Number.isNaN(valor.getTime())) return String(fecha)
  const dd = String(valor.getDate()).padStart(2, '0')
  const mm = String(valor.getMonth() + 1).padStart(2, '0')
  const hh = String(valor.getHours()).padStart(2, '0')
  const mi = String(valor.getMinutes()).padStart(2, '0')
  return `${dd}/${mm}/${valor.getFullYear()} ${hh}:${mi}`
}
