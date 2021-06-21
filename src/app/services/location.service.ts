import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Promise<any>{
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        response => {
          resolve(
            {lng: response.coords.longitude, lat: response.coords.latitude}
          );
        },
        err => {
          reject(err);
        }
      );
    });
  }
}
