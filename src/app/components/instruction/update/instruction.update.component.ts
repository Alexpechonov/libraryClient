import {Component, OnInit} from "@angular/core";
import {InstructionService} from "../../../services/instruction.service";
import {Instruction} from "../../../entities/instruction";
import {ActivatedRoute, Router} from "@angular/router";
import {Part} from "../../../entities/part";
import {Step} from "../../../entities/step";
import {TagService} from "../../../services/tag.service";
import {Tag} from "../../../entities/tag";
import {UserService} from "../../../services/user.service";
import {User} from "../../../entities/user";
import {Category} from "../../../entities/category";
import {CategoryService} from "../../../services/category.service";

declare var Materialize: any;
declare var $: any;

@Component({
  selector: 'instruction_update',
  templateUrl: './instruction.update.component.html',
  styleUrls: ['./instruction.update.component.css']
})
export class InstructionUpdateComponent implements OnInit {

  instruction: Instruction = new Instruction();
  tags: Tag[] = [];
  user: User = new User();
  categories: Category[] = [];
  categoriesSelect: string[] = [];

  ngOnInit() {
    this.takeParamFromRoute();
    setTimeout(() => {
      Materialize.updateTextFields();
    }, 300);
  }

  constructor(private instructionService: InstructionService,
              private tagService: TagService,
              private categoryService: CategoryService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.initUser();
  }

  initUser() {
    this.user = this.userService.getAuthUser();
    this.userService.authData.subscribe(item => {
      this.user = item;
    });
  }

  createNewPart(step, type) {
    let newPart = new Part();
    newPart.type = type;
    step.parts.push(newPart);
    this.updateInstruction();
  }

  createNewStep() {
    let newStep = new Step();
    this.instruction.steps.push(newStep);
    this.updateInstruction();
  }

  deletePart(step, part) {
    step.parts.splice(step.parts.indexOf(part, 0), 1);
    this.updateInstruction();
  }

  deleteStep(step) {
    this.instruction.steps.splice(this.instruction.steps.indexOf(step, 0), 1);
    this.updateInstruction();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.instructionService.getById(params['id']).subscribe(data => {
        this.instruction = data;
        this.getUser();
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  getUser() {
    this.userService.getCurrentUser().subscribe(data => {
      if ((this.instruction.user.id != data.id) && (data.role != "ROLE_ADMIN")) {
        this.router.navigate(['instruction/watch', this.instruction.id]);
      }
      this.loadTags();
      this.loadCategories();
    })
  }

  loadCategories() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  changeCategory(event) {
    if (event.source == null) return;
    this.updateInstruction();
  }

  loadTags() {
    this.tagService.getAll().subscribe(data => {
      this.tags = data;
      this.configureChips();
    })
  }

  configureChips() {
    let obj = {};
    for (let pos in this.tags) {
      obj[this.tags[pos].name] = null;
    }
    let tags = [];
    for (let tag of this.instruction.tags) {
      tags.push({tag: tag.name});
    }

    $('.chips').on('chip.add', (e, chip) => {
      this.updateInstruction();
    }).on('chip.delete', (e, chip) => {
      this.updateInstruction();
    });

    $(function () {
      $(document).ready(function () {
        $('.chips').material_chip();
        $('.chips-autocomplete').material_chip({
          data: tags,
          autocompleteOptions: {
            data: obj,
            limit: Infinity,
            minLength: 1
          },
          placeholder: 'Enter a tag',
          secondaryPlaceholder: '+Tag',
        });
      });
    })
  }

  updateInstruction() {
    this.beforeUpdate();
    this.instructionService.update(this.instruction).subscribe(data => {
      this.instruction = data;
    });

  }

  beforeUpdate() {
    this.instruction.tags = [];
    let elements = $('div.chip');
    for (let el of elements) {
      let newTag = new Tag();
      newTag.name = el.firstChild.data;
      this.instruction.tags.push(newTag);
    }
  }

  deleteInstruction() {
    this.instructionService.delete(this.instruction.id).subscribe(data => {
      this.router.navigate(['profile/me']);
    }, error => {
      alert("Can't delete instruction");
    })
  }
}
