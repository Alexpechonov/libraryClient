import { Injectable } from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {UserService} from "./user.service";
import {User} from "../entities/user";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  constructor(private userService: UserService){}

  lock = new Auth0Lock('z63226aYIXnSrzdbGI5frulYlrKwM2pE', 'alexpechonov.eu.auth0.com');

  login() {
    this.lock.show((error: string, profile: string, id_token: string) => {
      if (error) {
        console.log(error);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      this.userService.createNewUser(profile);
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
  }
}
