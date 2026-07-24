import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Dispensador {

  id: number;

  usuarioId: number;

  nombre: string;

  codigoUnico: string;

  firmwareVersion: string;

  estado: string;

  bateriaPercent: number;

  nivelTolvaPct: number;

  ssidWifi?: string;

  activo: boolean;

  lastPingAt?: Date;

}



@Injectable({
  providedIn: 'root'
})
export class DispensadorService {


  private apiUrl =
  'https://localhost:7122/api/Dispensadores';



  constructor(
    private http: HttpClient
  ) {}



  // Obtener todos los dispositivos

  getDispensadores(): Observable<Dispensador[]> {

    return this.http.get<Dispensador[]>(
      this.apiUrl
    );

  }



  // Obtener uno por id

  getDispensador(id:number): Observable<Dispensador>{

    return this.http.get<Dispensador>(
      `${this.apiUrl}/${id}`
    );

  }



  // Crear hardware

  crearDispensador(
    dispensador:Dispensador
  ){

    return this.http.post<Dispensador>(
      this.apiUrl,
      dispensador
    );

  }



  // Actualizar hardware

  actualizarDispensador(
    id:number,
    dispensador:Dispensador
  ){

    return this.http.put(
      `${this.apiUrl}/${id}`,
      dispensador
    );

  }



  // Eliminar hardware

  eliminarDispensador(id:number){

    return this.http.delete(
      `${this.apiUrl}/${id}`
    );

  }


}