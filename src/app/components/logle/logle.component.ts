import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-logle',
  templateUrl: './logle.component.html',
  styleUrls: ['./logle.component.scss']
})
export class LogleComponent implements OnInit {

  letrasFUno:Array<string> = ["Q", "W", "E", "R", "T", "Y", "U",
   "I", "O", "P"];

   letrasFDos:Array<string> = ["A", "S", "D", "F", 
   "G", "H", "J", "K", "L", "Ñ"];

   letrasFTres:Array<string> = ["Borrar", "Z", 
   "X", "C", "V", "B", "N", "M", "Enviar"];

  palabraFormada:string = "";
  logos:any = [{"nombre":"PLAYSTATION", "mostrado": false}, {"nombre":"LOGITECH", "mostrado": false}, {"nombre":"APPLE", "mostrado": false}, 
  {"nombre":"STEAM", "mostrado": false}, {"nombre":"MCDONALDS", "mostrado": false}, {"nombre":"PEPSI", "mostrado": false}, 
   {"nombre":"DISCORD", "mostrado": false}, {"nombre":"AIRBNB", "mostrado": false}, {"nombre":"CARREFOUR", "mostrado": false}];
  palabras:Array<string> = [];
  logoRandom:any;
  fragmentosLogo:Array<string> = [];
  fragmentosMostrar:Array<string> = [];
  intento:number = 0;
  puntos: number = 0;
  usuario:any;

