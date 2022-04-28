import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BienvenidoRoutingModule } from './bienvenido-routing.module';
import { BienvenidoComponent } from './bienvenido.component';
import { JuegosComponent } from '../juegos/juegos.component';


@NgModule({
  declarations: [
    BienvenidoComponent,
    JuegosComponent
  ],
  imports: [
    CommonModule,
    BienvenidoRoutingModule
  ]
})
export class BienvenidoModule { }
