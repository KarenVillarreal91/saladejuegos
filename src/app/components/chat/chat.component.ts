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

  constructor(public userService: UserServiceService) 
  { 
    this.userService.mensajes.subscribe((data)=>{
      this.mensajes = data.sort((a,b)=> a.sort - b.sort);
    });

    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuarios = data;
    });

    setTimeout(() => {
      this.div = document.getElementById("chat");
      this.div.scrollTop = this.div.scrollHeight;
    }, 200);
  }

  ngOnInit(): void {
  }

  Enviar()
  {
    let date = new Date();

    let usuarioColor = this.usuarios.filter((user:any)=>user.email == this.userService.userLogueado.email);

    let userMsg = { 
      email: this.userService.userLogueado.email,
      mensaje: this.mensaje,
      hora: date.getHours() + ':' + date.getMinutes(),
      color: usuarioColor[0].colorChat,
      sort: Date.now()
    }

    this.userService.MandarMensaje(userMsg);
    setTimeout(() => {
      this.div.scrollTop = this.div.scrollHeight;
    }, 200);

    this.mensaje = "";
  }
}
