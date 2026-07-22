import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AppService } from '../../services/app.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {


  constructor(
    private appService: AppService
  ){}


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

      link.download = "PawFeeder.apk";

      link.click();


      window.URL.revokeObjectURL(url);

    });

  }

}