import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    aceptaTerminos: new FormControl(false, [Validators.requiredTrue])
  });

  errorMsg = '';
  successMsg = '';
  cargando = false;

  paso = 'form';
  emailRegistrado = '';
  codigo = '';
  verificando = false;
  reenviando = false;

  constructor(private auth: AuthService) {}

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, apellido, email, password, confirmPassword } = this.registerForm.value;

      if (password !== confirmPassword) {
        this.errorMsg = 'Las contraseñas no coinciden.';
        return;
      }

      this.cargando = true;
      this.errorMsg = '';
      this.successMsg = '';

      this.auth.register(`${nombre} ${apellido}`.trim(), email!, password!).subscribe({
        next: (resp) => {
          this.cargando = false;
          this.successMsg = resp.mensaje;
          this.emailRegistrado = email!;
          this.paso = 'otp';
          console.log('Registro exitoso:', resp);
        },
        error: (err) => {
          this.cargando = false;
          this.errorMsg = err.error?.mensaje ?? 'No se pudo crear la cuenta. Intenta de nuevo.';
        }
      });
    } else {
      alert("Por favor, llena correctamente todos los campos y acepta los términos.");
    }
  }

  onVerificar() {
    if (this.codigo.length !== 6) {
      this.errorMsg = 'El código debe tener 6 dígitos.';
      return;
    }
    this.verificando = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.auth.verificar(this.emailRegistrado, this.codigo).subscribe({
      next: (resp) => {
        this.verificando = false;
        this.successMsg = resp.mensaje;
        this.paso = 'listo';
      },
      error: (err) => {
        this.verificando = false;
        this.errorMsg = err.error?.mensaje ?? 'No se pudo verificar. Revisa el código.';
      }
    });
  }

  onReenviar() {
    this.reenviando = true;
    this.errorMsg = '';
    this.successMsg = '';
    this.auth.reenviar(this.emailRegistrado).subscribe({
      next: (resp) => {
        this.reenviando = false;
        this.successMsg = resp.mensaje;
      },
      error: (err) => {
        this.reenviando = false;
        this.errorMsg = err.error?.mensaje ?? 'No se pudo reenviar el código.';
      }
    });
  }
}
