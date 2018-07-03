import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {ServerService} from './server.service';
// import { HttpModule } from '@angular/http';     // deprecated from ng4.3

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
    // HttpModule     // deprecated from ng4.3
  ],
  providers: [ServerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
