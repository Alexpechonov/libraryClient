import {Component, Input} from "@angular/core";
import {User} from "../../../entities/user";

@Component({
  selector: 'medal-module',
  templateUrl: './medal.module.component.html',
  styleUrls: ['./medal.module.component.css']
})
export class MedalModuleComponent {
  @Input() user: User;


  constructor() {
  }

  getImage(data: string) {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + data;
  }
}
