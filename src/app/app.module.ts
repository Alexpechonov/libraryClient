import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {UserService} from "./services/user.service";
import {HttpModule, Http, RequestOptions} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {MaterializeModule} from "angular2-materialize";
import {CommonModule} from "@angular/common";
import {AuthHttp} from "angular2-jwt";
import {authHttpServiceFactory} from "./factories/auth.factory";

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
    {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions]
    },
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
