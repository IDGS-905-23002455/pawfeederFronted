import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

// Definimos cómo es una mascota
interface Mascota {
  nombre: string;
  especie: string;
  raza: string;
  edad: number;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class Pets {

  // Lista de prueba con datos simulados (luego vendrán de tu API de C#)
  listaMascotas: Mascota[] = [
    { nombre: 'Max', especie: 'Perro', raza: 'Golden Retriever', edad: 3 },
    { nombre: 'Luna', especie: 'Gato', raza: 'Siamés', edad: 2 }
  ];

  // Formulario reactivo para registrar una nueva mascota
  mascotaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    especie: new FormControl('Perro', [Validators.required]),
    raza: new FormControl('', [Validators.required]),
    edad: new FormControl('', [Validators.required, Validators.min(0)])
  });

  // Función para agregar la mascota a la lista cuando le den clic al botón
  agregarMascota() {
    if (this.mascotaForm.valid) {
      const nuevaMascota: Mascota = {
        nombre: this.mascotaForm.value.nombre!,
        especie: this.mascotaForm.value.especie!,
        raza: this.mascotaForm.value.raza!,
        edad: Number(this.mascotaForm.value.edad!)
      };

      // La metemos al arreglo dinámicamente
      this.listaMascotas.push(nuevaMascota);

      // Limpiamos el formulario
      this.mascotaForm.reset({ especie: 'Perro' });
    } else {
      alert("Por favor, llena todos los campos de la mascota.");
    }
  }
}
