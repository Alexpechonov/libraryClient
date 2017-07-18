import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UserService} from "./services/user.service";
import {HttpModule} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {MaterializeModule} from "angular2-materialize";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    HttpModule,
    MaterializeModule
  ],
  providers: [
    UserService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
