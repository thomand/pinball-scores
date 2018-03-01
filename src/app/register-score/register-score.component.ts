import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Subject } from 'rxjs/Subject';
import { FirebaseService } from '../services/firebase.service';


@Component({
  selector: 'app-register-score',
  templateUrl: './register-score.component.html',
  styleUrls: ['./register-score.component.scss']
})
export class RegisterScoreComponent implements OnInit {
  machineControl = new FormControl('', [Validators.required]);
  scoreControl = new FormControl('', [Validators.required]);
  componentDestroyed$: Subject<boolean> = new Subject();
  dbRef : any;
  machines : string[] = [];
  user = { email: null, gamesPlayed: null, name: null, player: null };
  
  constructor(private db: AngularFireDatabase, private firebaseService : FirebaseService, private router : Router, private authService: AuthService) {
    this.subscribeToUserData();
    this.firebaseService.machines.takeUntil(this.componentDestroyed$).subscribe(machines => this.machines = machines);
   }

   commaSeparated(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

  

  submit(score, machine) {
    let date = new Date();
    const itemRef = this.db.object('/' + machine + '/' + date);
    itemRef.set({ player: this.user.player, score: score})
      .then(_ => console.log('success'))
      .catch(err => alert('Something went wrong \n' + err));
    this.router.navigateByUrl('/index');
  }

  private subscribeToUserData() {
    this.authService.$loggedInUser.subscribe(userData => {
      this.user = userData;
      this.user["ranking"] = 23453;
      this.user["gamesPlayed"] = 0;
      console.log("register-score",this.user);
     });
  }
 

  ngOnInit() {
    this.firebaseService.getMachines();
   
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }

}
