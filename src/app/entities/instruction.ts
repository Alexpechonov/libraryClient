import {User} from "./user";
import {Step} from "./step";
import {Tag} from "./tag";
import {Category} from "./category";

export class Instruction {
  id: number;
  name: string;
  user: User;
  category: Category;
  steps: Step[];
  tags: Tag[];

  constructor() {
    this.steps = [];
    this.tags = [];
    this.category = new Category();
    this.user = new User();
  }
}
