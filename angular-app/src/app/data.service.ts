import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
@Injectable()
export class DataService {

    private url = 'http://localhost:4000';
    private socket;
    private modals: any[] = [];
    
  allusers: BehaviorSubject<any[]> = new BehaviorSubject([]);
  allteams: BehaviorSubject<any[]> = new BehaviorSubject([]);
//   allmessages: BehaviorSubject<any[]> = new BehaviorSubject([]); // not sure if I need this yet
  allchannels: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private _http: Http) { }
    
// adding or creating

    addUser(user) {
        console.log('Note:', user);
        console.log('made it!')
        return this._http.post('/API/createUser', user)
            .map(response => response.json())
            .toPromise()
    }

    addTeam(team) {
        console.log('Team:', team);
        console.log('IN: dataService | addTeam()')
        return this._http.post('/API/createTeam', team)
            .map(response => response.json())
            .toPromise()
    }

    addChannel(channel) {
        console.log('Channel:', channel);
        console.log('made it to channels data service!')
        return this._http.post('/API/createChannel', channel)
            .map(response => response.json())
            .toPromise()
            //check for the current user who is making the channel and attach them to this channel 
    }

// finding user, team, and messages

    getUser() {
        return this._http.get('/API/getUser')
            .map(response => this.retreiveAllusers(response.json()))
            .toPromise();
    }
    getTeam() {
        return this._http.get('/API/getTeam')
            .map(response => this.retreiveAllTeams(response.json()))
            .toPromise();
    }

    getChannel() {
        return this._http.get('/API/getChannel/:id')
            .map(response => this.retreiveAllChannels(response.json()))
            .toPromise();
    }

// using these functions for the get function above

    retreiveAllusers(newUsers) {
        this.allusers.next(newUsers);
        console.log('retreive users,', this.allusers)
        return this.allusers;
    }

    retreiveAllTeams(newTeams) {
        this.allusers.next(newTeams);
        console.log('retreive users,', this.allteams)
        return this.allteams;
    }

    retreiveAllChannels(newChannel) {
        this.allchannels.next(newChannel);
        console.log('retreive channels,', this.allchannels)
        return this.allchannels;
    }

// CHAT ROOM // \\ // \\ // \\ // \\ // \\ do not touch // \\

    // sendMessage(message) {
    //     this.socket.emit('add-message', message);
    // }

    // getMessages() {
    //     let observable = new Observable(observer => {
    //         this.socket = io(this.url);
    //         this.socket.on('message', (data) => {
    //             observer.next(data);
    //         });
    //         return () => {
    //             this.socket.disconnect();
    //         };
    //     })
    //     return observable;
    // }  

    getChatByRoom(room) {
        return new Promise((resolve, reject) => {
            console.log("in get CHAT ROOOM")
            this._http.get('/chat/' + room)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    saveChat(data) {
        return new Promise((resolve, reject) => {
            console.log("in get SAVE CHAT")
            this._http.post('/chat', data)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }
// \\ end of chat room \\//\\


// That codes using Promise response instead of Observable.


}
