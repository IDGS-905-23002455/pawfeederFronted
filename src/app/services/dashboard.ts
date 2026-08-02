import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/Dashboard`;
  private http = inject(HttpClient);

  getDashboardCliente(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cliente/${usuarioId}`);
  }

  getDashboardAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin`);
  }
}
