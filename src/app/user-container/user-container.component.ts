import { Component, OnInit, Output, Input } from '@angular/core';
import { AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { AuthService } from '../services/auth.service';
import { ProgressbarConfig } from 'ngx-bootstrap/progressbar';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { AuthGuardService } from '../services/auth-guard.service';
import { FirebaseService } from '../services/firebase.service';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-user-container',
  templateUrl: './user-container.component.html',
  styleUrls: ['./user-container.component.scss'],
  providers:[AuthService]
})
export class UserContainerComponent implements OnInit {
  
  dbRef : any;
  username = "Thomas";
  user = { name: null, username: null, ranking: null, gamesPlayed: 0, photoUrl: null };
  machines = [];
  playerScoresAllMachines = []
  constructor(private db: AngularFireDatabase, private authService : AuthService, private firebaseService : FirebaseService)   {
    this.subscribeToUserData();
    this.dbRef = this.db.list("/");
    this.dbRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
    actions.forEach(action => {
      let machine = action.key;
      if (machine != "players") {
        let scores = action.payload.val();
        let highscore = this.getHighcore(scores);
        let userScore = this.getHighscoreForPlayer(scores, this.user.username);
        let percentage = this.getPercentage(highscore, userScore);
        let machineScore = this.getAllScoresForPlayer(scores, this.user.username);
        this.playerScoresAllMachines.push({machine : machine, scores: machineScore, scoreCount : machineScore.length});
        if (parseInt(highscore) >= 0 && parseInt(userScore) > 0) {
          this.machines.push(
            {
            name: machine,
            highscore: highscore,
            userScore : userScore,
            percentage : percentage
          });
        }
      }
    });
    this.generateGamesPlayed();
  });
    console.log("playerScoresAllMachines",this.playerScoresAllMachines);
    
   }

   private generateGamesPlayed() {
    this.playerScoresAllMachines.forEach(machine => {
      this.user.gamesPlayed += machine.scoreCount
    });
   }

   private subscribeToUserData() {
    this.authService.$loggedInUser.subscribe(userData => {
      this.user = userData;
      this.user["ranking"] = 23453;
      this.user["gamesPlayed"] = 0;
      console.log("user-container",this.user);
     });
  }

  logout() {
    this.authService.logout();
  }


   private getPercentage(highscore:string, userScore:string) {
      return ((parseInt(userScore)/parseInt(highscore))*100).toFixed(0)
   }

   private getHighscoreForPlayer(scores:object, player:string) {
    var highscore = 0;
    for (var index in scores) {
      let score = parseInt(scores[index].score)
      if (score > highscore && scores[index].player == player) {
        highscore = score;
      }
    }
    return highscore.toString();
   }

   private getAllScoresForPlayer(scores: object, player: string) {
      let playerScores = []
      //index = key
      for (var index in scores) { 
          let scoresPlayer = scores[index].player;
          if (scoresPlayer == player) {
            playerScores.push(
              {
                date: index,
                score : scores[index].score
              }
            )
          }
      }
      return playerScores;
   }

   private getHighcore(scores: object) {
      var highscore = 0;
      for (var index in scores) {
        let score = parseInt(scores[index].score)
        if (score > highscore) {
          highscore = score;
        }
      }
      return highscore.toString();

   }

   loadUserSettings() {
    
   }


  ngOnInit() {
  }
}
