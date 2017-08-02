import {Medal} from "./medal";
export class User {
  id: number;
  image: string;
  identity: string;
  userName: string;
  firstName: string;
  lastName: string;
  enabled: boolean;
  about: string;
  role: string;
  medals: Medal[];

  constructor() {
    this.medals = [];
  }
}
