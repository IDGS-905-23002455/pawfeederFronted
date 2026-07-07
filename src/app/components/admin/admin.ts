import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface UsuarioSistema {
  id: number;
  nombre: string;
  correo: string;
  dispositivoId: string;
  estado: string;
}

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css'

  })
export class Admin {
  // Datos simulados de control total para el Administrador
  usuarios: UsuarioSistema[] = [
    { id: 1, nombre: 'Paola Gonzalez', correo: 'paola@example.com', dispositivoId: 'PW-ARD-905X', estado: 'Activo' },
    { id: 2, nombre: 'Juan Pérez', correo: 'juan.perez@example.com', dispositivoId: 'PW-ARD-112Y', estado: 'Activo' },
    { id: 3, nombre: 'María López', correo: 'maria.l@example.com', dispositivoId: 'Sin Vincular', estado: 'Inactivo' }
  ];

  // Funciones de control de administración
  darDeBaja(id: number) {
    const usuario = this.usuarios.find(u => u.id === id);
    if (usuario) {
      usuario.estado = usuario.estado === 'Activo' ? 'Inactivo' : 'Activo';
    }
  }
}
