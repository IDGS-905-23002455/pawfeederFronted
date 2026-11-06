// Service worker de PawFeeder.
// Estrategia: shell precacheado + network-first en navegación y assets no versionados.
// Nunca cachea peticiones a la API ni recursos de otros orígenes.
// Al cambiar la estrategia de caché, incrementa VERSION para invalidar lo anterior.

const VERSION = 'v1'
const SHELL_CACHE = `pawfeeder-shell-${VERSION}`
const ASSET_CACHE = `pawfeeder-assets-${VERSION}`

const SHELL = ['/', '/index.html', '/manifest.webmanifest', '/favicon.svg', '/imagenes/pawfeeder-mark-192.png']

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(SHELL_CACHE)
      .then((cache) => cache.addAll(SHELL))
      .then(() => self.skipWaiting()),
  )
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((claves) =>
        Promise.all(
          claves.filter((clave) => clave !== SHELL_CACHE && clave !== ASSET_CACHE).map((clave) => caches.delete(clave)),
        ),
      )
      .then(() => self.clients.claim()),
  )
})

function guardar(cache, request, response) {
  if (response.ok && response.type === 'basic') {
    cache.put(request, response.clone())
  }
  return response
}

async function redPrimero(request) {
  const cache = await caches.open(SHELL_CACHE)
  const shellGuardado = async () => (await cache.match('/index.html')) ?? (await cache.match('/')) ?? null

  try {
    const response = await fetch(request)

    // La navegación siempre devuelve el index de la SPA: se guarda como shell.
    if (response.ok && response.type === 'basic') {
      cache.put('/index.html', response.clone())
      cache.put('/', response.clone())
      return response
    }

    // Un proxy o el hosting pueden devolver 5xx cuando el origen no responde:
    // en ese caso se sirve el shell cacheado.
    return (await shellGuardado()) ?? response
  } catch {
    return (await shellGuardado()) ?? Response.error()
  }
}

async function cachePrimero(request) {
  const cache = await caches.open(ASSET_CACHE)
  const guardada = await cache.match(request)
  if (guardada) return guardada
  try {
    return guardar(cache, request, await fetch(request))
  } catch {
    return Response.error()
  }
}

async function revalidarEnSegundoPlano(request) {
  const cache = await caches.open(ASSET_CACHE)
  const guardada = await cache.match(request)

  const actualizacion = fetch(request)
    .then((response) => guardar(cache, request, response))
    .catch(() => null)

  if (guardada) {
    // Se responde al instante con la copia y se actualiza en segundo plano.
    actualizacion.catch(() => {})
    return guardada
  }

  const response = await actualizacion
  return response ?? Response.error()
}

self.addEventListener('fetch', (event) => {
  const { request } = event

  if (request.method !== 'GET') return

  const url = new URL(request.url)

  // Solo mismo origen: excluye la API externa y cualquier CDN.
  if (url.origin !== self.location.origin) return

  // La API nunca se cachea, aunque algún día se sirva desde el mismo dominio.
  if (url.pathname.startsWith('/api/')) return

  if (request.mode === 'navigate') {
    event.respondWith(redPrimero(request))
    return
  }

  // Los archivos de /assets/ llevan hash en el nombre y son inmutables.
  if (url.pathname.startsWith('/assets/')) {
    event.respondWith(cachePrimero(request))
    return
  }

  if (/\.(?:js|css|woff2?|ttf|png|jpe?g|svg|webp|ico|webmanifest)$/i.test(url.pathname)) {
    event.respondWith(revalidarEnSegundoPlano(request))
  }
})
