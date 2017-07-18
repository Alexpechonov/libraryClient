import {Component} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserService} from "./services/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private auth: AuthService,
              private userService: UserService) {
  }

  login() {
    this.auth.login();
  }

  logout() {
    this.auth.logout();
  }

  getMe() {
    this.userService.getCurrentUser().subscribe(data => {
      console.log(data);
    });
  }

  isLogged() {
    return (localStorage.getItem('token') === null);
  }
}
