import { Component, OnInit, Output} from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-machine-container',
  templateUrl: './machine-container.component.html', 
  styleUrls: ['./machine-container.component.css']
})
export class MachineContainerComponent implements OnInit {

  constructor() {}

  @Output() id;
  @Output() filename;
  @Output() position;
  @Output() title;
  
  wwMachines = [
    //position on screen (left/right), title of machine and filename 
    {position:"left", title:"Spiderman", filename:"spiderman.jpeg"},
    {position:"right", title:"Dialed in", filename:"dialedin.jpg"},
    {position:"left", title:"Funhouse", filename:"funhouse.jpeg"},
    {position:"right", title:"Game of Thrones", filename:"got.jpeg"},
    {position:"left", title:"The Hobbit", filename:"hobbit.png"},
    {position:"right", title:"Lord of the rings", filename:"lotr.jpeg"},
    {position:"left", title:"Attack from mars", filename:"mars.jpeg"},
    {position:"right", title:"Medieval Madness", filename:"medievalmadness.jpeg"},
    {position:"left", title:"Metallica", filename:"metallica.jpeg"},
    {position:"right", title:"Star Wars Pro (2017)", filename:"starWarsPro.jpg"},
    {position:"left", title:"Tron", filename:"tron.jpeg"},
    {position:"right", title:"World cup 94", filename:"worldcup.jpeg"},
    {position:"left", title:"World Poker Tour", filename:"worldPokerTour.jpg"},
    {position:"right", title:"", filename:"coming-soon.jpg"}
  ];

  tiltMachines = [
    {position:"left", title:"Adams Family", filename:"adamsfamily.png"},
    {position:"right", title:"Batman", filename:"batman.jpeg"},
    {position:"left", title:"Star Trek", filename:"startrek.jpeg"},
    {position:"right", title:"Theatre of Magic", filename:"theatreofmagic.jpeg"},
    {position:"left", title:"Tron", filename:"tron.jpeg"},
    {position:"right", title:"Medieval Madness", filename:"medievalmadness.jpeg"},
    {position:"left", title:"Guardian Of The Galaxy", filename:"guardian.jpg"},
    {position:"right", title:"The Walking Dead", filename:"walkingDead.png"},
    {position:"left", title:"Ghostbusters", filename:"ghostbusters.jpg"},
    {position:"right", title:"Ripley's believe it or not", filename:"ripleys.jpg"}
  ];

  ngOnInit() {}

}