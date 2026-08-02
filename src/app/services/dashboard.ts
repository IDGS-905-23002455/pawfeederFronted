import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { timeout, retry, catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = `${environment.apiUrl}/Dashboard`;
  private http = inject(HttpClient);

  getDashboardCliente(usuarioId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/cliente/${usuarioId}`).pipe(
      timeout(15000),
      retry(2)
    );
  }

  getComida7Dias(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/cliente/${usuarioId}/comida-7-dias`).pipe(
      timeout(15000)
    );
  }

  getDashboardAdmin(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/admin`).pipe(
      timeout(15000),
      retry(2)
    );
  }
}
