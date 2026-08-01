import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import { CommonModule } from '@angular/common';

import { UsuarioService, Usuario } from '../../services/usuario';

import { DispensadorService, Dispensador } from '../../services/dispensador';



interface UsuarioSistema {
  id: number;
  nombre: string;
  correo: string;
  rol: string;
  verificado: boolean;
  estado: string;
  actuando: boolean;
}



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})


export class Admin implements OnInit {

  usuarios: UsuarioSistema[] = [];

  dispensadores: Dispensador[] = [];

  cargando = true;

  mensaje = '';
  tipoMensaje: 'ok' | 'error' = 'ok';

  get verificadosCount(): number {
    return this.usuarios.filter(u => u.verificado).length;
  }



  constructor(
    private usuarioService: UsuarioService,
    private dispensadorService: DispensadorService,
    private cdr: ChangeDetectorRef
  ) {}


  ngOnInit(): void {
    this.cargarUsuarios();
    this.cargarDispensadores();
  }



  cargarUsuarios() {
    this.cargando = true;

    this.usuarioService.getUsuarios()
      .subscribe({
        next: (data: Usuario[]) => {
          this.usuarios = data.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.email,
            rol: usuario.rol,
            verificado: usuario.verificado,
            estado: usuario.activo ? 'Activo' : 'Inactivo',
            actuando: false
          }));

          this.cargando = false;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error('ERROR API USUARIOS:', error);
          this.usuarios = [];
          this.cargando = false;
          this.notificar(false, 'No se pudieron cargar los usuarios. Revisa tu conexión a la API.');
          this.cdr.markForCheck();
        }
      });
  }



  cargarDispensadores() {
    this.dispensadorService.getDispensadores()
      .subscribe({
        next: (data: Dispensador[]) => {
          this.dispensadores = data;
          this.cdr.markForCheck();
        },
        error: (error: any) => {
          console.error('ERROR API DISPENSADORES:', error);
        }
      });
  }



  private notificar(ok: boolean, texto: string) {
    this.mensaje = texto;
    this.tipoMensaje = ok ? 'ok' : 'error';
    this.cdr.markForCheck();
    setTimeout(() => {
      this.mensaje = '';
      this.cdr.markForCheck();
    }, 4000);
  }



  verificar(user: UsuarioSistema) {
    if (!confirm(`¿Verificar la cuenta de ${user.nombre}?`)) return;

    user.actuando = true;
    this.cdr.markForCheck();

    this.usuarioService.verificarCuenta(user.id)
      .subscribe({
        next: (resp) => {
          user.verificado = true;
          user.actuando = false;
          this.notificar(true, resp.mensaje ?? 'Cuenta verificada.');
        },
        error: () => {
          user.actuando = false;
          this.notificar(false, 'No se pudo verificar la cuenta.');
        }
      });
  }



  cambiarRol(user: UsuarioSistema) {
    const esAdmin = user.rol === 'admin';
    const accion = esAdmin ? 'quitar los privilegios de administrador' : 'convertir en administrador';
    if (!confirm(`¿Seguro que deseas ${accion} a ${user.nombre}?`)) return;

    const nuevoRol = esAdmin ? 'cliente' : 'admin';
    user.actuando = true;
    this.cdr.markForCheck();

    this.usuarioService.cambiarRol(user.id, nuevoRol)
      .subscribe({
        next: (resp) => {
          user.rol = nuevoRol;
          user.actuando = false;
          this.notificar(true, resp.mensaje ?? 'Rol actualizado.');
        },
        error: () => {
          user.actuando = false;
          this.notificar(false, 'No se pudo cambiar el rol.');
        }
      });
  }



  darDeBaja(user: UsuarioSistema) {
    const nuevoEstado = user.estado === 'Activo' ? false : true;
    const accion = nuevoEstado ? 'activar' : 'suspender';
    if (!confirm(`¿Deseas ${accion} la cuenta de ${user.nombre}?`)) return;

    user.actuando = true;
    this.cdr.markForCheck();

    this.usuarioService.actualizarEstado(user.id, nuevoEstado)
      .subscribe({
        next: () => {
          user.estado = nuevoEstado ? 'Activo' : 'Inactivo';
          user.actuando = false;
          this.notificar(true, nuevoEstado ? 'Cuenta activada.' : 'Cuenta suspendida.');
        },
        error: () => {
          user.actuando = false;
          this.notificar(false, 'No se pudo actualizar el estado.');
        }
      });
  }

}
