import {User} from "./user";
import {Instruction} from "./instruction";

export class Rating {
  id: number;
  user: User;
  instruction: Instruction;
  rate: number;

  constructor() {
    this.user = new User;
    this.instruction = new Instruction;
  }
}
