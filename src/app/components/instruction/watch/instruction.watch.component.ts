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

declare var $: any;
declare var jsPDF: any;

@Component({
  selector: 'instruction_watch',
  templateUrl: './instruction.watch.component.html',
  styleUrls: ['./instruction.watch.component.css']
})
export class InstructionWatchComponent {
  instruction: Instruction = new Instruction;
  comments = [];
  comment: string = "";
  user: User = new User;
  isAdmin: boolean;
  isAuthor: boolean;
  auth: boolean;

  constructor(private instructionService: InstructionService,
              private commentService: CommentService,
              private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.isAdmin = AuthService.isAdmin();
    authService.isAdministrator.subscribe(data => this.isAdmin = data);
    this.auth = AuthService.loggedIn();
    authService.isLoggedIn.subscribe(data => this.auth = data);
    this.user = userService.getAuthUser();
    userService.authData.subscribe(item => this.user = item);
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
        this.takeComments();
        this.getMe();
      }, error => {
        this.router.navigate(['404']);
      });
    });
  }

  getMe() {
    this.userService.getCurrentUser().subscribe(data => {
      this.isAuthor = (this.instruction.user.id == data.id);
    })
  }

  takeComments() {
    for (let i in this.instruction.steps) {
      this.commentService.getAllForStep(this.instruction.steps[i].id).subscribe(data => {
        this.comments[i] = data;
      })
    }
  }

  createComment(text: string, stepNumber: number) {
    this.commentService.create(this.instruction.steps[stepNumber].id, text).subscribe(
      data => {
        this.comments[stepNumber].push(data);
        this.comment = "";
      }
    );
  }

  deleteComment(comment: Comment, position: number) {
    this.commentService.delete(comment.id).subscribe(data => {
      this.comments[position].splice(this.comments[position].indexOf(comment, 0), 1);
    })
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
