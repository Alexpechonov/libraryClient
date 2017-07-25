import {Injectable, EventEmitter} from '@angular/core';
import {JwtHelper} from "angular2-jwt";
import {UserService} from "./user.service";
import {Router} from "@angular/router";
import {User} from "../entities/user";

declare var Auth0Lock: any;

@Injectable()
export class AuthService {

  user: User = new User();

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
      this.createNewUser(profile);
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

  createNewUser(profile) {
    switch (profile.identities["0"].provider) {
      case 'twitter':
        this.parseTwitterData(profile);
        break;
      case 'vkontakte':
        this.parseVkontakteData(profile);
        break;
      default:
        alert("Unknown provider");
    }
    this.user.image = "sample";
    this.userService.updateAuthUser(this.user);
    this.userService.login().subscribe(data => {
      localStorage.setItem('token', data.text());
      this.userService.getCurrentUser().subscribe(data => {
        this.userService.updateAuthUser(data);
        this.isLoggedIn.emit(true);
      })
    });
  }

  parseTwitterData(profile) {
    [this.user.firstName, this.user.lastName] = profile.name.split(" ");
    this.user.identity = profile.identities["0"].user_id;
    this.user.userName = profile.user_id;
  }

  parseVkontakteData(profile) {
    this.user.firstName = profile.given_name;
    this.user.lastName = profile.family_name;
    this.user.identity = profile.identities["0"].user_id;
    this.user.userName = profile.user_id;
  }
}
