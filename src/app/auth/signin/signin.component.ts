import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  onSignin(f: NgForm) {
    const signinEmail = f.value.email;
    const signinPassword = f.value.password;
    this.authService.signinUser(signinEmail, signinPassword);
  }
}
