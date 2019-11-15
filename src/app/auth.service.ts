import { Injectable } from '@angular/core';
import { User } from "../app/User";
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  isUserLoggedIn:Subject<boolean>=new Subject<boolean>()

  constructor(
    public afs: AngularFirestore,   
    public afAuth: AngularFireAuth, 
    public router: Router
  ) {    
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        //JSON.parse(localStorage.getItem('user'));
        this.isUserLoggedIn.next(true)
      } else {
        localStorage.setItem('user', null);
        //JSON.parse(localStorage.getItem('user'));
        this.isUserLoggedIn.next(false)
      }
    })
  }
  
   isUserLogged(){
   return this.afAuth.authState
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((result) => {
        this.SetUserData(result.user);
        this.router.navigate(['home']);        
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign up with email/password
  SignUp(email, password) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then((result) => {        
        this.SetUserData(result.user);
        this.router.navigate(['home'])
      }).catch((error) => {
        window.alert(error.message)
      })
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider());
  } 

  // Sign in with Facebook
  FacebookAuth(){
    return this.AuthLogin(new auth.FacebookAuthProvider());
  }

  // Sign in with Twitter
  TwitterAuth(){
    return this.AuthLogin(new auth.TwitterAuthProvider())
  }

  // Auth logic to run auth providers
  AuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
    .then((result) => {
      this.router.navigate(['home']);
      this.SetUserData(result.user);
    }).catch((error) => {
      window.alert(error)
    })
  }

  
  SetUserData(user) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName
    }
    return userRef.set(userData, {
      merge: true
    })
  }

  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.isUserLoggedIn.next(false)
      this.router.navigate(['login']);
    })
  }

}
