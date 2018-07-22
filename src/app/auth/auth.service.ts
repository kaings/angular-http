import * as firebase from 'firebase';

export class AuthService {
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
        (response: any) => console.log('sign-in successful!', response)
      )
      .catch(
        error => console.log(error)
      );
  }
}
