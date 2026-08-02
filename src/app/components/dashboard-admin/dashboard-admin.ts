import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard-admin.html',
  styleUrl: './dashboard-admin.css'
})
export class DashboardAdminComponent implements OnInit {
  private dashboardService = inject(DashboardService);

  cargando = true;
  error = false;
  mensajeError = '';

  usuarios = { total: 0, admins: 0, clientes: 0, verificados: 0, activos: 0 };
  sesiones = { total: 0, porUsuario: [] as any[] };
  inventario = {
    productos: { total: 0, stockTotal: 0, enProceso: 0, terminados: 0 },
    componentes: { total: 0, stockTotal: 0 },
    unidadesFabricadas: 0,
    unidadesTerminadas: 0,
    unidadesPendientes: 0
  };
  ventas = {
    dispositivosRegistrados: 0,
    dispositivosActivos: 0,
    dispensacionesEjecutadas: 0,
    comidaTotalGramos: 0
  };
  general = { mascotas: 0, horarios: 0, opiniones: 0, calificacionPromedio: 0 };

  ngOnInit(): void {
    this.dashboardService.getDashboardAdmin().subscribe({
      next: (data: any) => {
        this.usuarios = data.usuarios;
        this.sesiones = data.sesiones;
        this.inventario = data.inventario;
        this.ventas = data.ventas;
        this.general = data.general;
        this.cargando = false;
      },
      error: (err) => {
        console.error('Error cargando dashboard admin:', err);
        this.mensajeError = `No se pudieron cargar los datos (${err?.status ?? 'sin respuesta'}). Verifica la conexión con la API.`;
        this.error = true;
        this.cargando = false;
      }
    });
  }
}
