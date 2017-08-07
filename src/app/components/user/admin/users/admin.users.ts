import {Component} from "@angular/core";
import {UserService} from "../../../../services/user.service";
import {User} from "../../../../entities/user";
import {Medal} from "../../../../entities/medal";
import {MedalService} from "../../../../services/medal.service";

declare var Materialize: any;

@Component({
  selector: 'admin-users',
  templateUrl: './admin.users.html',
  styleUrls: ['./admin.users.css']
})
export class AdminUsersComponent {

  users: User[] = [];
  medals: Medal[] = [];

  constructor(private userService: UserService,
              private medalService: MedalService) {
    this.getAll();
    this.getMedals();
  }

  getMedals() {
    this.medalService.getAll().subscribe(data => {
      this.medals = data;
    });
  }

  updateEnabled(user: User, enabled) {
    let index = this.users.findIndex(obj => obj.id == user.id);
    user.enabled = enabled.checked;
    this.userService.update(user).subscribe(
      data => this.getUpdatedUser(index)
    );
  }

  getUpdatedUser(index: number) {
    this.userService.getById(this.users[index].id).subscribe(data => {
      this.users[index] = data;
    })
  }

  getAll() {
    this.userService.getAll().subscribe(data => this.users = data);
  }

  deleteUser(user: User) {
    this.userService.delete(user.id).subscribe(
      data => this.getAll()
    );
  }

  getImage(medal: Medal, user: User) {
    if (!this.checkExist(medal.name, user.medals)) {
      return "http://res.cloudinary.com/libraryofinstructions/image/upload/e_grayscale/" + medal.image;
    }
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + medal.image;
  }

  changeStateOfMedal(medal: Medal, user: User) {
    if (!this.checkExist(medal.name, user.medals)) {
      this.addMedal(user.id, medal);
    } else {
      this.removeMedal(user.id, medal);
    }
  }

  checkExist(name: string, medals: Medal[]): boolean {
    if (!medals.find(myObj => myObj.name == name)) {
      return false;
    }
    return true;
  }

  addMedal(userId: number, medal: Medal) {
    let index = this.users.findIndex(obj => obj.id == userId);
    this.medalService.addToUser(medal, userId).subscribe(data => {
      this.getUpdatedUser(index)
      Materialize.toast('Medal added', 3000, 'rounded')
    })
  }

  removeMedal(userId: number, medal: Medal) {
    let index = this.users.findIndex(obj => obj.id == userId);
    this.medalService.deleteFromUser(medal, userId).subscribe(data => {
      this.getUpdatedUser(index)
      Materialize.toast('Medal deleted', 3000, 'rounded')
    })
  }
}
