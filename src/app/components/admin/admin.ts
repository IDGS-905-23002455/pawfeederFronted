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

  id:number;

  nombre:string;

  correo:string;

  dispositivoId:string;

  estado:string;

}





@Component({

  selector:'app-admin',

  standalone:true,

  imports:[
    CommonModule
  ],

  templateUrl:'./admin.html',

  styleUrl:'./admin.css',

  changeDetection: ChangeDetectionStrategy.OnPush

})


export class Admin implements OnInit {



  usuarios: UsuarioSistema[] = [];


  dispensadores: Dispensador[] = [];


  cargando = true;





  constructor(

    private usuarioService: UsuarioService,

    private dispensadorService: DispensadorService,

    private cdr: ChangeDetectorRef

  ){}





  ngOnInit():void{


    console.log(
      "ADMIN INICIADO"
    );



    this.cargarUsuarios();


    this.cargarDispensadores();



  }








  cargarUsuarios(){


    console.log(
      "Consultando usuarios API..."
    );


    this.usuarioService.getUsuarios()

    .subscribe({



      next:(data:Usuario[])=>{


        console.log(
          "USUARIOS RECIBIDOS:",
          data
        );



        this.usuarios = data.map(usuario=>({



          id:usuario.id,


          nombre:usuario.nombre,


          correo:usuario.email,


          dispositivoId:"Sin vincular",


          estado:

          usuario.activo

          ?

          "Activo"

          :

          "Inactivo"



        }));



        this.cargando=false;

        this.cdr.markForCheck();


        console.log(
          "TABLA USUARIOS:",
          this.usuarios
        );



      },



      error:(error:any)=>{


        console.error(
          "ERROR API USUARIOS:",
          error
        );

        this.usuarios = [
          { id: 1, nombre: 'Admin PawFeeder', correo: 'admin@pawfeeder.com', dispositivoId: 'Sin vincular', estado: 'Activo' },
          { id: 2, nombre: 'Cliente', correo: 'cliente@pawfeeder.com', dispositivoId: 'Sin vincular', estado: 'Activo' }
        ];

        this.cargando=false;

        this.cdr.markForCheck();


      }



    });



  }









  cargarDispensadores(){


    console.log(
      "Consultando dispensadores API..."
    );


    this.dispensadorService.getDispensadores()

    .subscribe({



      next:(data:Dispensador[])=>{


        console.log(
          "DISPENSADORES RECIBIDOS:",
          data
        );



        this.dispensadores=data;

        this.cdr.markForCheck();



      },



      error:(error:any)=>{


        console.error(
          "ERROR API DISPENSADORES:",
          error
        );


      }



    });



  }









  darDeBaja(user:UsuarioSistema){



    const nuevoEstado =

    user.estado === "Activo"

    ?

    false

    :

    true;





    this.usuarioService.actualizarEstado(

      user.id,

      nuevoEstado

    )

    .subscribe({



      next:()=>{


        console.log(
          "Estado actualizado"
        );



        user.estado =

        nuevoEstado

        ?

        "Activo"

        :

        "Inactivo";

        this.cdr.markForCheck();



      },



      error:(error:any)=>{


        console.error(

          "Error actualizando estado",

          error

        );


      }



    });



  }





}
