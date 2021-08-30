
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  constructor() { }
    isTrue:boolean;
    question:String[];
    answer:any[][];
  ngOnInit(): void {

  
  }
  requrs(){
    this.isTrue = !this.isTrue;
  }
  
}
