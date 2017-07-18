import {Injectable} from "@angular/core";
import {User} from "../entities/user";
import "rxjs/add/operator/map";
import {Http, Response} from "@angular/http";
import {AppSettings} from "./endpoint";

declare var $: any;

const webServiceEndpoint = AppSettings.webServiceEndpoint;

@Injectable()
export class UserService {
  private user: User = new User();

  constructor(private http: Http) {
  }

  updateAuthUser(user: User) {
    this.user = user;
  }

  getAuthUser(): User {
    let user: User = new User();
    user.identity = this.user.identity;
    user.enabled = this.user.enabled;
    user.picture = this.user.picture;
    user.firstName = this.user.firstName;
    user.id = this.user.id;
    user.secondName = this.user.secondName;
    user.about = this.user.about;
    user.role = this.user.role;
    return user;
  }

  getById(id: number) {
    return this.http.get(`${webServiceEndpoint}/user/` + id)
      .map((response: Response) => response.json());
  }

  login(token: string) {
    return this.http.post(`${webServiceEndpoint}/user/login`, token)
      .map((response: Response) => response.json());
  }
}

