import { Component, ChangeDetectorRef, NgZone, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuarioService, Usuario } from '../../services/usuario';
import { DispensadorService, Dispensador } from '../../services/dispensador';


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

  usuarios: UsuarioSistema[] = [];
  dispensadores: Dispensador[] = [];

  constructor(
    private usuarioService: UsuarioService,
    private dispensadorService: DispensadorService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone
  ) {
    afterNextRender(() => {
      this.cargarUsuarios();
      this.cargarDispensadores();
    });
  }


  cargarUsuarios(){
    console.log("Consultando usuarios API...");

    this.usuarioService.getUsuarios()
    .subscribe({
      next:(data: Usuario[])=>{
        console.log("USUARIOS RECIBIDOS:", data);

        this.zone.run(() => {
          this.usuarios = data.map(usuario => ({
            id: usuario.id,
            nombre: usuario.nombre,
            correo: usuario.email,
            dispositivoId: "Sin vincular",
            estado: usuario.activo ? "Activo" : "Inactivo"
          }));

          console.log("TABLA USUARIOS:", this.usuarios);
          this.cdr.detectChanges();
        });
      },
      error:(error)=>{
        console.error("ERROR API USUARIOS:", error);
      }
    });
  }


  cargarDispensadores(){
    console.log("Consultando dispensadores API...");

    this.dispensadorService.getDispensadores()
    .subscribe({
      next:(data: Dispensador[])=>{
        console.log("DISPENSADORES RECIBIDOS:", data);

        this.zone.run(() => {
          this.dispensadores = data;
          this.cdr.detectChanges();
        });
      },
      error:(error)=>{
        console.error("ERROR API DISPENSADORES:", error);
      }
    });
  }


  darDeBaja(id:number){
    const usuario = this.usuarios.find(u => u.id === id);

    if(usuario){
      usuario.estado = usuario.estado === "Activo" ? "Inactivo" : "Activo";
    }
  }

}
