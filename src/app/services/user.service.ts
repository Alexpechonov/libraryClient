import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../entities/user";
import "rxjs/add/operator/map";
import {Http, Response} from "@angular/http";
import {AppSettings} from "./endpoint";
import {AuthHttp, JwtHelper} from "angular2-jwt";

const webServiceEndpoint = AppSettings.webServiceEndpoint;

@Injectable()
export class UserService {
  private user: User = new User();
  authData: EventEmitter<User> = new EventEmitter();

  constructor(private http: Http,
              private authHttp: AuthHttp) {
    if (this.loggedIn()) {
      this.getCurrentUser().subscribe(
        data => {
          this.user = data;
          this.authData.emit(this.user);
        }
      );
    }
  }

  updateAuthUser(user: User) {
    this.user = user;
    let newUser = this.getAuthUser();
    this.authData.emit(newUser);
  }

  getAuthUser(): User {
    let user: User = new User();
    user.identity = this.user.identity;
    user.enabled = this.user.enabled;
    user.image = this.user.image;
    user.firstName = this.user.firstName;
    user.id = this.user.id;
    user.lastName = this.user.lastName;
    user.about = this.user.about;
    user.role = this.user.role;
    return user;
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
    this.login().subscribe(data => {
      localStorage.setItem('token', data.text());
      this.getCurrentUser().subscribe(data => {
        this.updateAuthUser(data);
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

  loggedIn(): boolean {
    let jwt: JwtHelper = new JwtHelper();
    return localStorage.getItem('token') !== null && !jwt.isTokenExpired(localStorage.getItem('token'));
  }

  getById(id: number) {
    return this.authHttp.get(`${webServiceEndpoint}/user/` + id)
      .map((response: Response) => response.json());
  }

  login() {
    return this.http.post(`${webServiceEndpoint}/user/login`, this.user).map((response: Response) => response);
  }

  getCurrentUser() {
    return this.authHttp.get(`${webServiceEndpoint}/user/me`).map((response: Response) => response.json());
  }

  update() {
    return this.authHttp.put(`${webServiceEndpoint}/user`, this.user).map((response: Response) => response.json());
  }
}

