import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { LogleComponent } from './components/logle/logle.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"home", component:BienvenidoComponent},
  {path:"quiensoy", component:QuiensoyComponent},
  {path:"juegos", component:JuegosComponent, children:[
    {path:"logle", component:LogleComponent}
  ]},
  {path:"", redirectTo:"/home",pathMatch:"full"},
  {path:"**", component:ErrorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
