import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import 'rxjs/add/observable/of';
import { AngularFireDatabase } from 'angularfire2/database';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-register-score',
  templateUrl: './register-score.component.html',
  styleUrls: ['./register-score.component.scss']
})
export class RegisterScoreComponent implements OnInit {
  machineControl = new FormControl('', [Validators.required]);
  scoreControl = new FormControl('', [Validators.required]);
  
  constructor(private db: AngularFireDatabase, private router : Router, private authService: AuthService) {
    this.subscribeToUserData();
    this.dbRef = this.db.list("/");
    this.dbRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        let machine = action.key;
        if (machine != "players") {
          this.machines.push(machine);
        }
      })
    });
   }

   commaSeparated(input) {
    return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
   }

  dbRef : any;
  machines : string[] = [];
  user = {
    email: null, 
    gamesPlayed: null, 
    name: null, 
    player: null
  };

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
   
  }

}
