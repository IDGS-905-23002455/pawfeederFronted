import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { forkJoin } from 'rxjs';
import { Componente, ProductoTerminado } from '../models/inventario.model';
import { environment } from '../../../environments/environment';

interface Proveedor {
  id: number;
  nombre: string;
  contacto: string;
  telefono: string;
  correo: string;
  direccion: string;
  activo: boolean;
}

interface PedidoSimulado {
  folio: string;
  proveedor: string;
  componente: string;
  cantidad: number;
  unidadMedida: string;
  fecha: string;
}

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
  proveedores: Proveedor[] = [];
  cargando: boolean = false;

  nuevoNombre: string = '';
  nuevoStock: number = 1;


  componenteEditando: Componente | null = null;

  pedidoComponenteId: number | null = null;
  pedidoProveedorId: number | null = null;
  pedidoCantidad: number = 10;
  pedidos: PedidoSimulado[] = [];
  pedidosRecibidos: PedidoSimulado[] = [];

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.obtenerInventario();
    this.cargarProveedores();
  }

  cargarProveedores(): void {
    this.http.get<Proveedor[]>(`${this.apiUrl}/Proveedores`).subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.proveedores = data.filter(p => p.activo);
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error al cargar proveedores:', err);
        this.zone.run(() => {
          this.cdr.detectChanges();
        });
      }
    });
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

  get stockBajo(): Componente[] {
    return this.componentes.filter(c => c.stock <= 3);
  }

  hacerPedido(): void {
    const componente = this.componentes.find(c => c.id === Number(this.pedidoComponenteId));
    const proveedor = this.proveedores.find(p => p.id === Number(this.pedidoProveedorId));

    if (!componente) {
      alert('Selecciona un componente para el pedido.');
      return;
    }
    if (!proveedor) {
      alert('Selecciona un proveedor para el pedido.');
      return;
    }
    if (!Number.isInteger(this.pedidoCantidad) || this.pedidoCantidad <= 0) {
      alert('La cantidad debe ser un número entero mayor a 0.');
      return;
    }

    const folio = `PF-${Date.now().toString().slice(-8)}`;
    const pedido: PedidoSimulado = {
      folio,
      proveedor: proveedor.nombre,
      componente: componente.nombre,
      cantidad: this.pedidoCantidad,
      unidadMedida: componente.unidadMedida || 'pza',
      fecha: new Date().toLocaleString('es-MX')
    };

    this.zone.run(() => {
      this.pedidos.unshift(pedido);
      this.pedidoComponenteId = null;
      this.pedidoProveedorId = null;
      this.pedidoCantidad = 10;
      this.cdr.detectChanges();
    });

    alert(`Pedido ${folio} registrado:\n${componente.nombre} x${this.pedidoCantidad} → ${proveedor.nombre}`);
  }

  verDetallePedido(pedido: PedidoSimulado): void {
    alert([
      `Folio: ${pedido.folio}`,
      `Proveedor: ${pedido.proveedor}`,
      `Componente: ${pedido.componente}`,
      `Cantidad: ${pedido.cantidad} ${pedido.unidadMedida}`,
      `Fecha: ${pedido.fecha}`
    ].join('\n'));
  }

  marcarRecibido(pedido: PedidoSimulado): void {
    const confirmacion = confirm(`¿Marcar el pedido ${pedido.folio} como recibido?`);
    if (!confirmacion) return;

    this.zone.run(() => {
      this.pedidos = this.pedidos.filter(p => p !== pedido);
      this.pedidosRecibidos.unshift(pedido);
      this.cdr.detectChanges();
    });

    alert(`Pedido ${pedido.folio} marcado como recibido.`);
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
