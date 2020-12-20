import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
    //location permite reescribir la url
    private location: Location,
    //para leer los valore de location que se ecribieron como parametros de busqueda
    private activatedRoute: ActivatedRoute) { }

  form: FormGroup

  generos = [{id: 1, nombre: 'Drama'},
  { id: 2, nombre: 'Comedia'},
  { id: 3, nombre: 'Acción'}
];

  peliculas = [
    {titulo: 'The Amazing Spider-Man', enCines: false, proximosEstrenos: true, generos: [1,2], 
    poster: 'https://m.media-amazon.com/images/M/MV5BMjMyOTM4MDMxNV5BMl5BanBnXkFtZTcwNjIyNzExOA@@._V1_UX182_CR0,0,182,268_AL_.jpg'},

    {titulo: 'Moana', enCines: true, proximosEstrenos: false, generos: [3], 
    poster: 'https://m.media-amazon.com/images/M/MV5BMjI4MzU5NTExNF5BMl5BanBnXkFtZTgwNzY1MTEwMDI@._V1_UX182_CR0,0,182,268_AL_.jpg'},

    {titulo: 'Gone Girl', enCines: false, proximosEstrenos: false, generos: [1,3], 
    poster: 'https://m.media-amazon.com/images/M/MV5BMTk0MDQ3MzAzOV5BMl5BanBnXkFtZTgwNzU1NzE3MjE@._V1_UX182_CR0,0,182,268_AL_.jpg'}
  ]

  //para cuando use la función limpiar()
  peliculasOriginal = this.peliculas;

  formularioOriginal = {
    titulo: '',
    generoId:0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    //lee con los campos de busqueda
    this.leerValoresURL();
    //aplica la busqueda si la hay
    this.buscarPeliculas(this.form.value);
    //para utilizar los cambios que ocurran en los campos del formulario
    this.form.valueChanges
    .subscribe(valores => {
      //resetea el buscador
      this.peliculas = this.peliculasOriginal;
      //console.log(valores);
      this.buscarPeliculas(valores);
      this.escribirParametrosBusquedaEnURL();
    })
  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
      //objeto que se va a llenar con los valores de busqueda
      //any para que pueda recibir cualquier valor
      var objeto: any = {};

      if (params.titulo){
        objeto.titulo = params.titulo;
      }

      if (params.generoId){
        objeto.generoId = Number(params.generoId);
      }
      
      if (params.proximosEstrenos){
        objeto.proximosEstrenos =  params.proximosEstrenos;
      }

      if (params.enCines){
        objeto.enCines =  params.enCines;
      }

      //modifica con los datos del objeto
      this.form.patchValue(objeto);

    });
  }

  private escribirParametrosBusquedaEnURL(){
    var queryStrings = [];

    var valoresFormulario = this.form.value;

    if (valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }

    if (valoresFormulario.generoId != '0'){
      queryStrings.push(`generoId=${valoresFormulario.generoId}`);
    }

    if (valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }

    if (valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    //para reescribir la url con los parametros de busqueda
    this.location.replaceState('peliculas/buscar', queryStrings.join('&'));
  }

  buscarPeliculas(valores: any){
    if(valores.titulo){
      //filtro de titulo
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }
    if(valores.generoId !== 0){
      //filtro de genero
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoId) !== -1);
    }
    if(valores.proximosEstrenos){
      //filtro de proximos estrenos
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }
    if(valores.enCines){
      //filtro de encines
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
    
  }

  limpiar(){
    this.form.patchValue(this.formularioOriginal);
  }

}
