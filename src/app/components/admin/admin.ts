import { Component, OnInit } from '@angular/core';
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
export class Admin implements OnInit {


  usuarios: UsuarioSistema[] = [];

  dispensadores: Dispensador[] = [];



  constructor(
    private usuarioService: UsuarioService,
    private dispensadorService: DispensadorService
  ){}



  ngOnInit(): void {

    console.log("ADMIN INICIADO");

    this.cargarUsuarios();

    this.cargarDispensadores();

  }




  cargarUsuarios(){


    console.log("Consultando usuarios API...");


    this.usuarioService.getUsuarios()
    .subscribe({

      next:(data: Usuario[])=>{


        console.log("USUARIOS RECIBIDOS:", data);



        this.usuarios = data.map(usuario => ({


          id: usuario.id,

          nombre: usuario.nombre,

          correo: usuario.email,

          dispositivoId: "Sin vincular",

          estado: usuario.activo
          ? "Activo"
          : "Inactivo"


        }));


        console.log("TABLA USUARIOS:", this.usuarios);


      },


      error:(error)=>{


        console.error(
          "ERROR API USUARIOS:",
          error
        );


      }


    });


  }




  cargarDispensadores(){


    console.log("Consultando dispensadores API...");


    this.dispensadorService.getDispensadores()
    .subscribe({


      next:(data: Dispensador[])=>{


        console.log(
          "DISPENSADORES RECIBIDOS:",
          data
        );


        this.dispensadores = data;


      },


      error:(error)=>{


        console.error(
          "ERROR API DISPENSADORES:",
          error
        );


      }


    });


  }





  darDeBaja(id:number){


    const usuario = this.usuarios.find(
      u => u.id === id
    );


    if(usuario){


      usuario.estado =
      usuario.estado === "Activo"
      ? "Inactivo"
      : "Activo";


    }


  }


}