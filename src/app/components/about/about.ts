import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {

  constructor(private http: HttpClient) {}

  // Precio base
  precioBase: number = 850;

  // Datos de la cotización
  tamanoContenedor: string = 'chico';
  incluyeCamara: boolean = false;
  materialEstructura: string = 'plastico';
  cantidadDispositivos: number = 1;

  mostrarInputCorreo = false;
  // Correo del cliente
  correoUsuario: string = '';

  // Calcula el total automáticamente
  get calcularTotal(): number {

    let total = this.precioBase;

    if (this.tamanoContenedor === 'mediano')
      total += 200;

    if (this.tamanoContenedor === 'grande')
      total += 450;

    if (this.incluyeCamara)
      total += 350;

    if (this.materialEstructura === 'premium')
      total += 500;

    return total * this.cantidadDispositivos;
  }

  mostrarCampoCorreo() {
  this.mostrarInputCorreo = true;
}

enviarCotizacion() {

  if (!this.correoUsuario) {
    alert("Ingresa un correo electrónico.");
    return;
  }

  const datos = {
    correo: this.correoUsuario,
    contenedor: this.tamanoContenedor,
    material: this.materialEstructura,
    cantidad: this.cantidadDispositivos,
    total: this.calcularTotal
  };

  this.http.post(
    'https://localhost:7122/api/Cotizacion/enviar',
    datos
  ).subscribe({
    next: () => {
      alert("La cotización fue enviada correctamente.");

      // Limpiar formulario
      this.correoUsuario = '';
      this.mostrarInputCorreo = false;
    },
    error: (error) => {
      console.error(error);
      alert("Error al enviar la cotización.");
    }
  });

}

}