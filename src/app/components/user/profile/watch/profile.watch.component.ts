import {Component} from "@angular/core";
import {User} from "../../../../entities/user";
import {Router, ActivatedRoute} from "@angular/router";
import {UserService} from "../../../../services/user.service";
import {Instruction} from "../../../../entities/instruction";
import {InstructionService} from "../../../../services/instruction.service";

@Component({
  selector: 'watch-profile',
  templateUrl: './profile.watch.component.html',
  styleUrls: ['./profile.watch.component.css']
})
export class WatchProfileComponent {
  user: User = new User;
  instructions: Instruction[] = [];

  constructor(private instructionService: InstructionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.takeParamFromRoute();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.userService.getById(params['id']).subscribe(data => {
        this.user = data;
        this.getInstructions();
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  getInstructions() {
    this.instructionService.getAllByUser(this.user.id).subscribe(data => {
      this.instructions = data;
    })
  }

  getImage() {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + this.user.image;
  }
}
