import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-nav-container',
  templateUrl: './nav-container.component.html',
  styleUrls: ['./nav-container.component.scss']
})
export class NavContainerComponent implements OnInit {
  constructor(private authService : AuthService) { }
  userName : any;
  ngOnInit() {
    // this.authService.$loginChanges.subscribe(data => {
    //   this.userName = data
    // });
  }

  items = [
    {text:'And another choice.', function : "nofunction()"},
    {text:'Logout', function : "logout()"}
  ];
 
  // logout() {
  //   this.authService.logout("logout");
  // }

}
