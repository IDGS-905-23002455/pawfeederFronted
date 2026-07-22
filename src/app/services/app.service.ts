import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {


  private apiUrl = 'https://localhost:7122/DownloadApp';


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