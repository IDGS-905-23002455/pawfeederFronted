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
  ){}



  getUsuarios(): Observable<Usuario[]> {

    return this.http.get<Usuario[]>(this.apiUrl);

  }

}