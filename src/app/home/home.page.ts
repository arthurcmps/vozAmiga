import { Component } from '@angular/core';
import { Auth, getAuth, signInWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  email: string = '';
  password: string = '';

  constructor() {}
  login() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log('Login successful:', user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed:', errorCode, errorMessage);
      });
  }

}
