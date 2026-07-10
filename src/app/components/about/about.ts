import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // <-- Importamos FormsModule para usar [(ngModel)]
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink], // <-- Agrégalo aquí
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  // Precios base y valores por defecto
  precioBase: number = 850; // Costo del circuito base + Arduino + motores

  // Opciones seleccionadas por el usuario
  tamanoContenedor: string = 'chico';
  incluyeCamara: boolean = false;
  materialEstructura: string = 'plastico';
  cantidadDispositivos: number = 1;

  // Función matemática que calcula el precio final en tiempo real
  get calcularTotal(): number {
    let total = this.precioBase;

    // 1. Modificador por tamaño
    if (this.tamanoContenedor === 'mediano') total += 200;
    if (this.tamanoContenedor === 'grande') total += 450;

    // 2. Modificador por sensores / cámara
    if (this.incluyeCamara) total += 350;

    // 3. Modificador por material
    if (this.materialEstructura === 'premium') total += 500;

    // Multiplicamos por la cantidad de PawFeeders que se quieran armar
    return total * this.cantidadDispositivos;
  }
}


