import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  // Definimos el grupo de datos para crear cuenta
  registerForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
    confirmPassword: new FormControl('', [Validators.required]),
    aceptaTerminos: new FormControl(false, [Validators.requiredTrue])
  });

  onRegister() {
    if (this.registerForm.valid) {
      console.log("Datos de Registro:", this.registerForm.value);
      // Próximamente se enviará a tu API de C#
    } else {
      alert("Por favor, llena correctamente todos los campos y acepta los términos.");
    }
  }
}
