import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-five-newest-scores',
  templateUrl: './five-newest-scores.component.html',
  styleUrls: ['./five-newest-scores.component.css']
})
export class FiveNewestScoresComponent implements OnInit {
  displayedColumns = ['name', 'score', 'button'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);

  constructor() { }

  editField(field: string, editValue: string, el: any) {
    let idx = this.dataSource.data.findIndex(ele => el.name == ele.name);
    this.dataSource.data[idx][field] = editValue;
    console.log(editValue)
  }

  update(element) {
    console.log(element);
  }


  ngOnInit() {
  }

}

export interface Element {
  name: string;
  score: number;
}

const ELEMENT_DATA: Element[] = [
  { name: 'Spiderman', score: 54628353 },
  { name: 'The hobbit', score: 67913237 },
  { name: 'Lord of the rings', score: 42123323 },
  { name: 'Star Wars Pro (2017)', score: 32112321 },
  { name: 'Attack From Mars', score: 23412423 }
];
