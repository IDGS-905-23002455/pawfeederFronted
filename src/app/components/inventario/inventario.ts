import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Componente, ProductoTerminado } from '../models/inventario.model';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css'
})
export class InventarioComponent implements OnInit {
  componentes: Componente[] = [];
  productos: ProductoTerminado[] = [];
  cargando: boolean = false;

  nuevoNombre: string = '';
  nuevoStock: number = 1;


  componenteEditando: Componente | null = null;

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.obtenerInventario();
  }

  obtenerInventario(): void {
    this.cargando = true;

    const componentes$ = this.http.get<Componente[]>(`${this.apiUrl}/Componentes`);
    const productos$ = this.http.get<ProductoTerminado[]>(`${this.apiUrl}/Productos`);

    forkJoin([componentes$, productos$]).subscribe({
      next: ([componentesData, productosData]) => {
        this.zone.run(() => {
          this.componentes = [...componentesData];
          this.productos = [...productosData];
          this.cargando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error al actualizar inventario:', err);
        this.zone.run(() => {
          this.cargando = false;
          this.cdr.detectChanges();
        });
      }
    });
  }

  registrarComponente(): void {
    const nombreLimpio = this.nuevoNombre?.trim();
    const stockIngresado = Number(this.nuevoStock);

    if (!nombreLimpio) {
      alert('Por favor ingresa el nombre del componente.');
      return;
    }

    if (/^\d+$/.test(nombreLimpio)) {
      alert('El nombre del componente debe contener letras, no solo números.');
      return;
    }

    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombreLimpio)) {
      alert('El nombre del componente debe incluir al menos una letra.');
      return;
    }

    if (isNaN(stockIngresado) || stockIngresado <= 0) {
      alert('La cantidad debe ser un número entero mayor a 0.');
      return;
    }

    if (!Number.isInteger(stockIngresado)) {
      alert('La cantidad debe ser un número entero sin decimales.');
      return;
    }

    const payload = {
      nombre: nombreLimpio,
      stock: stockIngresado,
      unidadMedida: 'pza'
    };

    this.cargando = true;

    this.http.post<Componente>(`${this.apiUrl}/Componentes`, payload)
      .subscribe({
        next: (res) => {
          alert(`¡Componente '${res.nombre}' guardado exitosamente!`);
          this.zone.run(() => {
            this.nuevoNombre = '';
            this.nuevoStock = 1;
            this.obtenerInventario();
          });
        },
        error: (err) => {
          console.error('Error al guardar el componente:', err);
          const msj = typeof err.error === 'string' ? err.error : 'Hubo un error al registrar el componente.';
          alert(`${msj}`);
          this.zone.run(() => {
            this.cargando = false;
            this.cdr.detectChanges();
          });
        }
      });
  }

  seleccionarParaEditar(item: Componente): void {
    this.componenteEditando = { ...item };
  }

  cancelarEdicion(): void {
    this.componenteEditando = null;
  }

  guardarEdicion(): void {
    if (!this.componenteEditando) return;

    const nombreLimpio = this.componenteEditando.nombre?.trim();
    const stockIngresado = Number(this.componenteEditando.stock);

    if (!nombreLimpio) {
      alert('El nombre del componente no puede estar vacío.');
      return;
    }

    if (!/[a-zA-ZáéíóúÁÉÍÓÚñÑ]/.test(nombreLimpio)) {
      alert('El nombre debe contener al menos una letra.');
      return;
    }

    if (isNaN(stockIngresado) || stockIngresado < 0) {
      alert('La cantidad no puede ser negativa.');
      return;
    }

    this.cargando = true;

    this.http.put(`${this.apiUrl}/Componentes/${this.componenteEditando.id}`, this.componenteEditando)
      .subscribe({
        next: () => {
          alert('¡Componente actualizado correctamente!');
          this.zone.run(() => {
            this.componenteEditando = null;
            this.obtenerInventario();
          });
        },
        error: (err) => {
          console.error('Error al editar componente:', err);
          alert('Hubo un error al actualizar el componente.');
          this.zone.run(() => {
            this.cargando = false;
            this.cdr.detectChanges();
          });
        }
      });
  }

  eliminarComponente(item: Componente): void {
    const confirmacion = confirm(`¿Estás segura de eliminar el componente '${item.nombre}'?`);
    if (!confirmacion) return;

    this.cargando = true;

    this.http.delete(`${this.apiUrl}/Componentes/${item.id}`)
      .subscribe({
        next: () => {
          alert(`¡Componente '${item.nombre}' eliminado!`);
          this.zone.run(() => {
            this.obtenerInventario();
          });
        },
        error: (err) => {
          console.error('Error al eliminar componente:', err);
          alert('No se pudo eliminar el componente. Puede estar asociado a una receta de producción.');
          this.zone.run(() => {
            this.cargando = false;
            this.cdr.detectChanges();
          });
        }
      });
  }

  fabricarDispensador(productoId: number): void {
    this.cargando = true;

    this.http.post(`${this.apiUrl}/Produccion/fabricar-dispensador/${productoId}?cantidadAFabricar=1`, {})
      .subscribe({
        next: (res: any) => {
          alert(res.mensaje || '¡Ensamblaje ejecutado con éxito!');
          this.zone.run(() => {
            this.obtenerInventario();
          });
        },
        error: (err) => {
          const mensajeError = typeof err.error === 'string' ? err.error : 'No hay suficiente stock de componentes.';
          alert(`Error al ensamblar: ${mensajeError}`);
          this.zone.run(() => {
            this.cargando = false;
            this.cdr.detectChanges();
          });
        }
      });
  }
}
