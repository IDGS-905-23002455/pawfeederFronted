export const INDICE = [
  { href: '#inicio-rapido', icono: 'bi-rocket-takeoff', texto: 'Inicio rápido' },
  { href: '#conexion', icono: 'bi-wifi', texto: 'Conectar WiFi' },
  { href: '#horarios', icono: 'bi-calendar-check', texto: 'Programar horarios' },
  { href: '#manual', icono: 'bi-hand-index-thumb', texto: 'Comida manual' },
  { href: '#mascotas', icono: 'bi-heart-pulse', texto: 'Perfil mascota' },
  { href: '#alertas', icono: 'bi-bell', texto: 'Alertas' },
]

export const PASOS_RAPIDOS = [
  { icono: 'bi-plug', titulo: 'Enciende el dispositivo', texto: 'Conecta el cable de alimentación USB y verifica que el LED encienda.' },
  { icono: 'bi-person-plus', titulo: 'Crea tu cuenta', texto: 'Regístrate en la app PawFeeder con tu correo y datos básicos.' },
  { icono: 'bi-link-45deg', titulo: 'Vincula tu PawFeeder', texto: 'Ingresa el código del dispositivo para conectar tu cuenta.' },
]

export const PASOS_WIFI = [
  { titulo: 'Activa el modo configuración', texto: 'Al encender por primera vez, el LED parpadeará en azul.' },
  { titulo: 'Conéctate a la red del dispositivo', texto: 'Desde tu teléfono, únete a la red PawFeeder_Setup (sin contraseña).' },
  { titulo: 'Configura tu WiFi', texto: 'En la app, ve a Equipo > Configurar WiFi, elige tu red e ingresa la contraseña.' },
  { titulo: 'Confirma la conexión', texto: 'El LED cambiará a verde fijo cuando la conexión sea exitosa.' },
]

export const PASOS_HORARIOS = [
  'Toca el botón + Nuevo horario.',
  'Selecciona la hora y los días de la semana.',
  'Ajusta la porción en gramos con el control.',
  'Guarda y el dispositivo recibirá la configuración al instante.',
]

export const ALERTAS = [
  { icono: 'bi-box-seam', titulo: 'Nivel bajo de croqueta', texto: 'Te avisamos cuando el nivel baja del 20% para que rellenes a tiempo.' },
  { icono: 'bi-wifi-off', titulo: 'Conexión perdida', texto: 'Recibirás una alerta si el dispositivo pierde la conexión WiFi.' },
  { icono: 'bi-check2-circle', titulo: 'Comida completada', texto: 'Se notifica cuando una comida programada se dispensa correctamente.' },
]
