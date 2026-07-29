import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  errorMsg = '';

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    if (this.loginForm.invalid) {
      alert("Por favor, llena todos los campos correctamente.");
      return;
    }

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: (usuario) => {
        if (usuario.rol === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/mascotas']);
        }
      },
      error: () => {
        this.errorMsg = 'Credenciales inválidas. Intenta de nuevo.';
      }
    });
  }
}
