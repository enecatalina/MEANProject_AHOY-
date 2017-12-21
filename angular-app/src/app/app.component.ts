import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fullImagePath: String;
  title = 'app';

  constructor(){
    this.fullImagePath = '/assets/images/title.png'
  }

}


