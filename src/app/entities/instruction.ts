import {User} from "./user";
import {Step} from "./step";
import {Tag} from "./tag";

export class Instruction {
  id: number;
  name: string;
  user: User;
  steps: Step[];
  tags: Tag[];

  constructor() {
    this.steps = [];
    this.tags = [];
  }
}
