import { Component, ChangeDetectorRef, NgZone, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ProductoTerminado } from '../models/inventario.model';
import { environment } from '../../../environments/environment';

interface DispensadorUnidad {
  id: number;
  productoId: number;
  productoNombre: string;
  codigoUnico: string;
  estado: string;
  creadoEn: string;
}

@Component({
  selector: 'app-inventario-dispensadores',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario-dispensadores.html',
  styleUrl: './inventario-dispensadores.css'
})
export class InventarioDispensadoresComponent {

  productos: ProductoTerminado[] = [];
  unidades: DispensadorUnidad[] = [];
  totalTerminados: number = 0;
  cargando: boolean = false;

  nuevoNombre: string = '';

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    afterNextRender(() => {
      this.cargarTodo();
    });
  }

  cargarTodo(): void {
    this.cargarProductos();
    this.cargarUnidades();
    this.cargarConteo();
  }

  cargarProductos(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<ProductoTerminado[]>(`${this.apiUrl}/Productos`).subscribe({
        next: (data) => {
          this.zone.run(() => {
            this.productos = [...data];
            this.cdr.detectChanges();
          });
          resolve();
        },
        error: () => resolve()
      });
    });
  }

  cargarUnidades(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<DispensadorUnidad[]>(`${this.apiUrl}/DispensadoresInventario`).subscribe({
        next: (data) => {
          this.zone.run(() => {
            this.unidades = [...data];
            this.cdr.detectChanges();
          });
          resolve();
        },
        error: () => resolve()
      });
    });
  }

  cargarConteo(): Promise<void> {
    return new Promise((resolve) => {
      this.http.get<any>(`${this.apiUrl}/DispensadoresInventario/conteo-terminados`).subscribe({
        next: (data) => {
          this.zone.run(() => {
            this.totalTerminados = data.total;
            this.cdr.detectChanges();
          });
          resolve();
        },
        error: () => resolve()
      });
    });
  }

  registrarProducto(): void {
    const nombre = this.nuevoNombre?.trim();

    if (!nombre) {
      alert('Por favor ingresa el nombre del dispensador.');
      return;
    }

    if (/^\d+$/.test(nombre)) {
      alert('El nombre debe contener letras, no solo números.');
      return;
    }

    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombre)) {
      alert('El nombre debe incluir al menos una letra.');
      return;
    }

    this.cargando = true;

    this.http.post<ProductoTerminado>(`${this.apiUrl}/Productos`, { nombre, stock: 0 }).subscribe({
      next: () => {
        alert(`¡Dispensador '${nombre}' registrado!`);
        this.zone.run(() => {
          this.nuevoNombre = '';
          this.cargarTodo();
        });
      },
      error: (err) => {
        const msj = typeof err.error === 'string' ? err.error : 'Error al registrar.';
        alert(msj);
        this.zone.run(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  fabricarDispensador(productoId: number, nombre: string): void {
    const confirmacion = confirm(`¿Fabricar 1 dispensador "${nombre}"?\nSe descontarán los componentes del hardware.`);
    if (!confirmacion) return;

    this.cargando = true;

    this.http.post<any>(`${this.apiUrl}/Produccion/fabricar-dispensador/${productoId}?cantidadAFabricar=1`, {}).subscribe({
      next: (res) => {
        alert(res.mensaje || '¡Dispensador fabricado!');
        this.cargarTodo();
      },
      error: (err) => {
        const msj = typeof err.error === 'string' ? err.error : 'No hay suficiente stock de componentes.';
        alert(`Error: ${msj}`);
        this.zone.run(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  cambiarEstadoUnidad(dispensadorId: number, nuevoEstado: string): void {
    this.http.put<any>(`${this.apiUrl}/DispensadoresInventario/${dispensadorId}/estado`, { estado: nuevoEstado }).subscribe({
      next: () => {
        const u = this.unidades.find(d => d.id === dispensadorId);
        if (u) u.estado = nuevoEstado;
        this.cargarConteo();
      },
      error: () => alert('No se pudo actualizar el estado.')
    });
  }
}
