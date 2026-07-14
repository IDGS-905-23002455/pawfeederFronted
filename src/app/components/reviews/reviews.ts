import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // <-- Agrega estos
import { OpinionService } from '../../services/opinion';
import { Opinion } from './opinion';

@Component({
  selector: 'app-reviews',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './reviews.html',
  styleUrl: './reviews.css'
})
export class Reviews implements OnInit {
  listaOpiniones: Opinion[] = [];

  // 1. Declaramos el formulario reactivo
  opinionForm = new FormGroup({
    nombreUsuario: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    detallesMascota: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    calificacion: new FormControl<number>(5, { nonNullable: true, validators: [Validators.required, Validators.min(1), Validators.max(5)] }),
    comentario: new FormControl<string>('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(300)] })
  });

  constructor(
    private opinionService: OpinionService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarOpiniones();
  }

  cargarOpiniones(): void {
    this.opinionService.getOpiniones().subscribe({
      next: (data) => {
        this.listaOpiniones = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al cargar las opiniones de PawFeeder:', err);
      }
    });
  }

  guardarOpinion(): void {
    if (this.opinionForm.invalid) return;

    const nuevaOpinion: Opinion = {
      nombreUsuario: this.opinionForm.value.nombreUsuario!,
      detallesMascota: this.opinionForm.value.detallesMascota!,
      calificacion: Number(this.opinionForm.value.calificacion),
      comentario: this.opinionForm.value.comentario!,
      fecha: new Date().toLocaleDateString('es-MX') // Genera la fecha actual en formato DD/MM/AAAA
    };

    this.opinionService.crearOpinion(nuevaOpinion).subscribe({
      next: () => {
        this.cargarOpiniones(); // Recarga la lista para ver el nuevo comentario arriba
        this.opinionForm.reset({ calificacion: 5 }); // Limpia el formulario y resetea las estrellas a 5
      },
      error: (err) => {
        console.error('Error al guardar la opinión:', err);
      }
    });
  }

  obtenerEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }

  obtenerEstrellasVacias(calificacion: number): number[] {
    return Array(5 - calificacion).fill(0);
  }
}
