import {Injectable, EventEmitter} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {UserService} from "./user.service";
import {Router} from "@angular/router";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  isLoggedIn: EventEmitter<boolean> = new EventEmitter();

  constructor(private userService: UserService,
              private router: Router){}

  lock = new Auth0Lock('z63226aYIXnSrzdbGI5frulYlrKwM2pE', 'alexpechonov.eu.auth0.com');

  login() {
    this.lock.show((error: string, profile: string, id_token: string) => {
      if (error) {
        console.log(error);
      }
      localStorage.setItem('profile', JSON.stringify(profile));
      localStorage.setItem('id_token', id_token);
      this.userService.createNewUser(profile);
      this.isLoggedIn.emit(true);
    });
  }

  logout() {
    localStorage.removeItem('profile');
    localStorage.removeItem('id_token');
    localStorage.removeItem('token');
    this.isLoggedIn.emit(false);
    this.router.navigate(['/']);
  }

  isAdmin(): boolean {
    if (this.loggedIn()) {
      return (this.userService.getAuthUser().role == "ROLE_ADMIN");
    }
    return false;
  }

  loggedIn(): boolean {
    let jwt: JwtHelper = new JwtHelper();
    return localStorage.getItem('token') !== null && !jwt.isTokenExpired(localStorage.getItem('token'));
  }
}
