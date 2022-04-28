import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  logueado:any = false;
  userLogueado:any = '';

  constructor(private auth:AngularFireAuth, private firestore:AngularFirestore) 
  {
    auth.authState.subscribe((user) => (this.userLogueado = user));    
  }
  
  login(user:any)
  {
    return this.auth.signInWithEmailAndPassword(user.email, user.clave);
  }

  LogOut()
  {
    return this.auth.signOut();
  }

  SubirLog( user: any)
  {
    return this.firestore.collection('logs').add(user);
  }

  Registro(user: any)
  {
    return this.auth.createUserWithEmailAndPassword(user.email , user.clave);
  }
}
