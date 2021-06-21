import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TurnosService {

  private urlBase = environment.url;

  private apiGetTurnos = this.urlBase + '/turnos.php'


  constructor(
    public http: HttpClient
  ) { }

  getFarmacias():Observable<any>{ 
    return this.http.get(this.apiGetTurnos);
  }

}
