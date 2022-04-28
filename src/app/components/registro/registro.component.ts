import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import Swal from 'sweetalert2';
import { UserServiceService } from 'src/app/services/user-service.service';
import { Usuario } from 'src/app/entidades/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  email : string = "";
  clave : string = "";

  constructor(private firestore:AngularFirestore, private fireauth:AngularFireAuth, private userService: UserServiceService, private router: Router) { }

  ngOnInit(): void {
  }

  async Registro()
  {
    let date = new Date();
    let usuario = new Usuario(this.email,this.clave);
    let userLog = { 
      email: this.email,
      fecha: date.toLocaleString('es-ES',{dateStyle:'full'}) + ', ' + date.getHours() + ':' + date.getMinutes()
    }

    this.userService.Registro(usuario)
    .then((res:any)=>{
        this.userService.logueado = true;
        
        this.userService.SubirLog(userLog)
        .then(()=>{
        }).catch(error=>{
          console.log(error);
        });

        this.router.navigateByUrl('home');
    }).catch((error)=>{
      if(error.code == 'auth/email-already-in-use')
      {
        Swal.fire({
          title: 'Error',
          text: 'El correo ya está en uso.',
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
      else if(error.code == 'auth/weak-password')
      {
        Swal.fire({
          title: 'Error',
          text: 'La contraseña debe contener al menos 6 caracteres.',
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
      else
      {
        Swal.fire({
          title: 'Error',
          text: 'El mail o la contraseña no son válidos.',
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
