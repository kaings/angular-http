import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignup(f: NgForm) {
    const signupEmail = f.value.email;
    const signupPassword = f.value.password;
    this.authService.signupUser(signupEmail, signupPassword);
  }

}