  constructor(private router:Router, private userService:UserServiceService) 
  { 
    this.ElegirLogo();

    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuario = data.filter((user:any)=>user.email == this.userService.userLogueado.email);
    });
  }

  ngOnInit(): void {}

  ElegirLogo()
  {
    let index = Math.floor(Math.random() * (8 - 0 + 1)) + 0;
    
    this.logoRandom = this.logos[index];

    if(!this.logoRandom.mostrado)
    {
      this.logoRandom.mostrado = true;
      this.logos[index] = this.logoRandom; 

      for(let i = 1; i < 5; i++)
      {
        this.fragmentosLogo.push(`${this.logoRandom.nombre.toLowerCase()}.${i}.png`);
        this.fragmentosMostrar.push('fondo.png');
      }

      this.fragmentosMostrar[0] = this.fragmentosLogo[0];
    }
    else
    {
      this.ElegirLogo();
    }
  }

  CambiarLetra(letra:string)
  {
    if(letra == "Enviar" && this.palabras.length != 3)
    {
      this.Enviar();
    }
    else
    {
      if(letra == "Borrar")
      {
        this.palabraFormada = this.palabraFormada.slice(0, -1);
      }
      else
      {
        if(this.logoRandom.nombre.length > this.palabraFormada.length && this.palabras.length != 3)
        {
          this.palabraFormada += letra;
        }
      }
    }
  }

  Enviar()
  {
    this.palabras.push(this.palabraFormada);

    document.getElementById("Enviar")?.setAttribute("disabled", '');
    
    for(let i = 0; i < this.palabraFormada.length; i++)
    {
      for(let j = 0; j < this.logoRandom.nombre.length; j++)
      {
        if(this.palabraFormada[i] == this.logoRandom.nombre[j])
        {
          document.getElementById(this.palabraFormada[i])?.style.setProperty('background-color', '#69d57b');
          document.getElementById(this.palabraFormada[i])?.style.setProperty('border-color', '#69d57b');
          break;
        }
        else
        {
          document.getElementById(this.palabraFormada[i])?.style.setProperty('background-color', '#a1a1a1');
          document.getElementById(this.palabraFormada[i])?.style.setProperty('border-color', '#6a6a6a');
        }
      }
    }

    if(this.palabraFormada == this.logoRandom.nombre)
    {
      this.fragmentosMostrar = this.fragmentosLogo;
      document.getElementById("3")?.classList.add("flip-in-ver-left");
      document.getElementById("2")?.classList.add("flip-in-ver-left");
      document.getElementById("1")?.classList.add("flip-in-ver-left");

      this.puntos++;

      document.getElementById("puntos")?.classList.add("pulsate-fwd");

      setTimeout(() => {
        document.getElementById("puntos")?.classList.remove("pulsate-fwd"); 
      }, 1000);
      
      if(this.puntos != 9)
      {
        setTimeout(() => {
          Swal.fire({
            title: '¡Ganaste!',
            text: "El logo es de '"+ this.logoRandom.nombre +"'.",
            icon: 'success',
            position: 'center',
            confirmButtonColor: '#4add87',
            confirmButtonText: 'Otro logo',
            showCancelButton: true,
            cancelButtonColor: '#ca4949',
            cancelButtonText: 'Volver al menú',
            allowOutsideClick: false,
            allowEscapeKey: false
          }).then((result)=>{
            if(result.isConfirmed)
            {
              this.ReiniciarJuego();
            }
            else
            {
              this.ActualizarPuntaje();
              
              Swal.fire({
                title:"Puntuación: " + this.puntos + "<br>Mayor puntuación: " + this.usuario[0].puntajeLogle
              })
              
              this.router.navigateByUrl('home');
            }
          });
        }, 1500);
      }
      else
      {
        setTimeout(() => {
          Swal.fire({
            title: '¡Felicitaciones!',
            text: "Completaste el juego.",
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
              this.puntos = 0;
              this.ReiniciarPalabras();
              this.ReiniciarJuego();
            }
            else
            {
              this.ActualizarPuntaje();
              
              Swal.fire({
                title:"Puntuación: " + this.puntos + "<br>Mayor puntuación: " + this.usuario[0].puntajeLogle
              })
              
              this.router.navigateByUrl('home');
            }
          });
        }, 500);
      }
    }
    else
    {
      this.intento++;

      this.fragmentosMostrar[this.intento] = this.fragmentosLogo[this.intento];
      document.getElementById(this.intento.toString())?.classList.add("flip-in-ver-left");
      this.palabraFormada = '';

      if(this.intento > 2)
      {
        this.ActualizarPuntaje();

        setTimeout(() => {
          Swal.fire({
            title: '¡Te quedaste sin intentos!',
            html: "El logo era de '"+ this.logoRandom.nombre +"'<br>Puntuación: " + this.puntos + "<br>Mayor puntuación: "+ this.usuario[0].puntajeLogle,
            icon: 'error',
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
              this.puntos = 0;
              this.ReiniciarPalabras();
              this.ReiniciarJuego();
            }
            else
            {
              this.router.navigateByUrl('home');
            }
          });
        }, 1500);
      }
      else
      {
        document.getElementById("Enviar")?.removeAttribute("disabled");
      }
    }
  }

  ReiniciarJuego()
  {
    let letras = this.letrasFUno.concat(this.letrasFDos, this.letrasFTres);

    for(let letra of letras)
    {
      document.getElementById(letra)?.style.setProperty('background-color', '#f8f9fa');
      document.getElementById(letra)?.style.setProperty('border-color', '#f8f9fa');
    }

    for(let i = 0; i < 4; i++)
    {
      document.getElementById(i.toString())?.classList.remove("flip-in-ver-left");
    }

    document.getElementById("Enviar")?.removeAttribute("disabled");

    this.palabraFormada = '';
    this.intento = 0;
    this.palabras = [];
    this.fragmentosLogo = [];
    this.fragmentosMostrar = [];

    this.ElegirLogo();
  }

  ActualizarPuntaje()
  {
    if(this.puntos > this.usuario[0].puntajeLogle)
    {
      this.usuario[0].puntajeLogle = this.puntos;
      this.userService.EditarRegistro(this.usuario[0].id,{"puntajeLogle":this.puntos});
    }
  }

  ReiniciarPalabras()
  {
    for(let i = 0; i < 9; i++)
    {
      this.logos[i].mostrado = false;
    }
  }
}
