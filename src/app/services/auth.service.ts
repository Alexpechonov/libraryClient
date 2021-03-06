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
  isAdministrator: EventEmitter<boolean> = new EventEmitter();

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
    this.isAdministrator.emit(false);
    this.router.navigate(['/']);
  }

  public static isAdmin(): boolean {
    if (this.loggedIn()) {
      let token = localStorage.getItem('token');
      let jwtHelper: JwtHelper = new JwtHelper();
      let isAdmin = jwtHelper.decodeToken(token).role == 'ROLE_ADMIN';
      if (isAdmin) {
        return true;
      }
    }
    return false;
  }

  public static loggedIn(): boolean {
    let jwt: JwtHelper = new JwtHelper();
    return localStorage.getItem('token') !== null && !jwt.isTokenExpired(localStorage.getItem('token'));
  }

  createNewUser(profile) {
    switch (profile.identities["0"].provider) {
      case 'twitter':
        this.parseTwitterData(profile);
        break;
      case 'facebook':
      case 'vkontakte':
      case 'google-oauth2':
        this.parseSocialData(profile);
        break;
      default:
        alert("Unknown provider");
    }
    this.user.image = "sample";
    this.loginRequest();
  }

  loginRequest() {
    this.userService.updateAuthUser(this.user);
    this.userService.login().subscribe(data => {
      localStorage.setItem('token', data.text());
      this.getCurUser();
    }, error => {
      alert("Your account is blocked");
    });
  }

  getCurUser() {
    this.userService.getCurrentUser().subscribe(data => {
      this.userService.updateAuthUser(data);
      this.isLoggedIn.emit(true);
      if (data.role == "ROLE_ADMIN") {
        this.isAdministrator.emit(true);
      }
    })
  }

  parseTwitterData(profile) {
    [this.user.firstName, this.user.lastName] = profile.name.split(" ");
    this.user.identity = profile.identities["0"].user_id;
    this.user.userName = profile.user_id;
  }

  parseSocialData(profile) {
    this.user.firstName = profile.given_name;
    this.user.lastName = profile.family_name;
    this.user.identity = profile.identities["0"].user_id;
    this.user.userName = profile.user_id;
  }
}
