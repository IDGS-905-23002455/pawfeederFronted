// Catálogo y compras locales, equivalente a CompraService de Angular.
export const CATALOGO_BASE = [
  {
    id: 1,
    nombre: 'PawFeeder Standard',
    precio: 1899,
    descripcion: 'Dispensador inteligente de croquetas con programación básica y control desde la app.',
  },
  {
    id: 2,
    nombre: 'PawFeeder Premium',
    precio: 2499,
    descripcion: 'Dispensador con WiFi, sensor ultrasónico de nivel, porciones precisas y horarios desde cualquier lugar.',
  },
  {
    id: 3,
    nombre: 'PawFeeder Pro Max',
    precio: 3299,
    descripcion: 'Versión avanzada con doble tolva, notificaciones en tiempo real y soporte para varias mascotas.',
  },
]

function almacen() {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null
  } catch {
    return null
  }
}

export function claveCompras(usuarioId) {
  return `pawfeeder_compras_${usuarioId}`
}

export function leerCompras(usuarioId) {
  const storage = almacen()
  if (!storage) return []
  const raw = storage.getItem(claveCompras(usuarioId))
  if (!raw) return []
  try {
    const datos = JSON.parse(raw)
    return Array.isArray(datos) ? datos : []
  } catch {
    return []
  }
}

export function guardarCompras(usuarioId, compras) {
  const storage = almacen()
  if (!storage) return
  storage.setItem(claveCompras(usuarioId), JSON.stringify(compras))
}

export function registrarCompra(usuarioId, producto, cantidad = 1) {
  const compra = {
    id: Date.now(),
    productoId: producto.id,
    nombreProducto: producto.nombre,
    precio: producto.precio,
    cantidad,
    fecha: new Date().toLocaleDateString('es-MX'),
    estado: 'Entregado',
  }

  guardarCompras(usuarioId, [compra, ...leerCompras(usuarioId)])
  return compra
}

export function guardarReview(usuarioId, compraId, review) {
  const compras = leerCompras(usuarioId)
  const compra = compras.find((c) => c.id === compraId)
  if (!compra) return
  compra.review = review
  guardarCompras(usuarioId, compras)
}

export function enriquecerCatalogo(productos) {
  if (!productos || productos.length === 0) return CATALOGO_BASE

  return productos.map((producto) => {
    const base = CATALOGO_BASE.find((b) => b.nombre.toLowerCase() === producto.nombre.toLowerCase())
    return {
      id: producto.id,
      nombre: producto.nombre,
      stock: producto.stock,
      estado: producto.estado,
      precio: base?.precio ?? 1999,
      descripcion: base?.descripcion ?? 'Dispensador inteligente de croquetas PawFeeder.',
    }
  })
}
