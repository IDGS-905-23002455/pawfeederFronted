import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile {

  // Cargamos los datos actuales del dueño del dispensador
  profileForm = new FormGroup({
    nombre: new FormControl('Paola', [Validators.required]),
    apellido: new FormControl('Gonzalez', [Validators.required]),
    email: new FormControl('paola@example.com', [Validators.required, Validators.email]),
    telefono: new FormControl('4771234567', [Validators.required]),
    arduinoId: new FormControl('PW-ARD-905X', [Validators.required]) // ID del hardware
  });

  guardarPerfil() {
    if (this.profileForm.valid) {
      console.log("Datos de perfil actualizados:", this.profileForm.value);
      alert("¡Perfil actualizado con éxito localmente!");
    }
  }
}
