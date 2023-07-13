import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.scss']
})
export class PreguntadosComponent implements OnInit {

  preguntasHistoria:any = [{"pregunta":"¿En qué año descubrió Cristóbal Colón, América?","respuestas":["1492","1592","1498","1564"],"correcta":"1492", "mostrado": false},
  {"pregunta":"¿Quién dijo que la tierra giraba alrededor del sol?","respuestas":["Galileo Galilei","Nicolás Copérnico","Aristarco de Samos","Todos los anteriores"],"correcta":"Aristarco de Samos", "mostrado": false},
  {"pregunta":"¿Quién fue la primera persona que pisó la luna?","respuestas":["Valentina Tereshckova","Neil Amstrong","Buzz Aldrin","Yuri Gagarin"],"correcta":"Neil Amstrong", "mostrado": false},
  {"pregunta":"¿En qué país se inició la Revolución Industrial?","respuestas":["Francia","Italia","Gran Bretaña","España"],"correcta":"Gran Bretaña", "mostrado": false},
  {"pregunta":"¿Qué volcán devastó Pompeya?","respuestas":["Etna","Vesubio","Santa Helena","Krakatoa"],"correcta":"Vesubio", "mostrado": false},
  {"pregunta":"¿Qué imperio conquistó el antiguo Egipto en el año 30 a.C.?","respuestas":["Otomano","Bizantino","Persa","Romano"],"correcta":"Romano", "mostrado": false},
  {"pregunta":"¿De qué nacionalidad era Ernesto Ché Guevara?","respuestas":["Mexicano","Colombiano","Boliviano","Argentino"],"correcta":"Argentino", "mostrado": false}];

  preguntasGeografia:any = [{"pregunta":"¿Qué idioma es el más hablado en el mundo?","respuestas":["Mandarín","Español","Ingles","Portugués"],"correcta":"Mandarín", "mostrado": false},
  {"pregunta":"¿Qué país es el más grande del mundo?","respuestas":["China","Rusia","Australia","Brasil"],"correcta":"Rusia", "mostrado": false},
  {"pregunta":"¿Cuál es la montaña más alta del mundo?","respuestas":["Mauna Kea","Aconcagua","Everest","K2"],"correcta":"Everest", "mostrado": false},
  {"pregunta":"¿Cuál de estos países NO pertenece a América?","respuestas":["Guyana","Surinam","Belice","Ghana"],"correcta":"Ghana", "mostrado": false},
  {"pregunta":"¿En qué continente queda Filipinas?","respuestas":["África","Europa","Asia","Oceanía"],"correcta":"Asia", "mostrado": false},
  {"pregunta":"¿En qué continente queda Marruecos?","respuestas":["África","Europa","Asia","Oceanía"],"correcta":"África", "mostrado": false},
  {"pregunta":"¿En qué continente queda Moldavia?","respuestas":["África","Europa","Asia","Oceanía"],"correcta":"Europa", "mostrado": false}];

  preguntasCiencia:any = [{"pregunta":"Los satélites Calisto, Europa, Ío y Ganímedes orbitan alrededor de un planeta. ¿Cuál es?","respuestas":["Marte","Satúrno","Júpiter","Tierra"],"correcta":"Júpiter", "mostrado": false},
  {"pregunta":"E=mc2 es una fórmula incluida en una teoría científica. ¿Cuál?","respuestas":["Relatividad","Atómica","Big Bang","Cuántica de campos"],"correcta":"Relatividad", "mostrado": false},
  {"pregunta":"¿Qué significa las siglas ADN?","respuestas":["Ácido Dadoribonucleico","Ácido Desoxirribonucleico","Ácido Dadonucleico","Ácido Dosnucleico"],"correcta":"Ácido Desoxirribonucleico", "mostrado": false},
  {"pregunta":"¿Qué es la monera?","respuestas":["Madriguera de monos","Reino de Organismos","Un planeta","Un virus"],"correcta":"Reino de Organismos", "mostrado": false},
  {"pregunta":"Marie Curie fue una científica muy famosa. ¿Qué descrubió?","respuestas":["Un planeta","Un virus","La gravedad","La radiactividad"],"correcta":"La radiactividad", "mostrado": false},
  {"pregunta":"¿Cuántos huesos tiene una persona adulta?","respuestas":["212","206","202","218"],"correcta":"206", "mostrado": false},
  {"pregunta":"Todos los componentes orgánicos comparten un mismo elemento. ¿Cuál?","respuestas":["Nitrógeno","Hidrógeno","Carbono","Oxígeno"],"correcta":"Carbono", "mostrado": false}];

