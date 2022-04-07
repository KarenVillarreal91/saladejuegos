import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { JuegosComponent } from './components/juegos/juegos.component';
import { FlagleComponent } from './components/flagle/flagle.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  {path:"home", component:BienvenidoComponent},
  {path:"juegos", component:JuegosComponent, children:[
    {path:"flagle", component:FlagleComponent}
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
