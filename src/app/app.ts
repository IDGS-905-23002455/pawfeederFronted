import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';
import { AppService } from './services/app.service';
import { AuthService } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  rolActual: string = 'publico';
  menuAbierto = false;

  constructor(
    private appService: AppService,
    private auth: AuthService
  ) {
    this.auth.currentUser$.subscribe(user => {
      this.rolActual = user?.rol ?? 'publico';
    });
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu() {
    this.menuAbierto = false;
  }

  logout() {
    this.auth.logout();
    this.rolActual = 'publico';
  }

  descargarApp() {
    this.appService.descargarApp()
    .subscribe((archivo) => {
      const blob = new Blob([archivo], {
        type: 'application/vnd.android.package-archive'
      });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'PawFeeder.apk';
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }

}