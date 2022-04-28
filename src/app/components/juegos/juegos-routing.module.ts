import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogleComponent } from '../logle/logle.component';
import { JuegosComponent } from './juegos.component';

const routes: Routes = [
  { path: '', component: JuegosComponent },
  {path: 'logle', component: LogleComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
