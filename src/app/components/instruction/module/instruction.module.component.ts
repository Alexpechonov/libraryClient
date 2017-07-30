import {Component, Input} from "@angular/core";
import {Instruction} from "../../../entities/instruction";

@Component({
  selector: 'instruction-module',
  templateUrl: './instruction.module.component.html',
  styleUrls: ['./instruction.module.component.css']
})
export class InstructionModuleComponent {
  @Input() instructions: Instruction[] = [];
  showedInstructions: Instruction[] = [];

  addCount: number = 12;

  constructor() {
    this.addItems();
  }

  addItems() {
    if (!this.instructions.length) return;
    this.showedInstructions = this.showedInstructions.concat(this.instructions.splice(0, this.addCount));
  }
}
