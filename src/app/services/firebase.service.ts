import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor() {
    const config = {
      apiKey: 'AIzaSyBpH6bnHIPq5SK73nA0szZZFVKNDi6QxHU',
      authDomain: 'progmobile-79a04.firebaseapp.com',
      databaseURL: 'https://progmobile-79a04.firebaseio.com',
      projectId: 'progmobile-79a04',
      storageBucket: 'progmobile-79a04.appspot.com',
      messagingSenderId: '905648634527',
      appId: '1:905648634527:web:347717a0ef5738ca'
    };
    firebase.initializeApp(config);
  }

  db() {
    return firebase.firestore();
  }

  auth() {
    return firebase.auth();
  }
}
