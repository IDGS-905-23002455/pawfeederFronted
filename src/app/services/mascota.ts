import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class MascotaService {
  // Revisa que este puerto coincida con el que te abrió Swagger (7122)
  private apiUrl = 'https://localhost:7122/api/Mascotas'; 

  constructor(private http: HttpClient) { }

  // Método para ir por las mascotas del usuario a C#
  getMascotasPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }
}