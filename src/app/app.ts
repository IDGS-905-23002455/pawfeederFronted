import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  // Los roles posibles serán: 'publico', 'cliente' o 'admin'
  rolActual: string = 'publico';

  // Función para simular el cambio de rol en tu barra de pruebas abajo
  cambiarRol(nuevoRol: string) {
    this.rolActual = nuevoRol;
  }
}
