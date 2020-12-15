import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayuscula';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent {

  //inyecta el servicio Router en el constructor
  constructor(private router: Router) { }

  guardarCambios(genero: generoCreacionDTO){
    //guarda
    //usa el servicio para redirigir despues de guardar
    console.log(genero);
    this.router.navigate(['/generos'])
  }
}