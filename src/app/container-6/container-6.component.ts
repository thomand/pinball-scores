import { Component, Input, Output, ViewChild } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FirebaseService } from '../services/firebase.service';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/takeUntil';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-container-6',
  templateUrl: './container-6.component.html',
  styleUrls: ['./container-6.component.css']
})
export class Container6Component {
  bsModalRef: BsModalRef;
  @Input() machineId;
  @Input() filename;
  @Input() position;
  @Input() title;
  
  constructor(public modalService: BsModalService) {}

  onClick() {
  const initialState = {title: this.title};
  this.bsModalRef = this.modalService.show(ModalContentComponent, {initialState});
  this.bsModalRef.content.closeBtnName = 'Close';
  }
}

@Component({
  selector: 'modal-content',
  templateUrl: './score-table.component.html',
  styleUrls: ['./container-6.component.css'] 
})
 
export class ModalContentComponent {
  title: string;
  closeBtnName: string;
  displayedColumns = ['position','player', 'score', 'days'];
  dataSource = new MatTableDataSource<ScoreElement>([]);
  componentDestroyed$: Subject<boolean> = new Subject();
  user: any;
  playerUsernames: any;
 
  constructor(public bsModalRef: BsModalRef, private firebaseService : FirebaseService, private authService : AuthService) {
    this.authService.$loggedInUser.subscribe(user => {this.user = user; console.log(this.user, user)});
    this.firebaseService.playersUsernames.takeUntil(this.componentDestroyed$).subscribe(usernames => this.playerUsernames = usernames);
    
  }
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  ngAfterViewInit() {
    this.firebaseService.getAllPlayerUsernames();
      this.firebaseService.scores.takeUntil(this.componentDestroyed$).subscribe(scores => {
      this.dataSource = new MatTableDataSource<ScoreElement>(scores);
      this.dataSource.paginator = this.paginator;
    });
    this.dataSource.paginator = this.paginator;
    let titleString = this.title;
    if (titleString != "") {
      this.firebaseService.getScoresForMachine(this.title);
    }
  }

  playerNameEqualsLoggedInUser(playerData) {
    console.log(this.playerUsernames);
    console.log(this.user.name);
    // if (this.playerUsernames.playerData.player.name == this.user.name) {
    //   return true;
    // }
    return false;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.complete();
  }
}

export interface ScoreElement {
  days: number;
  player: string;
  position: number;
  score: string;
}