import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  logueado:any = false;
  userLogueado:any = '';
  mensajes:Observable<any[]>;

  constructor(private auth:AngularFireAuth, private firestore:AngularFirestore, private database:AngularFireDatabase) 
  {
    auth.authState.subscribe((user) => (this.userLogueado = user));   
    this.mensajes = this.database.list('/chat').valueChanges();
  }
  
  login(user:any)
  {
    return this.auth.signInWithEmailAndPassword(user.email, user.clave);
  }

  LogOut()
  {
    return this.auth.signOut();
  }

  SubirLog( user: any, log:string)
  {
    return this.firestore.collection(log).add(user);
  }
  
  MandarMensaje(mensaje:any)
  {
    const itemRef = this.database.list("/chat");
    itemRef.push(mensaje);
  }

  Registro(user: any)
  {
    return this.auth.createUserWithEmailAndPassword(user.email , user.clave);
  }

  TraerRegistros()
  {
    return this.firestore.collection('registros').valueChanges({idField: "id"});
  }

  EditarRegistro(id:string, datos:any)
  {
    return this.firestore.collection('registros').doc(id).update(datos);
  }
}
