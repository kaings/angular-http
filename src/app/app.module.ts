import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
import {RouterModule, Routes} from '@angular/router';

// import { HttpModule } from '@angular/http';     // deprecated from ng4.3

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import {AuthService} from './auth/auth.service';
import { HomeComponent } from './home/home.component';
import {AuthInterceptor} from './auth.interceptor';
import {LoggingInterceptor} from './logging.interceptor';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'sign-in', component: SigninComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule
    // HttpModule     // deprecated from ng4.3
  ],
  providers: [
    ServerService,
    AuthService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true}

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
