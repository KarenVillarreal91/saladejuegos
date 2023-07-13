import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  mensaje:string = "";
  mensajes:Array<any> = [];
  div:any;
  usuarios:any;

  constructor(public userService: UserServiceService, public datepipe: DatePipe) 
  { 
    this.userService.mensajes.subscribe((data)=>{
      this.mensajes = data.sort((a,b)=> a.sort - b.sort);
    });

    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuarios = data;
    });

    setTimeout(() => {
      this.div = document.getElementById("listado");
      this.div.scrollTop = this.div.scrollHeight;

      const node = document.getElementById("mensaje");
  
      node?.addEventListener("keyup", ({key}) =>{
        if(key == "Enter")
        {
          this.Enviar();
        }
      });
    }, 3000);
  }

  ngOnInit(): void {
  }

  Enviar()
  {
    let usuarioColor = this.usuarios.filter((user:any)=>user.email == this.userService.userLogueado.email);

    let userMsg = { 
      email: this.userService.userLogueado.email,
      mensaje: this.mensaje,
      hora: this.datepipe.transform((new Date), 'hh:mm'),
      color: usuarioColor[0].colorChat,
      sort: Date.now()
    }

    this.userService.MandarMensaje(userMsg);
    setTimeout(() => {
      this.div.scrollTop = this.div.scrollHeight;
    }, 100);

    this.mensaje = "";
  }
}
