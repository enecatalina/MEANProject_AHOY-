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
  submitted;

  onSubmit() {
    console.log("IN: Login | onsubmit")
    console.log(this.loggedPerson);
    this._dataService.logUser(this.loggedPerson)
      .then(response => this.submitted = response)
    // this._dataService.getUser()
    this.loggedPerson = {
      email: '',
      password: ''
    }
    console.log("SUBmitted in login")
    this._route.navigateByUrl('chat')
  }

  ngOnInit() {
  }

}
