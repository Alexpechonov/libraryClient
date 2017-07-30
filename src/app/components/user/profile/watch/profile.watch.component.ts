import {Component} from "@angular/core";
import {User} from "../../../../entities/user";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";

@Component({
  selector: 'watch-profile',
  templateUrl: './profile.watch.component.html',
  styleUrls: ['./profile.watch.component.css']
})
export class WatchProfileComponent {
  user: User = new User;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.takeParamFromRoute();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.userService.getById(params['id']).subscribe(data => {
        if (data.id == this.userService.getAuthUser().id) {
          this.router.navigate(['profile/me']);
        }
        this.user = data;
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  getImage() {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + this.user.image;
  }
}
