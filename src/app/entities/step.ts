import {Part} from "./part";

export class Step {
  id: number;
  name: string;
  parts: Part[];

  constructor() {
    this.parts = [];
  }
}
