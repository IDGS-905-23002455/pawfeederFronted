import { Component, ChangeDetectorRef, NgZone, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';

interface ProductoConReceta {
  id: number;
  nombre: string;
  stock: number;
  estado: string;
  componentesCount: number;
}

interface RecetaItem {
  id: number;
  productoId: number;
  componenteId: number;
  componenteNombre: string;
  cantidadRequerida: number;
  dispensador: string;
}

interface Componente {
  id: number;
  nombre: string;
  stock: number;
  unidadMedida: string;
}

@Component({
  selector: 'app-recetas',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './recetas.html',
  styleUrl: './recetas.css'
})
export class RecetasComponent {

  productos: ProductoConReceta[] = [];
  recetas: RecetaItem[] = [];
  componentes: Componente[] = [];

  productoSeleccionado: ProductoConReceta | null = null;
  mostrandoFormulario: boolean = false;

  nuevoComponenteId: number = 0;
  nuevaCantidad: number = 1;

  editandoReceta: RecetaItem | null = null;

  mensajeError: string = '';

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    afterNextRender(() => this.cargarDatos());
  }

  cargarDatos(): void {
    this.mensajeError = '';
    this.http.get<ProductoConReceta[]>(`${this.apiUrl}/Recetas/productos-con-receta`).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.productos = [...data];
          this.cdr.detectChanges();
        });
      },
      error: (err: HttpErrorResponse) => {
        this.zone.run(() => {
          console.error('Error al cargar productos:', err);
          this.mensajeError = 'Error al cargar productos. ¿El backend está corriendo?';
          this.cdr.detectChanges();
        });
      }
    });
    this.http.get<Componente[]>(`${this.apiUrl}/Componentes`).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.componentes = [...data];
          this.cdr.detectChanges();
        });
      },
      error: (err: HttpErrorResponse) => {
        this.zone.run(() => {
          console.error('Error al cargar componentes:', err);
          this.mensajeError = 'Error al cargar componentes. ¿El backend está corriendo?';
          this.cdr.detectChanges();
        });
      }
    });
  }

  seleccionarProducto(p: ProductoConReceta): void {
    this.productoSeleccionado = p;
    this.mostrandoFormulario = false;
    this.editandoReceta = null;
    this.cargarRecetas(p.id);
  }

  cargarRecetas(productoId: number): void {
    this.http.get<RecetaItem[]>(`${this.apiUrl}/Recetas/producto/${productoId}`).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.recetas = [...data];
          this.cdr.detectChanges();
        });
      },
      error: (err: HttpErrorResponse) => {
        this.zone.run(() => {
          console.error('Error al cargar receta:', err);
          this.mensajeError = 'Error al cargar la receta.';
          this.cdr.detectChanges();
        });
      }
    });
  }

  agregarComponente(): void {
    if (!this.productoSeleccionado || this.nuevoComponenteId <= 0 || this.nuevaCantidad <= 0) return;

    const payload = {
      productoId: this.productoSeleccionado.id,
      componenteId: this.nuevoComponenteId,
      cantidadRequerida: this.nuevaCantidad,
      dispensador: this.productoSeleccionado.nombre
    };

    this.http.post(`${this.apiUrl}/Recetas`, payload).subscribe({
      next: () => {
        this.nuevoComponenteId = 0;
        this.nuevaCantidad = 1;
        this.mostrandoFormulario = false;
        this.cargarRecetas(this.productoSeleccionado!.id);
        this.cargarDatos();
      },
      error: (err) => alert(typeof err.error === 'string' ? err.error : 'Error al agregar componente.')
    });
  }

  iniciarEdicion(item: RecetaItem): void {
    this.editandoReceta = { ...item };
  }

  guardarEdicion(): void {
    if (!this.editandoReceta) return;
    const payload = {
      productoId: this.editandoReceta.productoId,
      componenteId: this.editandoReceta.componenteId,
      cantidadRequerida: this.editandoReceta.cantidadRequerida,
      dispensador: this.editandoReceta.dispensador
    };

    this.http.put(`${this.apiUrl}/Recetas/${this.editandoReceta.id}`, payload).subscribe({
      next: () => {
        this.editandoReceta = null;
        this.cargarRecetas(this.productoSeleccionado!.id);
      },
      error: () => alert('Error al actualizar.')
    });
  }

  cancelarEdicion(): void {
    this.editandoReceta = null;
  }

  eliminar(item: RecetaItem): void {
    if (!confirm(`¿Eliminar '${item.componenteNombre}' de la receta?`)) return;
    this.http.delete(`${this.apiUrl}/Recetas/${item.id}`).subscribe({
      next: () => {
        this.cargarRecetas(this.productoSeleccionado!.id);
        this.cargarDatos();
      },
      error: () => alert('Error al eliminar.')
    });
  }

  getComponentesDisponibles(): Componente[] {
    if (!this.productoSeleccionado) return [];
    const idsEnReceta = new Set(this.recetas.map(r => r.componenteId));
    return this.componentes.filter(c => !idsEnReceta.has(c.id));
  }
}
