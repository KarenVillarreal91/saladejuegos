import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entidades/usuario';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email : string = "";
  clave : string = "";

  constructor(private userService: UserServiceService, private router: Router) {
    this.userService.logueado = false;
    console.log(this.userService.logueado)
  }
  ngOnInit(): void {}

  async Login()
  {
    let date = new Date();
    let usuario = new Usuario(this.email,this.clave);
    let userLog = { 
      email: this.email,
      fecha: date.toLocaleString('es-ES',{dateStyle:'full'}) + ', ' + date.getHours() + ':' + date.getMinutes()
    }

    this.userService.login(usuario)
    .then((res:any)=>{
        this.userService.logueado = true;
        
        this.userService.SubirLog(userLog)
        .then(()=>{
        }).catch(error=>{
          console.log(error);
        });

        this.router.navigateByUrl('home');
    }).catch((error)=>{
      if(error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found')
      {
        Swal.fire({
          title: 'Error',
          text: 'Correo o contraseña son incorrectos.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/missing-email' || error.code == 'auth/internal-error' || usuario.email == "" || usuario.clave == "")
      {
        Swal.fire({
          title: 'Error',
          text: 'No pueden quedar campos vacíos.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/invalid-email')
      {
        Swal.fire({
          title: 'Error',
          text: 'Correo no válido.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else if(error.code == 'auth/too-many-requests')
      {
        Swal.fire({
          title: 'Error',
          text: 'Demasiados intentos fallidos. Reintente más tarde.',
          icon: 'warning',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      else
      {
        Swal.fire({
          title: 'Error',
          text: 'Credenciales incorrectas.',
          icon: 'error',
          timer: 2000,
          toast: true,
          backdrop: false,
          position: 'bottom',
          grow: 'row',
          timerProgressBar: true,
          showConfirmButton: false
        });
      }
      console.log(error.code);
    });
  }

  InicioAutomatico(email:any, password:any)
  {
    this.email = email;
    this.clave = password;
  } 
}
