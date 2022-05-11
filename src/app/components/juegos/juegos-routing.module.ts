import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from '../ahorcado/ahorcado.component';
import { LogleComponent } from '../logle/logle.component';
import { MayoromenorComponent } from '../mayoromenor/mayoromenor.component';
import { PreguntadosComponent } from '../preguntados/preguntados.component';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  {path: 'logle', component: LogleComponent},
  {path: 'ahorcado', component: AhorcadoComponent},
  {path: 'mayoromenor', component: MayoromenorComponent},
  {path: 'preguntados', component: PreguntadosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
