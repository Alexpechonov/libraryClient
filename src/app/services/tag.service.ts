import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class TagService {

  constructor(private http: Http) {
  }

  getById(id: number) {
    return this.http.get(`${openServiceEndpoint}/tag/` + id).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(`${openServiceEndpoint}/tag/`).map((response: Response) => response.json());
  }
}
