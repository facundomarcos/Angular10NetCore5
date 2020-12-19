//tuve un error en el boton de guardado que no pude resolver
//busque en git y lo resolvi compiando el componente de
//https://github.com/Gefermanpernia/front-end--Curso-de-Gavilanch--Angular10ASP.NET
//que tiene el curso bastante avanzado
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDTO } from '../cine';

@Component({
  selector: 'app-formulario-cine',
  templateUrl: './formulario-cine.component.html',
  styleUrls: ['./formulario-cine.component.css'],
})
export class FormularioCineComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  form: FormGroup;

  @Input()
  modelo: cineCreacionDTO;

  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  //coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
     
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      //this.coordenadaInicial.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud});
    }
  }

 // coordenadaSeleccionada(coordenada: Coordenada){
   // this.form.patchValue(coordenada);
  //}

  OnSubmit() {
    this.guardarCambios.emit(this.form.value);
  }
}
