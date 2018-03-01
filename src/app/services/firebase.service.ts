import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { ScoreElement } from '../container-6/container-6.component';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class FirebaseService {

  dbRef : any;
  //scores : ScoreElement[] = [];
  scores : Subject<any> = new Subject();
  machines : Subject<any> = new Subject();
  playersUsernames = {};
  constructor(private db: AngularFireDatabase) { }

  getAllPlayerUsernames() {
    this.dbRef = this.db.list("/players");
    this.dbRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        let player = action.key;
        let username = action.payload.val().username;
        this.playersUsernames[player] = username;
      })
    });
  }

  setPlayer() {}

  getMachines() {
    let machines = [];
    this.dbRef = this.db.list("/");
    this.dbRef.snapshotChanges(['child_added'])
    .subscribe(actions => {
      actions.forEach(action => {
        let machine = action.key;
        if (machine != "players") {
          machines.push(machine);
        }
      })
      this.machines.next(machines);
    });
  }

  getScoresForMachine(machineName : string){
    let scoresArray = new Array<ScoreElement>();
    this.dbRef = this.db.list(machineName);
      this.dbRef.snapshotChanges(['child_added']).subscribe(actions => {
        actions.forEach(action => {
          let scoreElement = this.generateScoreElement(action);
          scoresArray.push(scoreElement)
        })
        scoresArray = this.sortScores(scoresArray);
        for (var i in scoresArray) {
          if(i != "paginator"){
            scoresArray[i].score = this.numberWithCommas(scoresArray[i].score);
            scoresArray[i]["position"] = parseInt(i)+1;
            scoresArray[i].player = this.playersUsernames[scoresArray[i].player];
          }
        }
        this.scores.next(scoresArray);
      })
      //return this.connection;  
    //return new BehaviorSubject<ScoreElement[]>(scores).asObservable();
  }

  private generateScoreElement(data) {
    let playerData = data.payload.val()
    let scoreDate = data.key;
    let days =  Math.floor(( new Date().getTime() - new Date(scoreDate).getTime() ) / 86400000);
    let scoreElement : ScoreElement  = {
      days: days,
      player: playerData.player,
      score : playerData.score, 
      position: null
    }
    return scoreElement;
  }

  setScore() {

  }

  private numberWithCommas(x : string) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  private sortScores(scores) {
    scores.sort(function(a, b) {
      return parseInt(b.score) - parseInt(a.score);
    });
    return scores;
  }
}
