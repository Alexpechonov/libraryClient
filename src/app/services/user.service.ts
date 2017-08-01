import {Injectable, EventEmitter} from "@angular/core";
import {User} from "../entities/user";
import "rxjs/add/operator/map";
import {Http, Response} from "@angular/http";
import {AppSettings} from "./endpoint";
import {AuthHttp, JwtHelper} from "angular2-jwt";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

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

  loggedIn(): boolean {
    let jwt: JwtHelper = new JwtHelper();
    return localStorage.getItem('token') !== null && !jwt.isTokenExpired(localStorage.getItem('token'));
  }

  getById(id: number) {
    return this.authHttp.get(`${openServiceEndpoint}/user/` + id)
      .map((response: Response) => response.json());
  }

  login() {
    return this.http.post(`${openServiceEndpoint}/user/login`, this.user).map((response: Response) => response);
  }

  getCurrentUser() {
    return this.authHttp.get(`${protectedServiceEndpoint}/user/me`).map((response: Response) => response.json());
  }

  getAll() {
    return this.authHttp.get(`${protectedServiceEndpoint}/user`).map((response: Response) => response.json());
  }

  update(user: User) {
    return this.authHttp.put(`${protectedServiceEndpoint}/user`, user).map((response: Response) => {
      if (response.json() && response.json().id == this.user.id) {
        this.updateAuthUser(response.json());
      }
      response.json();
    });
  }

  delete(id: number) {
    return this.authHttp.delete(`${protectedServiceEndpoint}/user/` + id).map((response: Response) => response);
  }
}

