import { Injectable } from '@angular/core';
import { generoDTO } from './genero';

@Injectable({
  //servicio sigleton
  providedIn: 'root'
})
export class GenerosService {

  constructor() { }

  public obtenerTodos(): generoDTO[]{
    return[{id: 1, nombre: 'Drama'}];
  }
}

