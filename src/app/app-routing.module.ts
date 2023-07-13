import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { ErrorComponent } from './components/error/error.component';
import { QuiensoyComponent } from './components/quiensoy/quiensoy.component';
import { UserGuard } from './guards/user.guard';
import { ChatComponent } from './components/chat/chat.component';

const routes: Routes = [
  {path:"login", component:LoginComponent},
  {path:"registro", component:RegistroComponent},
  { path: 'home', loadChildren: () => import('./components/bienvenido/bienvenido.module').then(m => m.BienvenidoModule), canActivate: [UserGuard] },
  { path: 'juegos', loadChildren: () => import('./components/juegos/juegos.module').then(m => m.JuegosModule), canActivate: [UserGuard] },
  {path:"quiensoy", component:QuiensoyComponent, canActivate: [UserGuard]},
  {path:"", redirectTo:"/login",pathMatch:"full"},
  {path:"**", component:ErrorComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
