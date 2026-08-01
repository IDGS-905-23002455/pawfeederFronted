import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  private apiUrl = `${environment.apiUrl.replace(/\/api$/, '')}/DownloadApp`;


  constructor(private http: HttpClient){}


  descargarApp(){

    return this.http.get(
      this.apiUrl,
      {
        responseType: 'blob'
      }
    );

  }

}