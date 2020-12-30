import { makeBindingParser } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatCheckboxRequiredValidator } from '@angular/material/checkbox';
import { latLng, LeafletMouseEvent, marker, Marker, tileLayer } from 'leaflet';
import { Coordenada, CoordenadaConMensaje } from './coordenada';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  constructor() { }


  @Input()
  coordenadasIniciales: CoordenadaConMensaje[] = [];

  @Input()
  soloLectura: boolean = false;

  @Output()
  coordenadaSeleccionada: EventEmitter<Coordenada> = new EventEmitter<Coordenada>();

  ngOnInit(): void {
    this.capas = this.coordenadasIniciales.map((valor) => {
     let marcador = marker([valor.latitud, valor.longitud]);
      if (valor.mensaje){
        marcador.bindPopup(valor.mensaje, {autoClose: false, autoPan: false});
      }
     return marcador;
    }
     );
  }

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
    ],
    zoom: 14,
    center: latLng(-34.921391904775035, -57.95454025748769)
  };

  //arreglo de marcadores en el mapa
  capas: Marker<any>[] =[];

  manejarClick(event: LeafletMouseEvent){
    
    //console.log({latitud, longitud});
    if (!this.soloLectura){
      const latitud = event.latlng.lat;
    const longitud = event.latlng.lng;
    this.capas = [];
    this.capas.push(marker([latitud, longitud]));
    this.coordenadaSeleccionada.emit({latitud: latitud, longitud: longitud});
    }
    
  }

  
}
