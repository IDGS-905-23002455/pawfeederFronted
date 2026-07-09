import { Component, OnInit, ChangeDetectorRef } from '@angular/core'; // <-- Importa ChangeDetectorRef
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { MascotaService } from '../../services/mascota';

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

  mascotaForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    raza: new FormControl('', [Validators.required]),
    edadAnos: new FormControl('', [Validators.required, Validators.min(0)]),
    pesoKg: new FormControl('', [Validators.required, Validators.min(0)]),
    tamano: new FormControl('mediano', [Validators.required])
  });

  // Inyectamos también el ChangeDetectorRef en el constructor
  constructor(
    private mascotaService: MascotaService,
    private cdr: ChangeDetectorRef // <-- Agregado aquí
  ) {}

  ngOnInit(): void {
    this.cargarMascotas();
  }

  cargarMascotas() {
    this.mascotaService.getMascotasPorUsuario(1).subscribe({
      next: (data: any[]) => {
        this.listaMascotas = data;
        console.log('¡Mascotas cargadas desde C#!', this.listaMascotas);
        
        // Le avisamos a Angular de manera explícita que redibuje la pantalla ahora mismo
        this.cdr.detectChanges(); 
      },
      error: (err: any) => {
        console.error('Error al conectar con el backend:', err);
      }
    });
  }

  agregarMascota() {
    if (this.mascotaForm.valid) {
      const nuevaMascota: Mascota = {
        usuarioId: 1,
        nombre: this.mascotaForm.value.nombre!,
        raza: this.mascotaForm.value.raza!,
        edadAnos: Number(this.mascotaForm.value.edadAnos!),
        pesoKg: Number(this.mascotaForm.value.pesoKg!),
        tamano: this.mascotaForm.value.tamano!,
        activa: true
      };

      this.listaMascotas.push(nuevaMascota);
      this.mascotaForm.reset({ tamano: 'mediano' });
      this.cdr.detectChanges(); // También lo ponemos aquí al agregar una nueva
    } else {
      alert("Por favor, llena todos los campos obligatorios.");
    }
  }
}