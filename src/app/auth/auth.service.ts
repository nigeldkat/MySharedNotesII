import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';

@Injectable()
export class AuthService {

  constructor() { }

  isAuth(){
    console.log('in isAuth');
    return false;
  }
}
