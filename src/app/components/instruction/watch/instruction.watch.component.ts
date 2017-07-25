import {Component} from "@angular/core";
import {Instruction} from "../../../entities/instruction";
import {Router, ActivatedRoute} from "@angular/router";
import {InstructionService} from "../../../services/instruction.service";
import { DomSanitizer} from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'instruction_watch',
  templateUrl: './instruction.watch.component.html',
  styleUrls: ['./instruction.watch.component.css']
})
export class InstructionWatchComponent {
  private instruction: Instruction = new Instruction();

  constructor(private instructionService: InstructionService,
              private sanitizer: DomSanitizer,
              private route: ActivatedRoute,
              private router: Router) {
    this.configureCollapsable();
    this.takeParamFromRoute();
  }

  configureCollapsable() {
    $(document).ready(function () {
      $(".collapsible").collapsible();
    });
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

  makeLinkToImg(img: string) {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/v1501006952/" + img;
  }

}
