import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {Instruction} from "../../../entities/instruction";

@Component({
  selector: 'instruction-module',
  templateUrl: './instruction.module.component.html',
  styleUrls: ['./instruction.module.component.css']
})
export class InstructionModuleComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.sortByName();
    this.addItems();
  }
  @Input() instructions: Instruction[] = [];
  @Input() withSort: boolean;
  showedInstructions: Instruction[] = [];

  addCount: number = 12;

  sortTypes = [{id: 1, name: "name"},
    {id: 2, name: "username"},
    {id: 3, name: "category"}];
  currentSort = {id: this.sortTypes[0].id, name: this.sortTypes[0].name};

  constructor() {
    this.sortByName();
    this.addItems();
  }

  addItems() {
    if (!this.instructions.length) return;
    this.showedInstructions = this.showedInstructions.concat(this.instructions.splice(0, this.addCount));
  }

  changeSort(data) {
    this.instructions = this.instructions.concat(this.showedInstructions);
    this.showedInstructions = [];
    this.sort(this.sortTypes[data.value - 1].name);
    this.addItems();
  }

  sort(sortName: string) {
    switch (sortName) {
      case "name":
        this.sortByName();
        break;
      case "username":
        this.sortByUsername();
        break;
      case "category":
        this.sortByCategory();
        break;
      default:
        alert("Unknown sort type");
    }
  }

  sortByName() {
    this.instructions.sort(function (instructiona: Instruction, instructionb: Instruction) {
      if (instructiona.name == null) { return -1; }
      if (instructionb.name == null) { return 1; }
      return instructiona.name.localeCompare(instructionb.name);
    });
  }

  sortByUsername() {
    this.instructions.sort(function (instructiona: Instruction, instructionb: Instruction) {
      if (instructiona.user.firstName == null) { return -1; }
      if (instructionb.user.firstName == null) { return 1; }
      return instructiona.user.firstName.localeCompare(instructionb.user.firstName);
    });
  }

  sortByCategory() {
    this.instructions.sort(function (instructiona: Instruction, instructionb: Instruction) {
      if (instructiona.category.name == null) { return -1; }
      if (instructionb.category.name == null) { return 1; }
      return instructiona.category.name.localeCompare(instructionb.category.name);
    });
  }
}
