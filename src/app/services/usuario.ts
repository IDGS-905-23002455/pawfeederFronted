import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Usuario {

  id: number;
  nombre: string;
  email: string;
  telefono: string;
  activo: boolean;

}



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  private apiUrl = 'https://localhost:7122/api/Usuarios';



  constructor(
    private http: HttpClient
  ) {}



  // Obtener usuarios
  getUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.apiUrl);

  }



  // Actualizar estado del usuario
  actualizarEstado(
    id:number,
    activo:boolean
  ):Observable<any>{


    return this.http.put(

      `${this.apiUrl}/${id}/estado`,

      {
        activo: activo
      }

    );

  }


}