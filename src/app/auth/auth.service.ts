import * as firebase from 'firebase';
import {ActivatedRoute, Router} from '@angular/router';
import {Injectable} from '@angular/core';

@Injectable()   // Router and ActivatedRoute are services, you need @Injectable()
export class AuthService {
  tokenKey: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  signupUser (email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response: any) => console.log('sign-up successful!', response)
      )
      .catch(
        (error) => console.log(error)
      );

  }

  signinUser (email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(
        (response: any) => {
          console.log('sign-in successful!', response);

          /* if authenticated, and token is stored, navigate to /home */
          this.router.navigate(['home'], {relativeTo: this.activatedRoute});

          firebase.auth().currentUser.getIdToken()
            .then(
              (tokenKey: string) => {
                this.tokenKey = tokenKey;
              }
            );
        }
      )
      .catch(
        error => console.log(error)
      );

  }

  getToken() {
    firebase.auth().currentUser.getIdToken()
      .then(
        (tokenKey: string) => {
          // console.log('token from response when getToken() ... ', tokenKey);
          // console.log('token from signin() ... ', this.tokenKey)
          this.tokenKey = tokenKey;

          /* the following is NG... since this is async process, the return value at server.service.ts
          getData() const tokenKey (which is sync process) will be executed first before this return.
          Instead, put return outside the promise is the way to go */
          // return this.tokenKey;
        }
      )
      .catch(
        error => console.log('Failed fetching token!', error)
      );

    // console.log('token from signin()... ', this.tokenKey);
    return this.tokenKey;
  }

  isAuthenticated(): boolean {
    return this.tokenKey != null;
  }

  signoutUser() {
    firebase.auth().signOut();
    this.tokenKey = null;
  }

  signinWithGoogle() {
    firebase.auth().signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then(
        (response) => {
          console.log('signinWithGoogle response... ', response);

          firebase.auth().currentUser.getIdToken()
            .then(
              (tokenKey: string) => {
                this.tokenKey = tokenKey;
              }
            );

          /* if authenticated, and token is stored, navigate to /home */
          this.router.navigate(['home'], {relativeTo: this.activatedRoute});
        }
      );
  }

}
