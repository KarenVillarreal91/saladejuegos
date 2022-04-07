import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/entidades/usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  usuario = new Usuario();

  ngOnInit(): void {
  }

  mostrar() : void
  {
    console.info(this.usuario);
  }
}
