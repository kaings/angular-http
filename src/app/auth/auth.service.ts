import * as firebase from 'firebase';

export class AuthService {
  tokenKey: string = 'testingABC...';

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
          console.log('token from response when getToken() ... ', tokenKey);
          console.log('token from signin() ... ', this.tokenKey)
          this.tokenKey = tokenKey;

          /* the following is NG... since this is async process, the return value at server.service.ts
          getData() const tokenKey (which is sync process) will be executed first before this return.
          Instead, put return outside the promise is the way to go */
          // return this.tokenKey;
        }
      );

    console.log('token from signin()... ', this.tokenKey);
    return this.tokenKey;
  }


}
