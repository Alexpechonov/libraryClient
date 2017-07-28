import {User} from "./user";
import {Step} from "./step";
export class Comment {
  id: number;
  text: string;
  user: User;
  step: Step;
  creationDate: any;

  constructor() {
    this.user = new User();
    this.step = new Step();
  }
}
