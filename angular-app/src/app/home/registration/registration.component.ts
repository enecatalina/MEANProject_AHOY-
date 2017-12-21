import { Component, OnInit } from '@angular/core';
import { DataService } from '../../data.service';
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private _dataService: DataService, private _route: Router) { }

  newPerson = {
    email: '',
    fullname: '',
    displayname: '',
    password: ''
  }
  submitted;
  
  onSubmit() {
    console.log("IN: Registration | onSubmit()")
    console.log(this.newPerson);
    this._dataService.addUser(this.newPerson)
      .then(response => this.submitted = response)
    this._dataService.getUser()
    this.newPerson = {
      email: '',
      fullname: '',
      displayname: '',
      password: '',
    }
    console.log("IN: RegisterComponent | SUBMITTED")
  }

  ngOnInit() {
  
  }

}
