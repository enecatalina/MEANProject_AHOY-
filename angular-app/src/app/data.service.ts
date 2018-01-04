import { Injectable } from '@angular/core';
import { Http, Headers  } from '@angular/http';
import { BehaviorSubject } from 'Rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';
@Injectable()

export class DataService {
    
    allusers: BehaviorSubject<any[]> = new BehaviorSubject([]);
    allteams: BehaviorSubject<any[]> = new BehaviorSubject([]);
    allchannels: BehaviorSubject<any[]> = new BehaviorSubject([]);
    userSession: BehaviorSubject<any> = new BehaviorSubject([]);
    returnSession() {
        return this.userSession.getValue();
    }
    
  constructor(private _http: Http) { }
    
// adding or creating

    addUser(user) {
        console.log('Note:', user);
        console.log('made it in the data service!')
        return this._http.post('/API/createUser', user)
            .map(response => this.userSession.next(response.json()))
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
        // return this._http.post('/API/createTeam', channel)
            .map(response => response.json())
            .toPromise()
            //check for the current user who is making the channel and attach them to this channel 
    }

    logUser(loggedPerson){
        console.log("IN Service data | log user")
        console.log("User-->", loggedPerson)
        return this._http.post('/API/loggingIN', loggedPerson)
            .map(response => this.userSession.next(response.json()))
            .toPromise();
    }
    editProfile(editUser) {
        console.log("THIS USER IS REQUESTING TO EDIT THEIR PROFILE:", editUser)
        return this._http.post('API/editProfile', editUser)
            .map(response => response.json())
            .toPromise();
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

    getChatByRoom(room) {
        return new Promise((resolve, reject) => {
            console.log("TRYING TO GET ROOM ..YOU'RE IN THE DATA SERVICE.. ")
            this._http.get('/chat/' + room)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    showChat(id) {
        return new Promise((resolve, reject) => {
            console.log("in SHOW CHAT JS!")
            this._http.get('/chat/' + id)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res)
                }, (err) => {
                    reject(err);
                });
        });
    }

    saveChat(data) {
        return new Promise((resolve, reject) => {
            console.log("SAVE CHAT: YOU'RE IN THE DATA SERVICE.. TRYING TO SEND MESSAGE")
            this._http.post('/savechat', data)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

        
    updateChat(id, data) {
        return new Promise((resolve, reject) => {
            this._http.post('/update/' + id, data)
                .map(res => res.json())
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    deleteChat(id) {
        return new Promise((resolve, reject) => {
            this._http.delete('/chat/' + id)
                .subscribe(res => {
                    resolve(res);
                }, (err) => {
                    reject(err);
                });
        });
    }

    private handleError(error: any): Promise<any> {
        return Promise.reject(error.message || error);
    }
// \\ end of chat room \\//\\


// That codes using Promise response instead of Observable.


}
