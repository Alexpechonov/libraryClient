import {Component} from "@angular/core";
import {Instruction} from "../../../entities/instruction";
import {InstructionService} from "../../../services/instruction.service";

@Component({
  selector: 'instruction-component',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent {
  instructions: Instruction[] = [];

  constructor(private instructionService: InstructionService){
    this.getInstructions();
  }

  getInstructions() {
    this.instructionService.getAll().subscribe(data => {
      this.instructions = data;
    })
  }
}
