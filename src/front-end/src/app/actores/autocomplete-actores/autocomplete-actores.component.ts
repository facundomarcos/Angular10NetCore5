import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();

  actores = [
    {nombre: 'Jack Black', foto: 'https://m.media-amazon.com/images/M/MV5BZDhlMmNmMDMtZmQ2Zi00M2FlLTg2MjEtNjZjNGI3M2ZmZTc1XkEyXkFqcGdeQXVyNjMxNzQ2NTQ@._V1_UY268_CR20,0,182,268_AL_.jpg'},
    {nombre: 'Adam Sandler', foto: 'https://m.media-amazon.com/images/M/MV5BMjQyNzM2MjM1Ml5BMl5BanBnXkFtZTcwMDE5NjI3Mg@@._V1_UY317_CR7,0,214,317_AL_.jpg'},
    {nombre: 'Angelina Jolie', foto: 'https://m.media-amazon.com/images/M/MV5BODg3MzYwMjE4N15BMl5BanBnXkFtZTcwMjU5NzAzNw@@._V1_UY317_CR22,0,214,317_AL_.jpg'},
];

actoresOriginal = this.actores;

actoresSeleccionados = [];

  ngOnInit(): void {
    //observable asociado al textbox
      this.control.valueChanges.subscribe(valor => {
      this.actores = this.actoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1);
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
  }
}
