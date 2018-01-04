import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-channel',
  templateUrl: './channel.component.html',
  styleUrls: ['./channel.component.css']
})
export class ChannelComponent implements OnInit {

  constructor(private _dataService: DataService) { }

  NewChannel = {
    channelName: '',
    purpose: ''
  }
  submitted;
  ChannelList: any = [];
  currentUser = {

  }
  ngOnInit() {
    var user = JSON.parse(localStorage.getItem("user"));
    this._dataService.retreiveAllChannels(this.ChannelList)
      .subscribe((data) =>{this.ChannelList = data});
    console.log("this is the current user:", user);
    console.log("THIS IS THE LIST OF CHANNELS:", this.ChannelList);
  }
  onSubmit() {
      console.log(this.NewChannel);
      this._dataService.addChannel(this.NewChannel)
        .then(response => this.submitted = response)
        this.NewChannel = {
          channelName: '',
          purpose: ''
        }
      console.log("YAS", this.submitted);
      this.NewChannel = {
        channelName: '',
        purpose: ''
      }
  }


}
