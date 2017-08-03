import {Component} from "@angular/core";
import {Instruction} from "../../../entities/instruction";
import {Router, ActivatedRoute} from "@angular/router";
import {InstructionService} from "../../../services/instruction.service";
import {Part} from "../../../entities/part";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/user.service";
import {AuthService} from "../../../services/auth.service";
import {CommentService} from "../../../services/comment.service";
import {Comment} from "../../../entities/comment"
import {Tag} from "../../../entities/tag";
import {TagService} from "../../../services/tag.service";

declare var $: any;

@Component({
  selector: 'instruction_tag',
  templateUrl: './instruction.bytag.component.html',
  styleUrls: ['./instruction.bytag.component.css']
})
export class InstructionByTagComponent {
  instructions: Instruction[] = [];
  tag: Tag;

  ready: boolean = false;

  constructor(private route: ActivatedRoute,
              private instructionService: InstructionService,
              private tagService: TagService,
              private router: Router) {
    this.takeParamFromRoute();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.getInstructions(params['id']);
      this.getTag(params['id']);
    });
  }

  getInstructions(id: number) {
    this.instructionService.getAllByTag(id).subscribe(data => {
      this.instructions = data;
    }, error => {
      this.router.navigate(['404']);
    });
  }

  getTag(id: number) {
    this.tagService.getById(id).subscribe(data => {
      this.tag = data;
      this.ready = true;
    }, error => {
      this.router.navigate(['404']);
    })
  }
}
