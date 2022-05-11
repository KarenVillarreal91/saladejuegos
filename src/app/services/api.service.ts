import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://omdbapi.com/?apikey=db528063&";

  constructor(private http:HttpClient) { }

  GetPelicula(pelicula:string)
  {
    return this.http.get(`${this.url}t=${pelicula}`);
  }

  GetPerfil()
  {
    return this.http.get('https://api.github.com/users/KarenVillarreal91');
  }
}
