import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { DashboardService } from '../../services/dashboard';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-dashboard-cliente',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard-cliente.html',
  styleUrl: './dashboard-cliente.css'
})
export class DashboardClienteComponent implements OnInit {
  private dashboardService = inject(DashboardService);
  private auth = inject(AuthService);

  cargando = true;
  error = false;
  usuarioNombre = '';

  mascotas = { total: 0, activas: 0, lista: [] as any[] };
  horarios = { total: 0, activos: 0, lista: [] as any[] };
  comida = { semanaGramos: 0, hoyGramos: 0, totalDispensaciones: 0, dispensacionesHoy: 0 };
  dispensadores: any[] = [];
  sesiones = { total: 0, web: 0, app: 0 };
  notificaciones = { noLeidas: 0 };

  ngOnInit(): void {
    const usuario = this.auth.currentUser;
    if (!usuario) return;
    this.usuarioNombre = usuario.nombre;
    this.dashboardService.getDashboardCliente(usuario.id).subscribe({
      next: (data: any) => {
        this.mascotas = data.mascotas;
        this.horarios = data.horarios;
        this.comida = data.comida;
        this.dispensadores = data.dispensadores;
        this.sesiones = data.sesiones;
        this.notificaciones = data.notificaciones;
        this.cargando = false;
      },
      error: () => {
        this.error = true;
        this.cargando = false;
      }
    });
  }

  get bateriaPromedio(): number {
    if (!this.dispensadores.length) return 0;
    const sum = this.dispensadores.reduce((acc, d) => acc + (d.bateriaPercent ?? 0), 0);
    return Math.round(sum / this.dispensadores.length);
  }

  get tolvaPromedio(): number {
    if (!this.dispensadores.length) return 0;
    const sum = this.dispensadores.reduce((acc, d) => acc + (d.nivelTolvaPct ?? 0), 0);
    return Math.round(sum / this.dispensadores.length);
  }
}
