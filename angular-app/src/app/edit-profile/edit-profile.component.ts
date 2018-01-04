import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  // UserList: any[] = [];
  currentUser;
  submitted;
  user = [];
  updatePerson = {
    fullname: '',
    email: ''
  }
  constructor(private _dataService: DataService, private _route: Router) { }
  onSubmit() {
    console.log('this edit profile component', this.updatePerson)
    this._dataService.editProfile(this.updatePerson)
      .then(response =>this.submitted = response);
    this.updatePerson = {
      fullname: '',
      email: ''
    }
    this._route.navigateByUrl('/chat');
  }
  ngOnInit() { //using session to load user information 
    this.user = this._dataService.returnSession();
    console.log("this is current user", this.user);

    }
}
