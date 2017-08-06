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
import {Category} from "../../../entities/category";
import {CategoryService} from "../../../services/category.service";

declare var $: any;

@Component({
  selector: 'instruction_tag',
  templateUrl: './instruction.category.component.html',
  styleUrls: ['./instruction.category.component.css']
})
export class InstructionCategoryComponent {
  instructions: Instruction[] = [];
  category: Category;

  ready: boolean = false;

  constructor(private route: ActivatedRoute,
              private instructionService: InstructionService,
              private categoryService: CategoryService,
              private router: Router) {
    this.takeParamFromRoute();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.getInstructions(params['id']);
      this.getCategory(params['id']);
    });
  }

  getInstructions(id: number) {
    this.instructionService.getAllByCategory(id).subscribe(data => {
      this.instructions = data;
    }, error => {
      this.router.navigate(['404']);
    });
  }

  getCategory(id: number) {
    this.categoryService.getById(id).subscribe(data => {
      this.category = data;
      this.ready = true;
    }, error => {
      this.router.navigate(['404']);
    })
  }
}
