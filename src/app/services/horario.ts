import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario } from '../components/horario';

@Injectable({
  providedIn: 'root'
})
export class HorarioService {
  private apiUrl = 'https://localhost:7122/api/Horarios';

  constructor(private http: HttpClient) { }

getHorariosPorUsuario(usuarioId: number): Observable<Horario[]> {
    return this.http.get<Horario[]>(`${this.apiUrl}/Usuario/${usuarioId}`);
  }

  crearHorario(horario: Horario): Observable<Horario> {
    return this.http.post<Horario>(this.apiUrl, horario);
  }

  actualizarHorario(id: number, horario: Horario): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, horario);
  }

  eliminarHorario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
