import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Rating} from "../entities/rating";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class RatingService {

  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  getInstructionRate(instructionId: number) {
    return this.http.get(`${openServiceEndpoint}/rating/instruction/` + instructionId)
      .map((response: Response) => response.json());
  }

  getMyRate(instructionId: number) {
    return this.authHttp.get(`${protectedServiceEndpoint}/rating/my/` + instructionId)
      .map((response: Response) => response.json());
  }

  create(rating: Rating) {
    return this.authHttp.post(`${protectedServiceEndpoint}/rating`, rating)
      .map((response: Response) => response.json());
  }

  update(rating: Rating) {
    return this.authHttp.put(`${protectedServiceEndpoint}/rating`, rating)
      .map((response: Response) => response.json());
  }
}
