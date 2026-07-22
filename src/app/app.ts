import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppService } from './services/app.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  // Los roles posibles serán: 'publico', 'cliente' o 'admin'
  rolActual: string = 'publico';


  constructor(
    private appService: AppService
  ){}



  cambiarRol(nuevoRol: string) {
    this.rolActual = nuevoRol;
  }



  descargarApp(){

    this.appService.descargarApp()
    .subscribe((archivo)=>{


      const blob = new Blob(
        [archivo],
        {
          type:'application/vnd.android.package-archive'
        }
      );


      const url = window.URL.createObjectURL(blob);


      const link = document.createElement('a');

      link.href = url;

      link.download = 'PawFeeder.apk';


      link.click();


      window.URL.revokeObjectURL(url);


    });

  }

}