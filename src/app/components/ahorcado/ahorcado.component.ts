import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ahorcado',
  templateUrl: './ahorcado.component.html',
  styleUrls: ['./ahorcado.component.scss']
})
export class AhorcadoComponent implements OnInit {

  letrasFUno:Array<string> = ["Q", "W", "E", "R", "T", "Y", "U",
   "I", "O", "P"];

   letrasFDos:Array<string> = ["A", "S", "D", "F", 
   "G", "H", "J", "K", "L", "Ñ"];

   letrasFTres:Array<string> = ["Z", 
   "X", "C", "V", "B", "N", "M", "Enviar"];

   palabras:Array<string> = ["MANZANA", "ZAPATO" ,"ARBOL", "TECLADO",
   "MONITOR", "CELULAR", "MICROFONO", "MUEBLE", "SILLA", "LAMPARA", 
   "CORTINA", "VENTANA", "EDIFICIO", "MARIPOSA", "PAJARO", "ZORRO", 
   "PANDA", "JIRAFA", "ELEFANTE", "TIGRE", "LAGARTO", "VENTILADOR", 
   "TERMO", "PELUCHE", "TRACTOR", "TELEFONO", "AERONAVE", "SUBMARINO", 
   "PILETA", "MANDARINA", "MELON", "LECHUGA", "GASEOSA", "BICICLETA", "TELEVISOR"];
  
  palabraRandom:string = "";
  letraElegida:string = "A";
  palabraFormada:Array<string> = [];
  fallos:number = 1;
  puntaje:number = 0;
  usuario:any;
  palabrasUsadas:Array<string> = [];

  constructor(private router:Router, private userService:UserServiceService) { 
    this.CrearPalabra();

    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuario = data.filter((user:any)=>user.email == this.userService.userLogueado.email);
    });
  }

  ngOnInit(): void {}

  CrearPalabra()
  {
    this.palabraFormada = [];
    this.palabraRandom = this.palabras[Math.floor(Math.random() * ((this.palabras.length - 1) - 0 + 1)) + 0];

    let letras = this.letrasFUno.concat(this.letrasFDos, this.letrasFTres);

    if(this.palabrasUsadas.find(palabra => palabra == this.palabraRandom) == undefined)
    {
      this.palabrasUsadas.push(this.palabraRandom);

      for(let letra of letras)
      {
        document.getElementById(letra)?.style.setProperty('background-color', '#f8f9fa');
        document.getElementById(letra)?.style.setProperty('border-color', '#f8f9fa');
      }
  
      for(let i = 0; i < this.palabraRandom.length; i ++)
      {
        this.palabraFormada[i] = "_ "
      }
  
      this.fallos = 1;
    }
    else
    {
      if(this.palabrasUsadas.length == this.palabras.length)
      {
        this.ActualizarPuntaje();

        Swal.fire({
          title: '¡Completaste el juego!',
          html: "Puntuación: " + this.puntaje + "<br>Mayor puntuación: " + this.usuario[0].puntajeAhorcado,
          icon: 'success',
          position: 'center',
          confirmButtonColor: '#4add87',
          confirmButtonText: 'Jugar otra vez',
          showCancelButton: true,
          cancelButtonColor: '#ca4949',
          cancelButtonText: 'Volver al menú',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result)=>{
          if(result.isConfirmed)
          {
            this.puntaje = 0;
            this.palabrasUsadas = [];
            this.CrearPalabra();
          }
          else
          {
            this.router.navigateByUrl('home');
          }
        });
      }
      else
      {
        this.CrearPalabra();
      }
    }
  }

  Enviar()
  {
    let encontro = false;
    let gano = true;

    for(let i = 0; i < this.palabraRandom.length; i ++)
    {
      if(this.palabraRandom[i] == this.letraElegida)
      {
        this.palabraFormada[i] = this.letraElegida;
        document.getElementById(this.letraElegida)?.style.setProperty('background-color', '#69d57b');
        document.getElementById(this.letraElegida)?.style.setProperty('border-color', '#69d57b');
        encontro = true;
      }
    }

    if(!encontro)
    {
      this.fallos++;

      document.getElementById(this.letraElegida)?.style.setProperty('background-color', '#a1a1a1');
      document.getElementById(this.letraElegida)?.style.setProperty('border-color', '#6a6a6a');

      if(this.fallos == 7)
      {
        this.ActualizarPuntaje();

        Swal.fire({
          title: '¡Te quedaste sin vidas!',
          html: "La palabra era '"+ this.palabraRandom +"'." + "<br>Puntuación: " + this.puntaje + "<br>Mayor puntuación: " + this.usuario[0].puntajeAhorcado,
          icon: 'error',
          position: 'center',
          confirmButtonColor: '#4add87',
          confirmButtonText: 'Reintentar',
          showCancelButton: true,
          cancelButtonColor: '#ca4949',
          cancelButtonText: 'Volver al menú',
          allowOutsideClick: false,
          allowEscapeKey: false
        }).then((result)=>{
          if(result.isConfirmed)
          {
            this.puntaje = 0;
            this.CrearPalabra();
          }
          else
          {
            this.router.navigateByUrl('home');
          }
        });
      }
    }

    for(let i = 0; i < this.palabraRandom.length; i ++)
    {
      if(this.palabraFormada[i] == "_ ")
      {
        gano = false;
        break;
      }
    }

    if(gano)
    {
      this.puntaje++;

      document.getElementById("puntos")?.classList.add("pulsate-fwd");

      setTimeout(() => {
        document.getElementById("puntos")?.classList.remove("pulsate-fwd"); 
      }, 1000);
      
      Swal.fire({
        title: '¡Ganaste!',
        text: "La palabra es '"+ this.palabraRandom +"'.",
        icon: 'success',
        position: 'center',
        confirmButtonColor: '#4add87',
        confirmButtonText: 'Jugar otra vez',
        showCancelButton: true,
        cancelButtonColor: '#ca4949',
        cancelButtonText: 'Volver al menú',
        allowOutsideClick: false,
        allowEscapeKey: false
      }).then((result)=>{
        if(result.isConfirmed)
        {
          this.CrearPalabra();
        }
        else
        {
          this.ActualizarPuntaje();

          Swal.fire({
            title:"Puntuación: " + this.puntaje + "<br>Mayor puntuación: " + this.usuario[0].puntajeAhorcado
          })

          this.router.navigateByUrl('home');
        }
      });
    }
  }

  CambiarLetra(letra:string)
  {
    if(letra == "Enviar")
    {
      this.Enviar();
    }
    else
    {
      this.letraElegida = letra;
    }
  }

  Reiniciar()
  {
    this.fallos = 6;
    this.palabrasUsadas = [];
    this.letraElegida = "";
    this.Enviar();
  }

  ActualizarPuntaje()
  {
    if(this.puntaje > this.usuario[0].puntajeAhorcado)
    {
      this.usuario[0].puntajeAhorcado = this.puntaje;
      this.userService.EditarRegistro(this.usuario[0].id,{"puntajeAhorcado":this.puntaje});
    }
  }
}
