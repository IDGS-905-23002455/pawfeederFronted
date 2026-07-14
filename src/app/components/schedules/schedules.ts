import { HorarioService } from './../../services/horario';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota';
import { Horario } from '../horario';

@Component({
  selector: 'app-schedules',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './schedules.html',
  styleUrl: './schedules.css'
})
export class Schedules implements OnInit {

  listaHorarios: Horario[] = [];
  listaMascotas: any[] = [];
  horarioEnEdicionId: number | null = null;

horarioForm = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),

    // Solo permite formato HH:MM de 24 horas (ej. 08:00, 15:30, 23:59)
    hora: new FormControl<string>('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.pattern(/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/)
      ]
    }),

    // Solo permite números enteros positivos del 1 al 9999
    porcionGramos: new FormControl<any>('100', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.min(1),
        Validators.max(9999),
        Validators.pattern(/^[0-9]+$/)
      ]
    }),

    icono: new FormControl<string>('sun', { nonNullable: true, validators: [Validators.required] }),
    mascotaId: new FormControl<any>('', { nonNullable: false }),
    lunes: new FormControl<boolean>(false, { nonNullable: true }),
    martes: new FormControl<boolean>(false, { nonNullable: true }),
    miercoles: new FormControl<boolean>(false, { nonNullable: true }),
    jueves: new FormControl<boolean>(false, { nonNullable: true }),
    viernes: new FormControl<boolean>(false, { nonNullable: true }),
    sabado: new FormControl<boolean>(false, { nonNullable: true }),
    domingo: new FormControl<boolean>(false, { nonNullable: true })
  });

  constructor(
    private horarioService: HorarioService,
    private mascotaService: MascotaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarHorarios();
    this.cargarMascotas();
  }

  cargarHorarios() {
    this.horarioService.getHorariosPorUsuario(1).subscribe({
      next: (data) => {
        this.listaHorarios = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar horarios:', err)
    });
  }

  cargarMascotas() {
    this.mascotaService.getMascotasPorUsuario(1).subscribe({
      next: (data) => {
        this.listaMascotas = data.filter(m => m.nombre);
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error al cargar mascotas para el select:', err)
    });
  }

  guardarHorario() {
    if (!this.horarioForm.valid) {
      this.horarioForm.markAllAsTouched();
      return;
    }

    const mId = this.horarioForm.value.mascotaId;

    const datosHorario: Horario = {
      id: this.horarioEnEdicionId ?? 0,
      usuarioId: 1,
      mascotaId: mId ? Number(mId) : null,
      dispensadorId: 1,
      nombre: this.horarioForm.value.nombre!,
      hora: this.horarioForm.value.hora!,
      porcionGramos: Number(this.horarioForm.value.porcionGramos),
      icono: this.horarioForm.value.icono!,
      lunes: !!this.horarioForm.value.lunes,
      martes: !!this.horarioForm.value.martes,
      miercoles: !!this.horarioForm.value.miercoles,
      jueves: !!this.horarioForm.value.jueves,
      viernes: !!this.horarioForm.value.viernes,
      sabado: !!this.horarioForm.value.sabado,
      domingo: !!this.horarioForm.value.domingo,
      activo: true
    };

    if (this.horarioEnEdicionId !== null) {
      this.horarioService.actualizarHorario(this.horarioEnEdicionId, datosHorario).subscribe({
        next: () => {
          const index = this.listaHorarios.findIndex(h => h.id === this.horarioEnEdicionId);
          if (index !== -1) {
            this.listaHorarios[index] = { ...datosHorario, id: this.horarioEnEdicionId! };
          }
          this.limpiarFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al actualizar horario:', err)
      });
    } else {
      this.horarioService.crearHorario(datosHorario).subscribe({
        next: (nuevoHorario) => {
          this.listaHorarios.push(nuevoHorario);
          this.limpiarFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al crear horario:', err)
      });
    }
  }

  seleccionarParaEditar(horario: Horario) {
    this.horarioEnEdicionId = horario.id!;
    this.horarioForm.patchValue({
      nombre: horario.nombre,
      hora: horario.hora,
      porcionGramos: horario.porcionGramos,
      icono: horario.icono,
      mascotaId: horario.mascotaId,
      lunes: horario.lunes,
      martes: horario.martes,
      miercoles: horario.miercoles,
      jueves: horario.jueves,
      viernes: horario.viernes,
      sabado: horario.sabado,
      domingo: horario.domingo
    });
    this.horarioForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  eliminarHorario(id: number) {
    if (confirm('¿Deseas eliminar esta programación de alimento?')) {
      this.horarioService.eliminarHorario(id).subscribe({
        next: () => {
          this.listaHorarios = this.listaHorarios.filter(h => h.id !== id);
          if (this.horarioEnEdicionId === id) {
            this.limpiarFormulario();
          }
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al eliminar horario:', err)
      });
    }
  }

  obtenerNombreMascota(mascotaId: number | null): string {
    if (!mascotaId) return 'Todos';
    const m = this.listaMascotas.find(x => x.id == mascotaId);
    return m ? m.nombre : 'Mascota';
  }

  limpiarFormulario() {
    this.horarioEnEdicionId = null;
    this.horarioForm.reset({
      nombre: '',
      hora: '',
      porcionGramos: '100',
      icono: 'sun',
      mascotaId: '',
      lunes: false,
      martes: false,
      miercoles: false,
      jueves: false,
      viernes: false,
      sabado: false,
      domingo: false
    });
    this.horarioForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }
}
