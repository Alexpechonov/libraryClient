import {Component} from "@angular/core";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/user.service";

@Component({
  selector: 'users-component',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  showedUsers: User[] = [];
  users: User[] = [];

  addCount: number = 8;

  constructor(private userService: UserService) {
    this.getAll();
  }

  addItems() {
    if (!this.users.length) return;
    this.showedUsers = this.showedUsers.concat(this.users.splice(0, this.addCount));
  }

  getAll() {
    this.userService.getAll().subscribe(data => {
      this.users = data
      this.addItems()
    });
  }

  getImage(link: string) {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + link;
  }
}
