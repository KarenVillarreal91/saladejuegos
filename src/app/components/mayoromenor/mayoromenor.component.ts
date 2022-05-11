import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-mayoromenor',
  templateUrl: './mayoromenor.component.html',
  styleUrls: ['./mayoromenor.component.scss']
})
export class MayoromenorComponent implements OnInit {

  cartas:Array<string> = ["oro-1.png","oro-2.png","oro-3.png","oro-4.png","oro-5.png","oro-6.png","oro-7.png","oro-8.png","oro-9.png","oro-10.png","oro-11.png","oro-12.png",
  "basto-1.png","basto-2.png","basto-3.png","basto-4.png","basto-5.png","basto-6.png","basto-7.png","basto-8.png","basto-9.png","basto-10.png","basto-11.png","basto-12.png",
  "espada-1.png","espada-2.png","espada-3.png","espada-4.png","espada-5.png","espada-6.png","espada-7.png","espada-8.png","espada-9.png","espada-10.png","espada-11.png","espada-12.png",
  "copa-1.png","copa-2.png","copa-3.png","copa-4.png","copa-5.png","copa-6.png","copa-7.png","copa-8.png","copa-9.png","copa-10.png","copa-11.png","copa-12.png"];

  revelar:boolean = false;
  cartaRandom:string = "";
  cartaAnterior:string = "";
  puntos:number = 0;
  valorCartaActual:number = 0;
  valorCartaAnterior:number = 0;
  usuario:any;

  constructor(private router:Router, private userService:UserServiceService) 
  {
    this.EmpezarJuego();

    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuario = data.filter((user:any)=>user.email == this.userService.userLogueado.email);
    });
  }

  ngOnInit(): void {}

  EmpezarJuego()
  {
    this.puntos = 0;
    this.cartaRandom = this.cartas[Math.floor(Math.random() * (47 - 0 + 1)) + 0];
    this.valorCartaAnterior = this.TransformarValor(this.cartaRandom);
    this.cartaAnterior = this.cartaRandom;
    this.cartaRandom = this.cartas[Math.floor(Math.random() * (47 - 0 + 1)) + 0];
    this.valorCartaActual = this.TransformarValor(this.cartaRandom);
  }

  SacarCarta()
  {
    document.getElementById("puntos")?.classList.add("pulsate-fwd");
    
    setTimeout(() => {
      document.getElementById("puntos")?.classList.remove("pulsate-fwd"); 
    }, 1000);

    this.cartaAnterior = this.cartaRandom;
    this.cartaRandom = this.cartas[Math.floor(Math.random() * (47 - 0 + 1)) + 0];
    this.valorCartaAnterior = this.valorCartaActual;
    this.valorCartaActual = this.TransformarValor(this.cartaRandom);
  }

  TransformarValor(carta:string)
  {
    let split1 = carta.split("-");
    let split2 = split1[1].split(".");
    return Number(split2[0]);
  }

  Mayor()
  {
    this.revelar = true;
    setTimeout(() => {
      this.revelar = false;
      if(this.valorCartaAnterior <= this.valorCartaActual)
      {
        this.puntos++;

        this.SacarCarta();
      }
      else
      {
        this.Perder();
      }
    }, 2800);
  }

  Menor()
  {
    this.revelar = true;
    setTimeout(() => {
      this.revelar = false;
      if(this.valorCartaAnterior >= this.valorCartaActual)
      {
        this.puntos++;
        this.SacarCarta();
      }
      else
      {
        this.Perder();
      }
    }, 2800);
  }

  Perder()
  {
    if(this.puntos > this.usuario[0].puntajeMayorMenor)
    {
      this.usuario[0].puntajeMayorMenor = this.puntos;
      this.userService.EditarRegistro(this.usuario[0].id,{"puntajeMayorMenor":this.puntos});
    }

    Swal.fire({
      title: '¡Perdiste!',
      html: "El valor de la carta era " + this.valorCartaActual + ".<br>Puntuación: " + this.puntos + "<br>Mayor puntuación: " + this.usuario[0].puntajeMayorMenor,
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
        this.EmpezarJuego();
      }
      else
      {
        this.router.navigateByUrl('home');
      }
    });
  }
}

