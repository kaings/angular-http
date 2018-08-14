import {Component, OnInit} from '@angular/core';
import {ServerService} from './server.service';
import {AuthService} from './auth/auth.service';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  servers = [
    {
      name: 'Testserver',
      capacity: 10,
      id: this.generateId()
    },
    {
      name: 'Liveserver',
      capacity: 100,
      id: this.generateId()
    }
  ];

  appName = this.serverService.getAppName()

  constructor(private serverService: ServerService, private authService: AuthService) {}

  onAddServer(name: string) {
    this.servers.push({
      name: name,
      capacity: 50,
      id: this.generateId()
    });
  }
  private generateId() {
    return Math.round(Math.random() * 10000);
  }

  onPostData() {
    this.serverService.postData(this.servers).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  onGetData() {
    this.serverService.getData().subscribe(
      (data: any[]) => {
        console.log(data);
        this.servers = data;
      },
      (error) => {
        console.log('error fetching data...', error);
      }
    );


  }

  onPutData() {
    this.serverService.putData(this.servers).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: 'AIzaSyAKE8bOldF3IglJHsYtM3iV4JWsDV5CPcg',
      authDomain: 'test-1-723c2.firebaseapp.com'
    });
  }

  onSignout() {
    this.authService.signoutUser();
  }

  onSignInWithGoogle() {
    this.authService.signinWithGoogle();
  }
}
