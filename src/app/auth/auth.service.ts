import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { Subject } from 'rxjs';  //same as event emitter

import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from "angularfire2/firestore";
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

import { User } from './user.model';
import { NoteService } from '../note/note.service';

@Injectable()
export class AuthService {

  authChange = new Subject<boolean>();
  user: any = null;
  private isAuthenticated = false;

  constructor(private router: Router,
    private afAuth: AngularFireAuth,
    //private afs: AngularFirestore,
    private noteService: NoteService,
    //private uiService: UIService
  ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      console.log('in subscribe code return for authstate')
      if (user) {
        console.log('in auth callback true');
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.user = user;
        //console.log('user - ', user);
        //this overrides any page not found errors
        //this.router.navigate(['/note']);
      } else {
        console.log('in auth callback false');
        this.isAuthenticated = false;
        this.noteService.cancelSubscriptions();
        this.authChange.next(false);
        this.user = null;
        this.router.navigate(['/login']);
      }
    });//
  }

  login(email: string, password: string) {
    console.log('in login')
    console.log('pw ' , password);
    //this.uiService.loadingStateChanged.next(true);
    this.afAuth.auth
        .signInWithEmailAndPassword(email, password)
        .then(result => {
            console.log('successful login')
            //this.uiService.loadingStateChanged.next(false);
            this.router.navigate(['/notelist']);
        })
        .catch(error => {
            console.log('failed login')
            //this.uiService.loadingStateChanged.next(false);
            //this.uiService.showSnackbar(error.message, null, 3000);
        })

}

  isAuth() {
    return this.isAuthenticated;
  }
}
