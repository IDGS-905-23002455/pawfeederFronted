import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';


export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  telefono?: string;
  activo: boolean;
  rol: string;
  verificado: boolean;
}



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private apiUrl = `${environment.apiUrl}/Usuarios`;


  constructor(
    private http: HttpClient
  ) {}



  // Obtener usuarios
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // Obtener un usuario por id
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // Actualizar perfil propio (nombre y teléfono)
  actualizarPerfil(id: number, nombre: string, telefono: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      { nombre: nombre, telefono: telefono }
    );
  }



  // Actualizar estado del usuario
  actualizarEstado(id: number, activo: boolean): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/estado`,
      { activo: activo }
    );
  }



  // Convertir cliente <-> admin
  cambiarRol(id: number, rol: string): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}/rol`,
      { rol: rol }
    );
  }



  // Verificar cuenta manualmente (admin)
  verificarCuenta(id: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}/verificar`, {});
  }
}
