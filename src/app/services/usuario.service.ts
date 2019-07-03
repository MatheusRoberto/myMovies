import { Facebook } from '@ionic-native/facebook/ngx';
import { Router } from '@angular/router';
import { FirebaseService } from './firebase.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public usuario = {};

  constructor(public firebaseService: FirebaseService, public router: Router, public facebook: Facebook) {
    this.getUser().subscribe();
  }

  async login(email, senha) {
    try {
      await this.firebaseService.auth().signInWithEmailAndPassword(email, senha);
    } catch (error) {
      if (error.code === 'auth/wrong-password') {
        throw new Error('A senha é inválida');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('O email é inválido');
      } else if (error.code === 'auth/user-not-found') {
        throw new Error('Usuário não encontrado');
      } else {
        throw new Error(error.message);
      }
    }
  }

  async registrar(email, senha) {
    try {
      await this.firebaseService.auth().createUserWithEmailAndPassword(email, senha);
    } catch (error) {
      if (error.code === 'auth/invalid-email') {
        throw new Error('Email inválido');
      } else if (error.code === 'auth/weak-password') {
        throw new Error('A senha é inválida precisa de pelos menos 6 caracteres');
      } else {
        throw new Error(error.message);
      }
    }
  }

  logout() {
    this.firebaseService.auth().signOut();
    this.router.navigateByUrl('login');
  }

  getUser(): Observable<any> {
    return Observable.create(async observer => {
      await this.firebaseService.auth().onAuthStateChanged(user => {
        if (user) {
          this.usuario = { id: user.uid, email: user.email, isOnline: true };
        } else {
          this.usuario = { id: null, email: null, isOnline: false };
        }

        observer.next(this.usuario);
      });
    });
  }

  facebookLogin(): Promise<any> {
    return this.facebook.login(['email', 'public_profile'])
      .then(response => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
          .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
          .then(success => {
            console.log('Firebase success: ' + JSON.stringify(success));
          });

      }).catch((error) => { console.log(error); });
  }
}
