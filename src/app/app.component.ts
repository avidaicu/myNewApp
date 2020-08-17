import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'pm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  pageTitle = 'Acme Product Management';

  constructor(public authService: AuthService) {

  }

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyCZvYgEzFyrS2JbIIkwZC8wCBixduacig8",
      authDomain: "mynewapp-7b92a.firebaseapp.com"
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
