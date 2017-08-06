import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Instruction} from "../entities/instruction";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class SearchService {
  constructor(private http: Http) {
  }

  search(string: string) {
    return this.http.get(`${openServiceEndpoint}/search/` + string).map((response: Response) => response.json());
  }
}
