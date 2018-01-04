import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fullImagePath: String;
  
  constructor() { 
    
    this.fullImagePath = '/assets/images/title.png'
  }

  ngOnInit() {
  }

}
