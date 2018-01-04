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

  ngOnInit() {
    this._dataService.userSession.subscribe(
      (user) => {
        console.log(user);
        if (user['registeredIn']) {
          this.currentUser = user;
          this._route.navigateByUrl('/chat')
        }
      });
  }

  newPerson = {
    email: '',
    fullname: '',
    password: ''
  }

  currentUser = {}
  submitted;
  error = "";
  
  onSubmit() {
    console.log("IN: Registration | onSubmit()")
    console.log(this.newPerson);
    this._dataService.addUser(this.newPerson)
      .then(response => {
        if (response['registeredIn']) {
          this._dataService.returnSession()
          this._route.navigateByUrl('/chat')
        }
        else {
          this.error = response['Error'];
        }
      })
  }
  //   this._dataService.addUser(this.newPerson)
  //     .then(response => {
  //       console.log('responding in register component')
  //       // if (response['registeredIn']) {
  //       if (this.error == null) {
  //         console.log('hitting past the registeredIn in')
  //         this._dataService.returnSession()
  //         console.log('hitting past the session in component')
  //         this._route.navigateByUrl('/chat')
  //       console.log('logged in?')
  //       }
  //       else {
  //         this.error = response['Error'];
  //       }
  //     })
  //   this._dataService.returnSession()
  //   this._route.navigateByUrl('/chat')
  //   console.log("IN: RegisterComponent | SUBMITTED")
  // }


}
