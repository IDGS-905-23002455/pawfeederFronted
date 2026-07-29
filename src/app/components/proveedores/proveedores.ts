import { Component, ChangeDetectorRef, NgZone, afterNextRender, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
  correo: string;
  direccion: string;
  activo: boolean;
  creadoEn: string;
}

@Component({
  selector: 'app-proveedores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './proveedores.html',
  styleUrl: './proveedores.css'
})
export class ProveedoresComponent {

  proveedores: Proveedor[] = [];
  cargando: boolean = false;

  editando: Proveedor | null = null;
  mostrandoFormulario: boolean = false;

  nuevo: Partial<Proveedor> = {};
  editandoItem: Proveedor | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    afterNextRender(() => this.cargarProveedores());
  }

  cargarProveedores(): void {
    this.http.get<Proveedor[]>(`${this.apiUrl}/Proveedores`).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.proveedores = [...data];
          this.cdr.detectChanges();
        });
      }
    });
  }

  guardar(form: NgForm): void {
    if (form.invalid) return;

    const { nombre, contacto, telefono, correo, direccion } = this.nuevo;

    const payload = { nombre: nombre!.trim(), contacto, telefono, correo, direccion, activo: true };

    this.http.post<Proveedor>(`${this.apiUrl}/Proveedores`, payload).subscribe({
      next: () => {
        this.nuevo = {};
        this.mostrandoFormulario = false;
        form.resetForm();
        this.cargarProveedores();
      },
      error: (err) => {
        const msj = typeof err.error === 'string' ? err.error : 'Error al guardar.';
        alert(msj);
      }
    });
  }

  iniciarEdicion(p: Proveedor): void {
    this.editandoItem = { ...p };
  }

  cancelarEdicion(): void {
    this.editandoItem = null;
  }

  guardarEdicion(form: NgForm): void {
    if (!this.editandoItem || form.invalid) return;

    this.http.put(`${this.apiUrl}/Proveedores/${this.editandoItem.id}`, this.editandoItem).subscribe({
      next: () => {
        this.editandoItem = null;
        this.cargarProveedores();
      },
      error: () => alert('Error al actualizar.')
    });
  }

  eliminar(p: Proveedor): void {
    if (!confirm(`¿Eliminar proveedor '${p.nombre}'?`)) return;
    this.http.delete(`${this.apiUrl}/Proveedores/${p.id}`).subscribe({
      next: () => this.cargarProveedores(),
      error: () => alert('Error al eliminar.')
    });
  }
}
