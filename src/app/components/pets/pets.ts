import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota';
import { AuthService } from '../../services/auth';

interface Mascota {
  id?: number;
  usuarioId: number;
  nombre: string;
  raza: string;
  edadAnos: number;
  pesoKg: number;
  tamano: string;
  activa: boolean;
  fotoUri?: string | null;
}

@Component({
  selector: 'app-pets',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pets.html',
  styleUrl: './pets.css'
})
export class Pets implements OnInit {

  listaMascotas: Mascota[] = [];
  mascotaEnEdicionId: number | null = null;
  cargando = true;
  errorMsg = '';

  get usuarioId(): number {
    return this.auth.currentUser?.id ?? 0;
  }

  get sinSesion(): boolean {
    return !this.auth.currentUser;
  }

  mascotaForm = new FormGroup({
    nombre: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    raza: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    edadAnos: new FormControl<any>('', { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    pesoKg: new FormControl<any>('', { nonNullable: true, validators: [Validators.required, Validators.min(0)] }),
    tamano: new FormControl<string>('mediano', { nonNullable: true, validators: [Validators.required] })
  });

  constructor(
    private mascotaService: MascotaService,
    private auth: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    if (!this.auth.currentUser) {
      this.cargando = false;
      return;
    }
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.cargando = true;
    this.errorMsg = '';
    this.mascotaService.getMascotasPorUsuario(this.usuarioId).subscribe({
      next: (data: any[]) => {
        this.listaMascotas = data.filter(m => m.nombre);
        this.cargando = false;
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Error al conectar con el backend:', err);
        this.cargando = false;
        this.errorMsg = 'No se pudieron cargar tus mascotas. Verifica tu conexión e intenta de nuevo.';
      }
    });
  }

  guardarMascota() {
    if (!this.mascotaForm.valid) {
      this.mascotaForm.markAllAsTouched();
      return;
    }

    const datosMascota: Mascota = {
      id: this.mascotaEnEdicionId ?? 0,
      usuarioId: this.usuarioId,
      nombre: this.mascotaForm.value.nombre!,
      raza: this.mascotaForm.value.raza!,
      edadAnos: Number(this.mascotaForm.value.edadAnos),
      pesoKg: Number(this.mascotaForm.value.pesoKg),
      tamano: this.mascotaForm.value.tamano!,
      activa: true,
      fotoUri: null
    };

    if (this.mascotaEnEdicionId !== null) {
this.mascotaService.actualizarMascota(this.mascotaEnEdicionId, datosMascota).subscribe({
  next: () => {
    console.log('¡Mascota actualizada con éxito!');

    const index = this.listaMascotas.findIndex(m => m.id === this.mascotaEnEdicionId);
    if (index !== -1) {
      this.listaMascotas[index] = { ...datosMascota, id: this.mascotaEnEdicionId! };
    }

    this.limpiarFormulario();
    this.cdr.detectChanges();
  },
  error: (err) => console.error('Error al actualizar:', err)
});
    } else {
      this.mascotaService.crearMascota(datosMascota).subscribe({
        next: (mascotaGuardada: Mascota) => {
          console.log('¡Mascota creada con éxito!', mascotaGuardada);
          this.listaMascotas.push(mascotaGuardada);
          this.limpiarFormulario();
          this.cdr.detectChanges();
        },
        error: (err) => console.error('Error al crear:', err)
      });
    }
  }

  seleccionarMascotaParaEditar(mascota: Mascota) {
    this.mascotaEnEdicionId = mascota.id!;

    this.mascotaForm.patchValue({
      nombre: mascota.nombre,
      raza: mascota.raza,
      edadAnos: mascota.edadAnos,
      pesoKg: mascota.pesoKg,
      tamano: mascota.tamano
    });

    this.mascotaForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }

  eliminarMascota(id: number) {
    if (confirm('¿Estás segura de que deseas eliminar esta mascota de PawFeeder?')) {
      this.mascotaService.eliminarMascota(id).subscribe({
        next: () => {
          console.log('¡Mascota java de la BD!');
          this.listaMascotas = this.listaMascotas.filter(m => m.id !== id);
          if (this.mascotaEnEdicionId === id) {
            this.limpiarFormulario();
          }
          this.cdr.detectChanges();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('No se pudo eliminar la mascota.');
        }
      });
    }
  }

  limpiarFormulario() {
    this.mascotaEnEdicionId = null;
    this.mascotaForm.reset({
      nombre: '',
      raza: '',
      edadAnos: '',
      pesoKg: '',
      tamano: 'mediano'
    });
    this.mascotaForm.updateValueAndValidity();
    this.cdr.detectChanges();
  }
}
