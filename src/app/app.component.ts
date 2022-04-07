import { Component } from '@angular/core';
//import { stringify } from 'querystring';
//import * as internal from 'stream';
import { Usuario } from './entidades/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'proyecto1-lab'; 
  usuario = new Usuario();

  edadUno : string = '';
  edadDos : string = '';
  promedio : string = '';
  suma : string = '';

  mostrar() : void
  {
    this.suma = String(parseInt(this.edadUno) + parseInt(this.edadDos));
    this.promedio = String(parseInt(this.suma) / 2);
    //this.title = "aaaa";
    //console.info("titulo: ", this.title);
    //console.info(this.usuario);
  }
}
