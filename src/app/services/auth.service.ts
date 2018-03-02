import { Injectable, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
import { AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
    private user: Observable<firebase.User>;
    private userDetails: firebase.User = null;
    //$userEvents: EventEmitter<firebase.User>;
    $loggedInUser : EventEmitter<Object>;

  constructor(private _firebaseAuth: AngularFireAuth, private router: Router) {
    this.user = _firebaseAuth.authState;
    //this.$userEvents = new EventEmitter<firebase.User>();
    this.$loggedInUser = new EventEmitter<Object>();

    this.user.subscribe(
        (user) => {
          if (user) {
            this.userDetails = user;
            this.$loggedInUser.emit(this.generateUserObject(user));
            //this.router.navigate(['index']);
          }
          else {
            this.userDetails = null;
          }
        }
      );
   }

   private generateUserObject(userData) {
    let reference = userData.providerData[0]
    let userObject = {
      name : reference.displayName,
      email : reference.email,
      username : this.generateUsernameFromEmail(reference.email),
      photoUrl : reference.photoURL,
      phonenumber : reference.phonenumber
    }
    return userObject;
  }

  private generateUsernameFromEmail(email) {
    let username = email.substring(0, email.indexOf("@"));
    // return email.replace(/./g, "_").substring(0, email.indexOf("@"));
    return username.split('.').join("_");
  }

   isLoggedIn() {
    if (this.userDetails == null ) {
        return false;
      } else {
        this.$loggedInUser.emit(this.generateUserObject(this.userDetails));
        return true;
      }
    }
  
  logout() {
      this._firebaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
    }
}

//https://medium.com/@hellotunmbi/step-by-step-complete-firebase-authentication-in-angular-2-97ca73b8eb32
//https://medium.com/@hellotunmbi/part-2-complete-step-by-step-firebase-authentication-in-angular-2-25d284102632
