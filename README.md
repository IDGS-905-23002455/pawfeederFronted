# PawFeeder · Frontend React

Aplicación web del dispensador inteligente de croquetas PawFeeder (proyecto IoT con Arduino).
Incluye las páginas públicas del producto, el registro con verificación por código (OTP) y el
cotizador de hardware.

## Requisitos

- Node.js 20 o superior
- npm

## Puesta en marcha

```bash
npm install
cp .env.example .env.local   # en Windows: copy .env.example .env.local
npm run dev
```

La app queda disponible en `http://localhost:5173`.

### Variables de entorno

| Variable       | Descripción                                      | Valor por defecto                                       |
| -------------- | ------------------------------------------------ | ------------------------------------------------------- |
| `VITE_API_URL` | URL base de la API, sin barra final.              | `https://petfeeder-api-dgjx.onrender.com/api`           |

## Scripts

| Comando           | Descripción                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Servidor de desarrollo con HMR.                                          |
| `npm run build`   | Build de producción en `dist/`.                                          |
| `npm run preview` | Sirve el build de producción localmente.                                |
| `npm run lint`    | Analiza el código con Oxlint.                                            |
| `npm run check`   | Renderiza las 9 rutas en SSR, valida textos clave y regenera el build.   |

## Estructura

```
src/
  api.js                 Cliente HTTP y endpoints de la API
  sesion.jsx             Contexto de sesión (localStorage + token)
  useSesion.js           Hook de acceso a la sesión
  App.jsx                Definición de rutas
  componentes/
    Layout.jsx           Navbar, footer y layout general
    AuthPanel.jsx        Panel lateral de login/registro
  paginas/               Home, About (cotizador), Contacto, Manual, Faq, Reviews, Login, Registro, 404
  estilos/               CSS propio (base, faq, auth)
public/
  imagenes/              Recursos gráficos
  favicon.svg            Icono del sitio
  manifest.webmanifest   Metadatos PWA e iconos
  sw.js                  Service worker (shell offline)
  _redirects             Fallback SPA para Netlify/Render
  _headers               Cabeceras para el service worker y el manifest
render-check.jsx         Verificación SSR de rutas (usada por npm run check)
```

## Despliegue

El build es una SPA, por lo que el hosting debe redirigir todas las rutas a `index.html`.
Ya se incluye `public/_redirects` para Netlify y Render. En otros proveedores configura la
regla equivalente (por ejemplo, un rewrite `/(.*)` → `/index.html` en Vercel o
`try_files $uri /index.html` en Nginx).

## PWA

`public/manifest.webmanifest` define nombre, colores, `display: standalone` y los tres iconos
(192, 512 y maskable). Está enlazado desde `index.html` junto con los metadatos de iOS.

El service worker (`public/sw.js`) se registra automáticamente en producción desde `main.jsx` y
aplica esta estrategia:

- **Navegación**: network-first con fallback al `index.html` cacheado (funciona sin conexión).
- **`/assets/`**: cache-first, porque los nombres llevan hash y son inmutables.
- **Imágenes, fuentes y manifest**: stale-while-revalidate.
- **API y orígenes externos**: nunca se cachean.

Para invalidar la caché tras cambiar la estrategia, incrementa `VERSION` en `public/sw.js`.
El archivo `_headers` evita que el navegador cachee el propio `sw.js`.

## Notas de seguridad

- La sesión y el token se guardan en `localStorage`. El token se envía como
  `Authorization: Bearer <token>` cuando la API lo devuelve en el login.
- El rol **no** se deduce del correo en el cliente: debe venir del backend. La autorización
  real de los endpoints tiene que validarse en el servidor.
- El código OTP de prueba solo se muestra en desarrollo (`import.meta.env.DEV`).
