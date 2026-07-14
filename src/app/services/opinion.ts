import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Opinion } from '../components/reviews/opinion';

@Injectable({
  providedIn: 'root'
})
export class OpinionService {
  private apiUrl = 'https://localhost:7122/api/Opiniones';

  constructor(private http: HttpClient) { }

  getOpiniones(): Observable<Opinion[]> {
    return this.http.get<Opinion[]>(this.apiUrl);
  }

  crearOpinion(opinion: Opinion): Observable<Opinion> {
    return this.http.post<Opinion>(this.apiUrl, opinion);
  }
}
