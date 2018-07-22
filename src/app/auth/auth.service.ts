import * as firebase from 'firebase';

export class AuthService {
  signupUser (email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(
        (response: any) => console.log(response)
      )
      .catch(
        (error) => console.log(error)
      );

  }
}
