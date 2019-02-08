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
    private afs: AngularFirestore,
    private noteService: NoteService,
    //private uiService: UIService
  ) 
  {
    //const settings = { timestampsInSnapshots: true };
    //afs.app.firestore().settings(settings);

    // afs.firestore.settings({
    //   timestampsInSnapshots: true,
    // });
    // afs.firestore.enablePersistence();

  }

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
    //this.uiService.loadingStateChanged.next(true);
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        //this.uiService.loadingStateChanged.next(false);
        this.router.navigate(['/notelist']);
      })
      //need to rethrow error to get message back to ui
      // .catch(error => {
      //   console.log('failed login')
      //   //this.uiService.loadingStateChanged.next(false);
      //   //this.uiService.showSnackbar(error.message, null, 3000);
      // })

  }

  regusterUser(email: string, password: string, displayName: string) {
    //this.uiService.loadingStateChanged.next(true);
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.updateUserData(user, displayName))
      .then(result => {
        //this.uiService.loadingStateChanged.next(false);
      })
      //this will not return error message to user
      // .catch(error => {
      //   console.log('in error');
      //   console.log(error);
      //   //this.uiService.loadingStateChanged.next(false);
      //   //this.uiService.showSnackbar(error.message, null, 3000);
      // });
  }

  private updateUserData(user, displayName) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.user.uid}`
    );

    const data: User = {
      uid: user.user.uid,
      email: user.email || null,
      displayName: displayName
    };
    return userRef.set(data, { merge: true });
  }


  isAuth() {
    return this.isAuthenticated;
  }
}
