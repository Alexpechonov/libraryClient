import {AppSettings} from "./endpoint";
import {Injectable} from "@angular/core";
import {AuthHttp} from "angular2-jwt";
import {Http, Response} from "@angular/http";
import {Comment} from "../entities/comment"
import {UserService} from "./user.service";

const protectedServiceEndpoint = AppSettings.protectedServiceEndpoint;
const openServiceEndpoint = AppSettings.openServiceEndpoint;

@Injectable()
export class CommentService {

  constructor(private http: Http,
              private authHttp: AuthHttp,
              private userService: UserService) {
  }

  public getAllForStep(stepId: number) {
    return this.http.get(`${openServiceEndpoint}/comment/step/${stepId}`)
      .map((response: Response) => response.json());
  }

  public create(stepId: number, text: string) {
    let comment: Comment = new Comment();
    comment.text = text;
    comment.step.id = stepId;
    comment.user.id = this.userService.getAuthUser().id;
    comment.user.firstName = this.userService.getAuthUser().firstName;
    comment.user.lastName = this.userService.getAuthUser().lastName;
    comment.user.role = this.userService.getAuthUser().role;
    comment.user.image = this.userService.getAuthUser().image;
    return this.authHttp.post(`${protectedServiceEndpoint}/comment`, comment)
      .map((response: Response) => response.json());
  }

  public delete(commentId: number) {
    return this.authHttp.delete(`${protectedServiceEndpoint}/comment/${commentId}`)
      .map((response: Response) => response);
  }

  public update(comment: Comment) {
    return this.authHttp.put(`${protectedServiceEndpoint}/comment`, comment)
      .map((response: Response) => response.json())
  }
}
