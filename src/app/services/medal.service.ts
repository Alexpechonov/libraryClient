import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Response, Http} from "@angular/http";
import {Medal} from "../entities/medal";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class MedalService {
  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  getAll() {
    return this.http.get(`${openServiceEndpoint}/medal`).map((response: Response) => response.json());
  }

  addToUser(medal: Medal, userId: number) {
    return this.authHttp.post(`${protectedServiceEndpoint}/medal/user/` + userId, medal)
      .map((response: Response) => response);
  }

  deleteFromUser(medal: Medal, userId: number) {
    return this.authHttp.put(`${protectedServiceEndpoint}/medal/user/` + userId, medal)
      .map((response: Response) => response);
  }
}
