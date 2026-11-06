export const CLAVE_TOKEN = 'pawfeeder_token'

const API_URL = import.meta.env.VITE_API_URL ?? 'https://petfeeder-api-dgjx.onrender.com/api'

function leerToken() {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(CLAVE_TOKEN)
  } catch {
    return null
  }
}

async function pedir(ruta, opciones = {}) {
  const token = leerToken()
  const headers = {
    ...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opciones.headers,
  }

  let respuesta
  try {
    respuesta = await fetch(`${API_URL}${ruta}`, { ...opciones, headers })
  } catch {
    throw new Error('No se pudo conectar con el servidor.')
  }

  const texto = await respuesta.text()
  let datos = null
  if (texto) {
    try {
      datos = JSON.parse(texto)
    } catch {
      datos = texto
    }
  }

  if (!respuesta.ok) {
    const mensaje =
      datos && typeof datos === 'object' && datos.mensaje
        ? datos.mensaje
        : typeof datos === 'string' && datos.trim()
          ? datos
          : `Error ${respuesta.status}. Intenta de nuevo.`

    const error = new Error(mensaje)
    error.status = respuesta.status
    error.body = datos
    throw error
  }

  return datos
}

const json = (metodo, cuerpo) => ({
  method: metodo,
  body: JSON.stringify(cuerpo),
})

export const api = {
  base: API_URL,

  login: (email, password) => pedir('/Usuarios/login', json('POST', { email, password })),

  registro: (nombre, email, password) => pedir('/auth/registro', json('POST', { nombre, email, password })),

  verificar: (email, codigo) => pedir('/auth/verificar', json('POST', { email, codigo })),

  reenviarCodigo: (email) => pedir('/auth/reenviar', json('POST', { email })),

  enviarCotizacion: (datos) => pedir('/Cotizacion/enviar', json('POST', datos)),

  // ── Opiniones ──────────────────────────────────────────
  getOpiniones: () => pedir('/Opiniones'),

  crearOpinion: (opinion) => pedir('/Opiniones', json('POST', opinion)),

  actualizarOpinion: (id, opinion) => pedir(`/Opiniones/${id}`, json('PUT', opinion)),

  eliminarOpinion: (id) => pedir(`/Opiniones/${id}`, { method: 'DELETE' }),

  // ── Dashboard ──────────────────────────────────────────
  getDashboardCliente: (usuarioId) => pedir(`/Dashboard/cliente/${usuarioId}`),

  getComida7Dias: (usuarioId) => pedir(`/Dashboard/cliente/${usuarioId}/comida-7-dias`),

  getDashboardAdmin: () => pedir('/Dashboard/admin'),

  // ── Dispensadores ──────────────────────────────────────
  getDispensadores: () => pedir('/Dispensadores'),

  // ── Mascotas ───────────────────────────────────────────
  getMascotas: (usuarioId) => pedir(`/Mascotas/usuario/${usuarioId}`),

  crearMascota: (mascota) => pedir('/Mascotas', json('POST', mascota)),

  actualizarMascota: (id, mascota) => pedir(`/Mascotas/${id}`, json('PUT', mascota)),

  eliminarMascota: (id) => pedir(`/Mascotas/${id}`, { method: 'DELETE' }),

  // ── Horarios ───────────────────────────────────────────
  getHorarios: (usuarioId) => pedir(`/Horarios/Usuario/${usuarioId}`),

  crearHorario: (horario) => pedir('/Horarios', json('POST', horario)),

  actualizarHorario: (id, horario) => pedir(`/Horarios/${id}`, json('PUT', horario)),

  eliminarHorario: (id) => pedir(`/Horarios/${id}`, { method: 'DELETE' }),

  // ── Usuarios ───────────────────────────────────────────
  getUsuarios: () => pedir('/Usuarios'),

  getUsuario: (id) => pedir(`/Usuarios/${id}`),

  actualizarPerfil: (id, nombre, telefono) => pedir(`/Usuarios/${id}`, json('PUT', { nombre, telefono })),

  actualizarEstado: (id, activo) => pedir(`/Usuarios/${id}/estado`, json('PUT', { activo })),

  cambiarRol: (id, rol) => pedir(`/Usuarios/${id}/rol`, json('PUT', { rol })),

  verificarCuenta: (id) => pedir(`/Usuarios/${id}/verificar`, json('PUT', {})),

  // ── Productos / componentes ────────────────────────────
  getProductos: () => pedir('/Productos'),

  crearProducto: (producto) => pedir('/Productos', json('POST', producto)),

  getComponentes: () => pedir('/Componentes'),

  crearComponente: (componente) => pedir('/Componentes', json('POST', componente)),

  actualizarComponente: (id, componente) => pedir(`/Componentes/${id}`, json('PUT', componente)),

  eliminarComponente: (id) => pedir(`/Componentes/${id}`, { method: 'DELETE' }),

  // ── Proveedores ────────────────────────────────────────
  getProveedores: () => pedir('/Proveedores'),

  crearProveedor: (proveedor) => pedir('/Proveedores', json('POST', proveedor)),

  actualizarProveedor: (id, proveedor) => pedir(`/Proveedores/${id}`, json('PUT', proveedor)),

  eliminarProveedor: (id) => pedir(`/Proveedores/${id}`, { method: 'DELETE' }),

  // ── Recetas ────────────────────────────────────────────
  getProductosConReceta: () => pedir('/Recetas/productos-con-receta'),

  getRecetaPorProducto: (productoId) => pedir(`/Recetas/producto/${productoId}`),

  crearReceta: (receta) => pedir('/Recetas', json('POST', receta)),

  actualizarReceta: (id, receta) => pedir(`/Recetas/${id}`, json('PUT', receta)),

  eliminarReceta: (id) => pedir(`/Recetas/${id}`, { method: 'DELETE' }),

  // ── Inventario de dispensadores / producción ───────────
  getDispensadoresInventario: () => pedir('/DispensadoresInventario'),

  getConteoTerminados: () => pedir('/DispensadoresInventario/conteo-terminados'),

  actualizarEstadoDispensador: (id, estado) =>
    pedir(`/DispensadoresInventario/${id}/estado`, json('PUT', { estado })),

  fabricarDispensador: (productoId, cantidad = 1) =>
    pedir(`/Produccion/fabricar-dispensador/${productoId}?cantidadAFabricar=${cantidad}`, json('POST', {})),
}
