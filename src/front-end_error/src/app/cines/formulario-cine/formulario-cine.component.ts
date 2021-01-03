//tuve un error en el boton de guardado que no pude resolver
//busque en git y lo resolvi compiando el componente de
//aparentemente fue un error en la linea donde esta declarado el formbuilder
//https://github.com/Gefermanpernia/front-end--Curso-de-Gavilanch--Angular10ASP.NET
//que tiene el curso bastante avanzado

//para los mapas se usa esta libreria LEAFLET
//https://github.com/Asymmetrik/ngx-leaflet
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada, CoordenadaConMensaje } from 'src/app/utilidades/mapa/coordenada';
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
  errores: string[] = [];

  @Input()
  modelo: cineCreacionDTO;

  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nombre: [
        '',
        {
          validators: [Validators.required],
        },
      ],
      latitud: [
        '',
        {validators: [Validators.required]}
      ],
      longitud: [
        '',
        {validators: [Validators.required]}
      ]
     
    });

    if (this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud});
    }
  }

  coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);
  }

  OnSubmit() {
    this.guardarCambios.emit(this.form.value);
  }
}
