import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../entities/user";

@Component({
  selector: 'admin-users',
  templateUrl: './admin.users.html',
  styleUrls: ['./admin.users.css']
})
export class AdminUsersComponent {

  users: User[] = [];

  constructor(private userService: UserService) {
    this.getAll();
  }

  updateEnabled(user: User, enabled) {
    user.enabled = enabled.checked;
    this.userService.update(user).subscribe(
      data => this.getAll()
    );
  }

  getAll() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(
      data => this.getAll()
    );
  }

}
