import {Component, OnInit} from "@angular/core";
import {Instruction} from "../../entities/instruction";
import {InstructionService} from "../../services/instruction.service";
import {SearchResult} from "../../entities/searchResult";
import {SearchService} from "../../services/search.service";

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  ngOnInit(): void {
  }

  lastInstructions: Instruction[] = [];
  popularInstructions: Instruction[] = [];

  constructor(private instructionService: InstructionService) {
    this.getLastCreatedInstructions();
    this.getPopularInstructions();
  }

  getLastCreatedInstructions() {
    this.instructionService.getByCreationDate(6).subscribe(data => {
      this.lastInstructions = data;
    });
  }

  getPopularInstructions() {
    this.instructionService.getPopular(6).subscribe(data => {
      this.popularInstructions = data;
    });
  }
}
