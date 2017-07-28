import {Component} from "@angular/core";
import {Instruction} from "../../../entities/instruction";
import {Router, ActivatedRoute} from "@angular/router";
import {InstructionService} from "../../../services/instruction.service";
import {Part} from "../../../entities/part";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/user.service";

declare var $: any;
declare var jsPDF: any;

@Component({
  selector: 'instruction_watch',
  templateUrl: './instruction.watch.component.html',
  styleUrls: ['./instruction.watch.component.css']
})
export class InstructionWatchComponent {
  private instruction: Instruction = new Instruction();
  private user: User = new User;
  isAuthor: boolean;

  constructor(private instructionService: InstructionService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.user = userService.getAuthUser();
    userService.authData.subscribe(item => {
      this.user = item;
    });
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
        this.isAuthor = (this.instruction.user.id == this.user.id);
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  addFilter(filter: string, part: Part) {
    let image = part.data.split("/").pop();
    part.data = filter + "/" + image;
  }

  makeLinkToImg(img: string) {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + img;
  }

  generatePdf() {
    let doc = new jsPDF();
    let specialElementHandlers = {
      '#editor': function(element, renderer){
        return true;
      }
    };
    doc.fromHTML($('section').get(0), 15, 15, {
      'width': 170,
      'elementHandlers': specialElementHandlers
    }, function () {
      doc.save('saveInCallback.pdf');
    });
  }

}
