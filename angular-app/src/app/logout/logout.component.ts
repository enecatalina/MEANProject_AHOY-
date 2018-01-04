import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
user;
logoutUser;
  constructor(private _router: Router, private _route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    
  }
  onSubmit(){
    this.user = this.dataService.logout(this.logoutUser);
    this._router.navigateByUrl('/login');
  }
}
