import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';

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
    // var firebaseConfig = {
    //   apiKey: "AIzaSyCZvYgEzFyrS2JbIIkwZC8wCBixduacig8",
    //   authDomain: "mynewapp-7b92a.firebaseapp.com",
    //   databaseURL: "https://mynewapp-7b92a.firebaseio.com",
    //   projectId: "mynewapp-7b92a",
    //   storageBucket: "mynewapp-7b92a.appspot.com",
    //   messagingSenderId: "68827465216",
    //   appId: "1:68827465216:web:da1c361dd026d5a9973ae5"
    // };
    // // Initialize Firebase
    // firebase.initializeApp(firebaseConfig);
  }

  onLogout() {
    this.authService.logout();
  }
}
