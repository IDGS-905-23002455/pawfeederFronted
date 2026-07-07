import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

interface Horario {
  nombre: string;
  hora: string;
  porcion: number; // en gramos
}

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedules.html',
  styleUrl: './schedules.css'
})
export class Schedules {

  // Lista simulada de horarios programados
  listaHorarios: Horario[] = [
    { nombre: 'Desayuno', hora: '08:00', porcion: 150 },
    { nombre: 'Cena', hora: '20:00', porcion: 120 }
  ];

  // Formulario reactivo para crear una nueva alerta de comida
  horarioForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    hora: new FormControl('', [Validators.required]),
    porcion: new FormControl('', [Validators.required, Validators.min(10)])
  });

  agregarHorario() {
    if (this.horarioForm.valid) {
      const nuevoHorario: Horario = {
        nombre: this.horarioForm.value.nombre!,
        hora: this.horarioForm.value.hora!,
        porcion: Number(this.horarioForm.value.porcion!)
      };

      this.listaHorarios.push(nuevoHorario);
      this.horarioForm.reset();
    } else {
      alert("Por favor, llena los datos del horario correctamente (mínimo 10g).");
    }
  }

  // Función extra por si el usuario quiere eliminar una hora programada
  eliminarHorario(index: number) {
    this.listaHorarios.splice(index, 1);
  }
}
