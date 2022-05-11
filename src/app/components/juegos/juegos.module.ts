import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JuegosRoutingModule } from './juegos-routing.module';
import { FormsModule } from '@angular/forms';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { LogleComponent } from '../logle/logle.component';
import { MayoromenorComponent } from '../mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';


@NgModule({
  declarations: [
    LogleComponent,
    AhorcadoComponent,
    MayoromenorComponent,
    PreguntadosComponent
  ],
  imports: [
    CommonModule,
    JuegosRoutingModule,
    FormsModule
  ]
})
export class JuegosModule { }
