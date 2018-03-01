import { Component, OnInit} from '@angular/core';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { Router } from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private afAuth: AngularFireAuth) {}

  successCallback(signInSuccessData: FirebaseUISignInSuccess) {
    this.router.navigate(['index']);
  }

  ngOnInit() {
    this.afAuth.authState.subscribe(d => {
      if (d != null) {
        this.router.navigate(['index']);
      }
    });
  }

}
