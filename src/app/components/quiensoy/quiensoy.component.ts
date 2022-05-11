import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-quiensoy',
  templateUrl: './quiensoy.component.html',
  styleUrls: ['./quiensoy.component.scss']
})
export class QuiensoyComponent implements OnInit {

  perfil:any;

  constructor(public api:ApiService) 
  { 
    this.api.GetPerfil().subscribe((data:any)=>{
      this.perfil = data;
    });
  }

  ngOnInit(): void {}
}
