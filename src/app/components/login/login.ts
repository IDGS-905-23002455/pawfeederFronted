import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // <-- Importa esto

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // <-- Agrégalo aquí
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  // Definimos el grupo de datos del login
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  // Función que se ejecutará al dar clic en entrar
  onLogin() {
    if (this.loginForm.valid) {
      console.log("Datos del Login:", this.loginForm.value);
      // Aquí más adelante conectaremos con tu API de C#
    } else {
      alert("Por favor, llena todos los campos correctamente.");
    }
  }
}
