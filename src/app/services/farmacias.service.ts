import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Encabezados HTTP
const cudOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
const cudOptionsXWWForm = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded'})
};
const cudOptionsHtml = {
  headers: new HttpHeaders({ 'Content-Type': 'text/html; charset=utf-8'})
};


@Injectable({
  providedIn: 'root'
})
export class FarmaciasService {

  private urlBase = environment.url;

  private apiGetFarmacias = this.urlBase + '/farmacias.php'
  private apiGetTurnos = this.urlBase + '/turnos.php'


  constructor(
    public http: HttpClient
  ) { }

  getFarmacias():Observable<any>{ 
    return this.http.get(this.apiGetFarmacias);
  }

  getFarmaciasTurno(fecha: Date):Observable<any>{
    let day = fecha.getDate()
    let month = fecha.getMonth() +1
    let year = fecha.getFullYear();
    return this.http.get(this.apiGetTurnos + '?fecha=' + year+'-'+month+'-'+day);
  }
}
