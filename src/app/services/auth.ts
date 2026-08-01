import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

export interface UsuarioAuth {
  id: number;
  nombre: string;
  email: string;
  rol?: 'admin' | 'cliente';
}

export interface RegistroRespuesta {
  exito: boolean;
  mensaje: string;
  codigoPrueba?: string;
}

interface MockUser {
  email: string;
  password: string;
  usuario: UsuarioAuth;
}

const MOCK_USERS: MockUser[] = [
  {
    email: 'admin@pawfeeder.com',
    password: 'Admin123',
    usuario: { id: 1, nombre: 'Administrador', email: 'admin@pawfeeder.com', rol: 'admin' }
  },
  {
    email: 'cliente@pawfeeder.com',
    password: 'Cliente123',
    usuario: { id: 2, nombre: 'Cliente', email: 'cliente@pawfeeder.com', rol: 'cliente' }
  }
];

function getLocalStorage(): Storage | null {
  try {
    return typeof window !== 'undefined' && window.localStorage ? window.localStorage : null;
  } catch {
    return null;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.apiUrl}/Usuarios/login`;
  private currentUserSubject = new BehaviorSubject<UsuarioAuth | null>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    const storage = getLocalStorage();
    if (storage) {
      const stored = storage.getItem('pawfeeder_user');
      if (stored) {
        this.currentUserSubject.next(JSON.parse(stored));
      }
    }
  }

  login(email: string, password: string): Observable<UsuarioAuth> {
    return this.http.post<UsuarioAuth>(this.apiUrl, { email, password }).pipe(
      tap(usuario => {
        const u = this.asignarRol(usuario);
        this.guardarSesion(u);
      }),
      catchError(() => {
        const mock = MOCK_USERS.find(u => u.email === email && u.password === password);
        if (mock) {
          this.guardarSesion(mock.usuario);
          return of(mock.usuario);
        }
        throw new Error('Credenciales inválidas');
      })
    );
  }

  register(nombre: string, email: string, password: string): Observable<RegistroRespuesta> {
    return this.http.post<RegistroRespuesta>(`${environment.apiUrl}/auth/registro`, {
      nombre,
      email,
      password
    });
  }

  private guardarSesion(usuario: UsuarioAuth): void {
    const u = this.asignarRol(usuario);
    const storage = getLocalStorage();
    if (storage) {
      storage.setItem('pawfeeder_user', JSON.stringify(u));
    }
    this.currentUserSubject.next(u);
  }

  private asignarRol(usuario: UsuarioAuth): UsuarioAuth {
    if (!usuario.rol) {
      usuario.rol = usuario.email.toLowerCase().includes('admin') ? 'admin' : 'cliente';
    }
    return usuario;
  }

  logout(): void {
    const storage = getLocalStorage();
    if (storage) {
      storage.removeItem('pawfeeder_user');
    }
    this.currentUserSubject.next(null);
    this.router.navigate(['/']);
  }

  get isLoggedIn(): boolean {
    const storage = getLocalStorage();
    return !!storage && !!storage.getItem('pawfeeder_user');
  }

  get role(): 'admin' | 'cliente' | null {
    return this.currentUserSubject.value?.rol ?? null;
  }

  get currentUser(): UsuarioAuth | null {
    return this.currentUserSubject.value;
  }
}
