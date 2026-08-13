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
  cargando = false;
  mostrarPassword = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onLogin() {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const { email, password } = this.loginForm.value;
    this.cargando = true;
    this.errorMsg = '';

    this.auth.login(email!, password!).subscribe({
      next: (usuario) => {
        this.cargando = false;
        if (usuario.rol === 'admin') {
          this.router.navigate(['/dashboard']);
        } else {
          this.router.navigate(['/dashboard-cliente']);
        }
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = err?.error?.mensaje ?? 'Credenciales inválidas. Intenta de nuevo.';
      }
    });
  }

  emailMensaje(): string {
    const c = this.loginForm.controls.email;
    if (c.hasError('required')) return 'El correo es obligatorio.';
    if (c.hasError('email')) return 'Ingresa un correo válido.';
    return '';
  }

  passwordMensaje(): string {
    const c = this.loginForm.controls.password;
    if (c.hasError('required')) return 'La contraseña es obligatoria.';
    return '';
  }
}
