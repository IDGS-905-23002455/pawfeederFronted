import fs from 'node:fs'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'

import App from './src/App.jsx'
import { ProveedorSesion } from './src/sesion.jsx'

const ESPERADO = {
  '/': ['Alimenta a tu mascota', '¿Por qué PawFeeder?', 'Tecnología Arduino', 'pf-hero'],
  '/about': ['El proyecto PawFeeder', 'Resumen de Cotización', 'Total Estimado', '¿Tienes preguntas?'],
  '/contacto': ['Contáctanos', 'Envíanos un mensaje', 'carlosriosrmz17@gmail.com'],
  '/manual': ['Manual de uso', 'Conectar a WiFi', 'Programar horarios', 'Alertas y notificaciones'],
  '/preguntas-frecuentes': ['Preguntas frecuentes', 'Compra y envío', '¿Cuántas comidas puedo programar al día?'],
  '/opiniones': ['Déjanos tu Opinión', 'Comentarios de la Comunidad', 'Cargando comentarios'],
  '/login': ['Hora de alimentar', 'Iniciar sesión', 'auth-panel-title'],
  '/registro': ['Únete a PawFeeder', 'Crear cuenta', 'Confirmar contraseña'],
  '/admin': ['Consola de Administración', 'Gestiona usuarios, verificaciones y hardware de PawFeeder'],
  '/dashboard': ['Dashboard general', 'Resumen global de usuarios, inventario y ventas'],
  '/comentarios': ['Comentarios de Clientes', 'Revisa, responde y da seguimiento a las opiniones publicadas en la web.'],
  '/inventario': ['Control de Producción e Inventario PawFeeder'],
  '/inventario-dispensadores': ['Dispensadores PawFeeder'],
  '/proveedores': ['Proveedores'],
  '/recetas': ['Recetas de Dispensadores'],
  '/mascotas': ['Registrar Mascota', 'Mis Mascotas en Vinculación'],
  '/perfil': ['Mi Perfil', 'Configuración general de tu cuenta PawFeeder.'],
  '/horarios': ['Programar Comida', 'Cronograma de Distribución Automática'],
  '/mis-compras': ['MIS COMPRAS', 'Consulta tus compras realizadas y comparte tu opinión sobre el producto adquirido.'],
  '/dashboard-cliente': ['RESUMEN', 'Así va tu PawFeeder hoy'],
  '/ruta-que-no-existe': ['Esta página no existe'],
}

function render(ruta) {
  return renderToString(
    <StaticRouter location={ruta}>
      <ProveedorSesion>
        <App />
      </ProveedorSesion>
    </StaticRouter>,
  )
}

const resultados = []
let fallos = 0

for (const [ruta, textos] of Object.entries(ESPERADO)) {
  try {
    const html = render(ruta)
    const faltantes = textos.filter((t) => !html.includes(t))
    if (faltantes.length) {
      fallos++
      resultados.push({ ruta, ok: false, faltantes })
      console.error(`✗ ${ruta} — faltan: ${faltantes.join(' | ')}`)
    } else {
      resultados.push({ ruta, ok: true, chars: html.length })
      console.log(`✓ ${ruta} (${html.length} chars, ${textos.length} aserciones)`)
    }
  } catch (error) {
    fallos++
    resultados.push({ ruta, ok: false, error: error.message })
    console.error(`✗ ${ruta} — ${error.message}`)
  }
}

fs.writeFileSync('render-check.json', JSON.stringify(resultados, null, 2))

if (fallos) {
  console.error(`\n${fallos} ruta(s) con problemas.`)
  process.exit(1)
}

console.log(`\n${Object.keys(ESPERADO).length} rutas renderizadas correctamente.`)