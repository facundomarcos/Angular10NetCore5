import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { actorCreacionDTO } from '../actor';
import { actorDTO } from '../actor';

@Component({
  selector: 'app-editar-actor',
  templateUrl: './editar-actor.component.html',
  styleUrls: ['./editar-actor.component.css']
})
export class EditarActorComponent implements OnInit {

  //servicio para obtener el id
  constructor(private activedRoute: ActivatedRoute) { }

  modelo: actorDTO = {nombre: 'Bruce Willis', fechaNacimiento: new Date(), foto: 'https://m.media-amazon.com/images/M/MV5BMjA0MjMzMTE5OF5BMl5BanBnXkFtZTcwMzQ2ODE3Mw@@._V1_UY317_CR27,0,214,317_AL_.jpg'}

  ngOnInit(): void {
    this.activedRoute.params.subscribe(params => {
      //alert(params.id)
    })
  }

  guardarCambios(actor: actorCreacionDTO){
    console.log(actor);
  }

}
