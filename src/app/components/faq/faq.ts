import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

interface Pregunta {
  pregunta: string;
  respuesta: string;
}

interface Categoria {
  icono: string;
  titulo: string;
  preguntas: Pregunta[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  abierta = new Map<string, boolean>();

  categorias: Categoria[] = [
    {
      icono: 'bi-rocket-takeoff',
      titulo: 'Compra y envío',
      preguntas: [
        {
          pregunta: '¿Cómo puedo comprar un PawFeeder?',
          respuesta: 'En la sección "Proyecto" puedes personalizar tu dispensador y enviar tu cotización a tu correo. El equipo se pondrá en contacto contigo para concretar la compra y el envío.'
        },
        {
          pregunta: '¿Cuánto tiempo tarda el envío?',
          respuesta: 'El PawFeeder se ensambla bajo pedido, por lo que el envío tarda entre 5 y 10 días hábiles después de confirmada la compra, dependiendo de tu ubicación.'
        },
        {
          pregunta: '¿El precio incluye la app y el soporte?',
          respuesta: 'Sí. La aplicación web y móvil, las actualizaciones de firmware y el soporte técnico están incluidos sin costo adicional.'
        }
      ]
    },
    {
      icono: 'bi-tools',
      titulo: 'Instalación y configuración',
      preguntas: [
        {
          pregunta: '¿Es difícil de instalar?',
          respuesta: 'No. Solo llénalo de croquetas, enciéndelo y conéctalo a tu WiFi desde la aplicación siguiendo el Manual IoT. El proceso toma menos de 5 minutos.'
        },
        {
          pregunta: '¿Qué necesito para conectarlo a internet?',
          respuesta: 'Una red WiFi de 2.4 GHz y la contraseña de la misma. El dispositivo usa el protocolo MQTT para comunicarse con la nube de PawFeeder.'
        },
        {
          pregunta: '¿Funciona sin conexión a internet?',
          respuesta: 'El dispositivo puede dispensar siguiendo sus horarios guardados localmente, pero funciones como comida manual a distancia o notificaciones requieren conexión.'
        }
      ]
    },
    {
      icono: 'bi-calendar3',
      titulo: 'Uso diario',
      preguntas: [
        {
          pregunta: '¿Cuántas comidas puedo programar al día?',
          respuesta: 'Puedes crear todos los horarios que necesites y ajustar la cantidad de gramos de cada comida. Cada mascota puede tener su propio perfil de alimentación.'
        },
        {
          pregunta: '¿Qué pasa si se acaba la croqueta?',
          respuesta: 'El sensor ultrasónico mide el nivel de la tolva. Cuando está bajo, recibirás una notificación para rellenarla, evitando que tu mascota se quede sin comida.'
        },
        {
          pregunta: '¿Puedo dar de comer a mi mascota estando fuera de casa?',
          respuesta: 'Sí. Desde el dashboard puedes activar una comida manual al instante, desde cualquier lugar con acceso a internet.'
        }
      ]
    },
    {
      icono: 'bi-shield-check',
      titulo: 'Cuidado y mantenimiento',
      preguntas: [
        {
          pregunta: '¿Cada cuánto se debe limpiar?',
          respuesta: 'Se recomienda vaciar y limpiar la tolva una vez al mes con un paño seco. No uses agua ni líquidos para evitar dañar los componentes electrónicos.'
        },
        {
          pregunta: '¿Cómo se carga la batería?',
          respuesta: 'El PawFeeder puede alimentarse con un cable USB o una batería externa. El dashboard te muestra el nivel de batería en tiempo real.'
        },
        {
          pregunta: '¿Qué hago si el dispositivo deja de responder?',
          respuesta: 'Reinícialo y verifica que el LED de WiFi esté encendido. Si el problema persiste, revisa el Manual IoT o contáctanos desde la sección Contacto.'
        }
      ]
    }
  ];

  toggle(categoria: number, index: number): void {
    const key = `${categoria}-${index}`;
    if (this.abierta.get(key)) {
      this.abierta.delete(key);
    } else {
      this.abierta.clear();
      this.abierta.set(key, true);
    }
  }

  estaAbierta(categoria: number, index: number): boolean {
    return !!this.abierta.get(`${categoria}-${index}`);
  }
}
