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

  ngOnInit() {
    this._dataService.userSession.subscribe(
      (user) => {
        console.log(user);
        if (user['loggedIn']) {
          this.currentUser = user;
          this._route.navigateByUrl('/chat')
        }
        
      });
  }

  loggedPerson = {
    email: '',
    password: ''
  }
  error = "";

  currentUser = {}

  userSession = []
 

  onSubmit() {
    console.log("IN: Login | onsubmit")
    console.log(this.loggedPerson);
    this._dataService.logUser(this.loggedPerson)
      .then(response => {
        if(response['loggedIn']){
          this._dataService.returnSession()
          this._route.navigateByUrl('/chat')
        }
        else{
          this.error = response['Error'];
        }
      })
  }

  // getUsersChannel(){
  //   this._dataService.getChannel()
  //   .then(response =>{
  //   })
  // }
  // getSession(){
  //   this._dataService.userSession.subscribe(
  //     (user) => {
  //       console.log(user);
  //       if (user['loggedIn']) {
  //         this.currentUser = user;
  //         this._route.navigateByUrl('/chat')
  //       }
  //     });
  // }

}
