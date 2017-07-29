import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Instruction} from "../entities/instruction";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class InstructionService {

  constructor(private http: Http,
              private authHttp: AuthHttp){}

  create(instruction: Instruction) {
    return this.authHttp.post(`${protectedServiceEndpoint}/instruction`, instruction)
      .map((response: Response) => response.json());
  }

  update(instruction: Instruction) {
    return this.authHttp.put(`${protectedServiceEndpoint}/instruction`, instruction)
      .map((response: Response) => response.json());
  }

  getById(id: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/` + id).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(`${openServiceEndpoint}/instruction`).map((response: Response) => response.json());
  }

  getAllByUser(userId: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/user/` + userId).map((response: Response) => response.json());
  }
}
