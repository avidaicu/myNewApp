import { ProductDetailComponent } from './products/product-detail.component';
import { ProductEditComponent } from './products/product-edit.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { WelcomeComponent } from './home/welcome.component';
import { HeaderComponent } from './header/header.component';
import { ProductModule } from './products/product.module';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';

import { FormsModule } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth-guard.service';

// 1. Import the libs you need
import * as firebase from 'firebase';


import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

  // const firebaseConfig = {
  //   apiKey: "AIzaSyCZvYgEzFyrS2JbIIkwZC8wCBixduacig8",
  //   authDomain: "mynewapp-7b92a.firebaseapp.com",
  //   databaseURL: "https://mynewapp-7b92a.firebaseio.com",
  //   projectId: "mynewapp-7b92a",
  //   storageBucket: "mynewapp-7b92a.appspot.com",
  //   messagingSenderId: "68827465216",
  //   appId: "1:68827465216:web:da1c361dd026d5a9973ae5"
  // }
  firebase.initializeApp(environment.firebaseConfig);


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SignupComponent,
    SigninComponent
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireDatabaseModule, // database
    AngularFireStorageModule, // storage,
    BrowserModule,
    FormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: 'welcome', component: WelcomeComponent },
      { path: '', redirectTo: 'welcome', pathMatch: 'full' },
      // { path: '**', redirectTo: 'welcome', pathMatch: 'full' },
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent }
    ]),
    ProductModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
