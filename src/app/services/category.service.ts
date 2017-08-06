import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {AuthHttp} from "angular2-jwt";
import {Category} from "../entities/category";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class CategoryService {
  constructor(private http: Http,
              private authHttp: AuthHttp) {
  }

  getById(id: number) {
    return this.http.get(`${openServiceEndpoint}/category/` + id).map((response: Response) => response.json());
  }

  getAll() {
    return this.http.get(`${openServiceEndpoint}/category`).map((response: Response) => response.json());
  }

  create(name: string) {
    let category = new Category();
    category.name = name;
    return this.authHttp.post(`${protectedServiceEndpoint}/category`, category)
      .map((response: Response) => response.json())
  }

  update(category: Category) {
    return this.authHttp.put(`${protectedServiceEndpoint}/category`, category)
      .map((response: Response) => response.json())
  }

  delete(categoryId: number) {
    return this.authHttp.delete(`${protectedServiceEndpoint}/category/${categoryId}`)
      .map((response: Response) => response);
  }
}
