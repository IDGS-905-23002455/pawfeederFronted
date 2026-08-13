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
  codigoPrueba = '';
  verificando = false;
  reenviando = false;
  mostrarPassword = false;
  mostrarConfirm = false;

  constructor(private auth: AuthService) {}

  onRegister() {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) {
      return;
    }

    const { nombre, apellido, email, password, confirmPassword } = this.registerForm.value;

    if (password !== confirmPassword) {
      this.registerForm.controls.confirmPassword.setErrors({ noCoincide: true });
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
        this.codigoPrueba = resp.codigoPrueba ?? '';
        this.paso = 'otp';
        console.log('Registro exitoso:', resp);
      },
      error: (err) => {
        this.cargando = false;
        this.errorMsg = err.error?.mensaje ?? 'No se pudo crear la cuenta. Intenta de nuevo.';
      }
    });
  }

  nombreMensaje(): string {
    const c = this.registerForm.controls.nombre;
    if (c.hasError('required')) return 'El nombre es obligatorio.';
    return '';
  }

  apellidoMensaje(): string {
    const c = this.registerForm.controls.apellido;
    if (c.hasError('required')) return 'El apellido es obligatorio.';
    return '';
  }

  emailMensaje(): string {
    const c = this.registerForm.controls.email;
    if (c.hasError('required')) return 'El correo es obligatorio.';
    if (c.hasError('email')) return 'Ingresa un correo válido.';
    return '';
  }

  passwordMensaje(): string {
    const c = this.registerForm.controls.password;
    if (c.hasError('required')) return 'La contraseña es obligatoria.';
    if (c.hasError('minlength')) return 'La contraseña debe tener al menos 8 caracteres.';
    return '';
  }

  confirmMensaje(): string {
    const c = this.registerForm.controls.confirmPassword;
    if (c.hasError('required')) return 'Confirma tu contraseña.';
    if (c.hasError('noCoincide')) return 'Las contraseñas no coinciden.';
    return '';
  }

  terminosMensaje(): string {
    const c = this.registerForm.controls.aceptaTerminos;
    if (c.hasError('requiredTrue')) return 'Debes aceptar los términos y la privacidad.';
    return '';
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
        this.codigoPrueba = (resp as any).codigoPrueba ?? '';
        this.codigo = '';
      },
      error: (err) => {
        this.reenviando = false;
        this.errorMsg = err.error?.mensaje ?? 'No se pudo reenviar el código.';
      }
    });
  }
}