  preguntasCine:any = [{"pregunta":"¿Quién es el actor o la actriz más joven en ganar un Óscar?","respuestas":["Jack Nicholson","Leonardo DiCaprio","Tatum O'Neal","Brad Pitt"],"correcta":"Tatum O'Neal", "mostrado": false},
  {"pregunta":"¿Cuál es el nombre del padre de Simba en El Rey León?","respuestas":["Scar","Sarabi","Mufasa","Pumba"],"correcta":"Mufasa","img":"Lion+King&y=2019", "mostrado": false},
  {"pregunta":"El Demogorgon es el antagonista de una serie de Netflix. ¿Cuál?","respuestas":["Squid Game","Dark","Stranger Things","La casa de papel"],"correcta":"Stranger Things", "mostrado": false},
  {"pregunta":"¿De qué película es el personaje Jack Sparrow?","respuestas":["Piratas de Caribe","El Rey León","La bella y la bestia","Peter Pan"],"correcta":"Piratas de Caribe", "mostrado": false},
  {"pregunta":"¿Cuál es el nombre real de Hulk?","respuestas":["Tony Stark","Bruce Banner","Steve Rogers","Peter Parker"],"correcta":"Bruce Banner","img":"Hulk&y=2008", "mostrado": false},
  {"pregunta":"¿Que instrumento toca Lisa en Los Simpsons?","respuestas":["Clarinete","Trompeta","Guitarra","Saxofón"],"correcta":"Saxofón","img":"The+Simpsons", "mostrado": false},
  {"pregunta":"¿Que hay en el logo de Universal?","respuestas":["Estatua","Montaña","Planeta","Castillo"],"correcta":"Planeta", "mostrado": false}];

  preguntas:any = [];
  preguntaRandom:any = "";
  intentos:number = 3;
  categoria:string = "";
  correctas:number = 0;
  mostrados:number = 0;
  intervalo:any;
  tiempo:number = 20;
  imagen:string = "";
  usuario:any;

