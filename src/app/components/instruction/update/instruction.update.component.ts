import {Component, OnInit} from "@angular/core";
import {InstructionService} from "../../../services/instruction.service";
import {Instruction} from "../../../entities/instruction";
import {ActivatedRoute, Router} from "@angular/router";
import {Part} from "../../../entities/part";
import {Step} from "../../../entities/step";
import {TagService} from "../../../services/tag.service";
import {Tag} from "../../../entities/tag";

declare var $: any;

@Component({
  selector: 'instruction_update',
  templateUrl: './instruction.update.component.html',
  styleUrls: ['./instruction.update.component.css']
})
export class InstructionUpdateComponent implements OnInit {

  private instruction: Instruction = new Instruction();
  private tags: Tag[] = [];

  ngOnInit() {
    this.loadTags();
    this.takeParamFromRoute();
  }

  constructor(private instructionService: InstructionService,
              private tagService: TagService,
              private route: ActivatedRoute,
              private router: Router) {
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
      }, error => {
        this.router.navigate(['404']);
      });
    });
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
    for (let tag of this.tags) {
      tags.push({tag: tag.name});
    }

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
}
