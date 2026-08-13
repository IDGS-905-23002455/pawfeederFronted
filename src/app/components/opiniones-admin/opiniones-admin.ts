import { Component, OnInit, ChangeDetectorRef, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OpinionService } from '../../services/opinion';
import { Opinion } from '../reviews/opinion';

const ESTADOS_VALIDOS = ['Nuevo', 'En revisión', 'Resuelto'];
const OPCIONES_ESTADO = ['Todos', ...ESTADOS_VALIDOS];

@Component({
  selector: 'app-opiniones-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './opiniones-admin.html',
  styleUrl: './opiniones-admin.css'
})
export class OpinionesAdminComponent implements OnInit {
  opiniones: Opinion[] = [];
  cargando = false;
  error = false;
  mensajeError = '';

  opcionesEstado = OPCIONES_ESTADO;
  filtroEstado = 'Todos';
  busqueda = '';

  editando: Opinion | null = null;
  editEstado = 'Nuevo';
  editRespuesta = '';
  guardando = false;

  constructor(
    private opinionService: OpinionService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {}

  ngOnInit(): void {
    this.cargarOpiniones();
  }

  cargarOpiniones(): void {
    this.cargando = true;
    this.opinionService.getOpiniones().subscribe({
      next: (data) => {
        this.zone.run(() => {
          this.opiniones = data;
          this.cargando = false;
          this.cdr.detectChanges();
        });
      },
      error: (err) => {
        console.error('Error al cargar opiniones (admin):', err);
        this.zone.run(() => {
          this.cargando = false;
          this.error = true;
          this.mensajeError = `No se pudieron cargar los comentarios (${err?.status ?? 'sin respuesta'}). Verifica la conexión con la API.`;
          this.cdr.detectChanges();
        });
      }
    });
  }

  estadoDe(op: Opinion): string {
    return op.estado || 'Nuevo';
  }

  get opinionesFiltradas(): Opinion[] {
    const est = this.filtroEstado;
    const q = this.busqueda.trim().toLowerCase();
    return this.opiniones.filter((o) => {
      if (est !== 'Todos' && this.estadoDe(o) !== est) return false;
      if (!q) return true;
      const texto = `${o.nombreUsuario} ${o.detallesMascota} ${o.comentario} ${o.respuestaAdmin ?? ''}`.toLowerCase();
      return texto.includes(q);
    });
  }

  get totales() {
    const total = this.opiniones.length;
    const nuevos = this.opiniones.filter((o) => this.estadoDe(o) === 'Nuevo').length;
    const enRevision = this.opiniones.filter((o) => this.estadoDe(o) === 'En revisión').length;
    const resueltos = this.opiniones.filter((o) => this.estadoDe(o) === 'Resuelto').length;
    const calif = total > 0 ? this.opiniones.reduce((s, o) => s + o.calificacion, 0) / total : 0;
    return { total, nuevos, enRevision, resueltos, calif: calif.toFixed(1) };
  }

  badgeClase(estado?: string): string {
    switch (estado || 'Nuevo') {
      case 'Nuevo':
        return 'text-bg-danger';
      case 'En revisión':
        return 'text-bg-warning';
      case 'Resuelto':
        return 'text-bg-success';
      default:
        return 'text-bg-secondary';
    }
  }

  iniciarEdicion(op: Opinion): void {
    this.editando = { ...op };
    this.editEstado = this.estadoDe(op);
    this.editRespuesta = op.respuestaAdmin || '';
  }

  cancelarEdicion(): void {
    this.editando = null;
    this.editRespuesta = '';
    this.editEstado = 'Nuevo';
  }

  guardarSeguimiento(): void {
    if (!this.editando || !this.editando.id) return;
    if (!ESTADOS_VALIDOS.includes(this.editEstado)) {
      alert('Selecciona un estado válido.');
      return;
    }
    this.guardando = true;
    this.opinionService.actualizarOpinion(this.editando.id, {
      estado: this.editEstado,
      respuestaAdmin: this.editRespuesta.trim()
    }).subscribe({
      next: () => {
        this.zone.run(() => {
          this.guardando = false;
          this.cargarOpiniones();
          this.cancelarEdicion();
        });
      },
      error: (err) => {
        console.error('Error al guardar el seguimiento:', err);
        this.zone.run(() => {
          this.guardando = false;
          this.cdr.detectChanges();
        });
        alert('No se pudo guardar el seguimiento. Revisa la conexión con la API.');
      }
    });
  }

  eliminar(op: Opinion): void {
    if (!op.id) return;
    if (!confirm(`¿Eliminar el comentario de ${op.nombreUsuario}? Esta acción no se puede deshacer.`)) return;
    this.opinionService.eliminarOpinion(op.id).subscribe({
      next: () => {
        this.zone.run(() => this.cargarOpiniones());
      },
      error: (err) => {
        console.error('Error al eliminar opinión:', err);
        alert('No se pudo eliminar el comentario.');
      }
    });
  }

  obtenerEstrellas(calificacion: number): number[] {
    return Array(calificacion).fill(0);
  }

  obtenerEstrellasVacias(calificacion: number): number[] {
    return Array(Math.max(0, 5 - calificacion)).fill(0);
  }
}
