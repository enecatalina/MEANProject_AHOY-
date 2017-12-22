import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, ActivatedRoute } from '@angular/router'


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  UserList: any[] = [];
  currentUser;
  submitted;
  constructor(private _dataService: DataService, private _route: Router) { }
  onSubmit() {
    this._dataService.editProfile(this.currentUser)
      .then(response =>this.submitted = response);
    this._route.navigateByUrl('chat');
  }
  ngOnInit() {
    this._dataService.retreiveAllusers(this.UserList)
      .subscribe((data) => { this.UserList = data });
    // console.log("this is the current user:", user);
    console.log("THIS IS THE LIST OF CHANNELS:", this.UserList);
  }

}
