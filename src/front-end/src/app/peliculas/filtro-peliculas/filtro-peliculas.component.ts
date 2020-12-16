import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

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
    //para utilizar los cambios que ocurran en los campos del formulario
    this.form.valueChanges
    .subscribe(valores => {
      //resetea el buscador
      this.peliculas = this.peliculasOriginal;
      //console.log(valores);
      this.buscarPeliculas(valores);
    })
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
