import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html', 
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _dataService: DataService, private _route: Router) { }

  loggedPerson = {
    email: '',
    password: ''
  }
  error = "";
 

  onSubmit() {
    console.log("IN: Login | onsubmit")
    console.log(this.loggedPerson);
    this._dataService.logUser(this.loggedPerson)
      .then(response => {
        if(response.loggedIn){
          this._route.navigateByUrl('/chat')
        }
        else{
          this.error = response.Error
        }
      })
  }

  ngOnInit() {
  }

}
