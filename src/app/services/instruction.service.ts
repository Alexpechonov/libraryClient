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

  delete(id: number) {
    return this.authHttp.delete(`${protectedServiceEndpoint}/instruction/` +  id)
      .map((response: Response) => response);
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

  getByCreationDate(count: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/creationDate/` + count).map((response: Response) => response.json());
  }

  getPopular(count: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/popular/` + count).map((response: Response) => response.json());
  }

  getAllByUser(userId: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/user/` + userId).map((response: Response) => response.json());
  }

  getAllByCategory(categoryId: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/category/` + categoryId).map((response: Response) => response.json());
  }

  getAllByTag(tagId: number) {
    return this.http.get(`${openServiceEndpoint}/instruction/tag/` + tagId).map((response: Response) => response.json());
  }
}
