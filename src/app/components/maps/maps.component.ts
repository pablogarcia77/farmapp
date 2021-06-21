import { Component, OnInit, ViewChild } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { Farmacia } from 'src/app/models/farmacia';
import { FarmaciasService } from 'src/app/services/farmacias.service';
import { LocationService } from 'src/app/services/location.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})
export class MapsComponent implements OnInit {

  public lista: Array<Farmacia>;

  options: google.maps.MapOptions = {
    center: {lat: -24.23161, lng: -64.86790},
    zoom: 14
  };

  public fecha!: Date;

  public viewMarkers: boolean = true;
  public viewDirections: boolean = true;

  public myPositionPin!: any;
  public myPos!: any;

  public datos!: any;

  directionsResults$!: Observable<google.maps.DirectionsResult|undefined>;

  constructor(
    private farmaciasService: FarmaciasService,
    private locationService: LocationService,
    private mapDirectionsService: MapDirectionsService
  ) {
    this.lista = new Array<Farmacia>();
    this.fecha = new Date();
  }

  

  ngOnInit(): void {
    this.getFarmacias(this.fecha);
    this.getMyPosition()
  }

  getMyPosition(){
    this.locationService.getPosition().then(
      pos => {
        this.myPos=pos;
        // console.log(pos)
        this.myPositionPin = new google.maps.LatLng(pos['lat'],pos['lng'])
      }
    )
  }

  getFarmacias(fecha: Date){
    this.lista = new Array<Farmacia>();
    this.farmaciasService.getFarmaciasTurno(fecha).subscribe(
      response => {
        response.forEach(
          (farm: any) => {
            let farmacia = new Farmacia();
            farmacia = farm;
            farmacia.posicion = new google.maps.LatLng(farm['lat']*1,farm['lng']*1)
            this.lista.push(farmacia);
          }
        )
        // console.log(this.lista);
      }
    )
  }

  addEvent(type: string, event: MatDatepickerInputEvent<Date>) {
    
    this.fecha= new Date(`${event.value}`);
    this.getFarmacias(this.fecha)
  }

  rutaOptima(farmacia: any){
    this.viewMarkers = false;
    this.viewDirections = true;
    // console.log(farmacia)
    // console.log(farmacia.posicion.lat())
    const request: google.maps.DirectionsRequest = {
      destination: {lat: farmacia.posicion.lat(), lng: farmacia.posicion.lng()},
      origin: this.myPos,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(
      map(
        (
          response => response.result
        )
      )
    )
    this.mapDirectionsService.route(request).subscribe(
      response => {
        // console.log(response.result?.routes[0].legs[0])
        this.datos=response.result?.routes[0].legs[0];
      }
    )

  }

  verFarmacias(){
    this.viewMarkers = true;
    this.viewDirections = false;
  }
}
