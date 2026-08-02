import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth';
import { UsuarioService } from '../../services/usuario';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class Profile implements OnInit {

  profileForm = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [Validators.required])
  });

  cargando = true;
  guardando = false;
  errorMsg = '';
  exitoMsg = '';
  rol = 'cliente';

  constructor(
    private auth: AuthService,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit(): void {
    const usuario = this.auth.currentUser;
    if (usuario) {
      this.rol = usuario.rol ?? 'cliente';
      this.profileForm.patchValue({ email: usuario.email });

      this.usuarioService.getUsuario(usuario.id).subscribe({
        next: (data) => {
          this.profileForm.patchValue({
            nombre: data.nombre,
            email: data.email,
            telefono: data.telefono ?? ''
          });
          this.cargando = false;
        },
        error: () => {
          this.profileForm.patchValue({ nombre: usuario.nombre });
          this.cargando = false;
          this.errorMsg = 'No se pudo cargar tu perfil desde el servidor.';
        }
      });
    } else {
      this.cargando = false;
    }
  }

  guardarPerfil() {
    if (this.profileForm.valid && this.auth.currentUser) {
      const usuario = this.auth.currentUser;
      const { nombre, telefono } = this.profileForm.value;

      this.guardando = true;
      this.errorMsg = '';
      this.exitoMsg = '';

      this.usuarioService.actualizarPerfil(usuario.id, nombre!, telefono!).subscribe({
        next: () => {
          this.guardando = false;
          this.exitoMsg = 'Perfil actualizado correctamente.';
          usuario.nombre = nombre!;
          localStorage.setItem('pawfeeder_user', JSON.stringify(usuario));
        },
        error: (err) => {
          this.guardando = false;
          this.errorMsg = err.error?.mensaje ?? 'No se pudo actualizar el perfil. Intenta de nuevo.';
        }
      });
    }
  }
}