  constructor(private router:Router, private userService:UserServiceService, private api:ApiService) 
  { 
    this.userService.TraerRegistros().subscribe((data)=>{
      this.usuario = data.filter((user:any)=>user.email == this.userService.userLogueado.email);
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void 
  {
    this.PararTiempo();
  }

  EmpezarTiempo() {
    this.intervalo = setInterval(() => {
      if(this.tiempo > 0) {
        this.tiempo--;
      } else {
        this.Respuesta("");
        this.tiempo = 20;
      }
    },1000)
  }
  
  PararTiempo() {
    clearInterval(this.intervalo);
  }

  TraerPoster(pelicula:string)
  {
    this.api.GetPelicula(pelicula).subscribe((data:any)=>{
      this.preguntaRandom.poster = data.Poster;
    });
  }

  ElegirCategoria(categoria:string)
  {
    this.categoria = categoria;

    if(categoria == "Historia")
    {
      this.preguntas = this.preguntasHistoria;
    }
    else if(categoria == "Geografía")
    {
      this.preguntas = this.preguntasGeografia;
    }
    else if(categoria == "Ciencia")
    {
      this.preguntas = this.preguntasCiencia;
    }
    else if(categoria == "Cine")
    {
      this.preguntas = this.preguntasCine;
    }
    else
    {
      this.preguntas = this.preguntasHistoria.concat(this.preguntasGeografia, this.preguntasCiencia, this.preguntasCine);
    }

    this.ElegirPregunta();
  }

  ElegirPregunta()
  {
    let index = Math.floor(Math.random() * ((this.preguntas.length - 1) - 0 + 1)) + 0;
    this.preguntaRandom = this.preguntas[index];

    if(!this.preguntaRandom.mostrado)
    {
      this.mostrados++;
      this.preguntas[index].mostrado = true;

      if(this.preguntaRandom.img)
      {
        this.TraerPoster(this.preguntaRandom.img);
      }
      
      this.EmpezarTiempo();
    }
    else
    {
      this.ElegirPregunta();
    }
  }

  Respuesta(respuesta:string)
  { 
    for(let resp of this.preguntaRandom.respuestas)
    {
      document.getElementById(resp)?.setAttribute("disabled", '');

      if(resp == this.preguntaRandom.correcta)
      {
        document.getElementById(resp)?.style.setProperty('background-color', '#54cd5d');
        document.getElementById(resp)?.style.setProperty('border-color', '#498f4e');
      }
    }
    
    this.PararTiempo();
    
    if(respuesta == this.preguntaRandom.correcta)
    {
      this.correctas++;
      this.imagen = "correcto";

      document.getElementById("puntos")?.classList.add("pulsate-fwd");
    
      setTimeout(() => {
        document.getElementById("puntos")?.classList.remove("pulsate-fwd"); 
      }, 1000);
    }
    else
    {
      document.getElementById(this.intentos.toString())?.classList.add("flicker-out-1");

      document.getElementById(respuesta)?.style.setProperty('background-color', '#f14d4d');
      document.getElementById(respuesta)?.style.setProperty('border-color', '#a73434');

      setTimeout(()=>{
        this.intentos--;
      }, 1200);
      
      this.imagen = "incorrecto";
    }

    
    setTimeout(() => {
      this.imagen = "";

      if(this.intentos > 0)
      {
        for(let resp of this.preguntaRandom.respuestas)
        {
          document.getElementById(resp)?.style.setProperty('background-color', '#F8F9FA');
          document.getElementById(resp)?.style.setProperty('border-color', '#F8F9FA');

          document.getElementById(resp)?.removeAttribute("disabled");
        }

        if(this.mostrados < this.preguntas.length)
        {
          this.tiempo = 20;
          this.ElegirPregunta();
        }
        else
        {
          Swal.fire({
            title: '¡Completaste la categoría!',
            html: "Puntuación: " + this.correctas + "<br>Mayor puntuación: " + this.usuario[0].puntajePreguntados,
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
              this.ReiniciarJuego();
            }
            else
            {
              this.router.navigateByUrl('home');
            }
          });
        }
      }
      else
      {
        if(this.correctas > this.usuario[0].puntajePreguntados)
        {
          this.usuario[0].puntajePreguntados = this.correctas;
          this.userService.EditarRegistro(this.usuario[0].id,{"puntajePreguntados":this.correctas});
        }

        Swal.fire({
          title: '¡Te quedaste sin vidas!',
          html: "Puntuación: " + this.correctas + "<br>Mayor puntuación: " + this.usuario[0].puntajePreguntados,
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
            this.ReiniciarJuego();
          }
          else
          {
            this.router.navigateByUrl('home');
          }
        });
      }
    }, 3000);
  }

  ReiniciarJuego()
  {
    for(let resp of this.preguntaRandom.respuestas)
    {
      document.getElementById(resp)?.style.setProperty('background-color', '#F8F9FA');
      document.getElementById(resp)?.style.setProperty('border-color', '#F8F9FA');

      document.getElementById(resp)?.removeAttribute("disabled");
    }

    this.preguntaRandom = '';
    this.intentos = 3;
    this.correctas = 0;
    this.categoria = '';
    this.mostrados = 0;
    this.tiempo = 20;

    for(let preg of this.preguntas)
    {
      preg.mostrado = false;
    }
  }
}
