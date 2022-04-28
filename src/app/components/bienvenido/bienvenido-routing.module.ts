import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from '../bienvenido/bienvenido.component';
import { JuegosComponent } from '../juegos/juegos.component';
import { LogleComponent } from '../logle/logle.component';

const routes: Routes = [
  { path: '', component: BienvenidoComponent },
  {path:'juegos', component: JuegosComponent, children:[
    {path:"logle", component:LogleComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BienvenidoRoutingModule { }
