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
import {Step} from "../../../entities/step";
import {PdfmakeService} from 'ng-pdf-make/pdfmake/pdfmake.service';

declare var $: any;

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
  p: number[] = [];

  constructor(private instructionService: InstructionService,
              private commentService: CommentService,
              private authService: AuthService,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.getUser();
    this.getAdminState();
    this.getAuthState();
    this.configureCollapsable();
    this.takeParamFromRoute();
  }

  getUser() {
    this.user = this.userService.getAuthUser();
    this.userService.authData.subscribe(item => this.user = item);
  }

  getAdminState() {
    this.isAdmin = AuthService.isAdmin();
    this.authService.isAdministrator.subscribe(data => this.isAdmin = data);
  }

  getAuthState() {
    this.auth = AuthService.loggedIn();
    this.authService.isLoggedIn.subscribe(data => this.auth = data);
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
    if (!AuthService.loggedIn()) return;
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
        this.userService.updateUser();
        this.comments[stepNumber].push(data);
        this.comment = "";
      }
    );
  }

  deleteComment(comment: Comment, position: number) {
    this.comments[position].splice(this.comments[position].indexOf(comment, 0), 1);
    this.commentService.delete(comment.id).subscribe()
  }

  addFilter(filter: string, part: Part) {
    let image = part.data.split("/").pop();
    part.data = filter + "/" + image;
  }

  makeLinkToImg(img: string) {
    return "http://res.cloudinary.com/libraryofinstructions/image/upload/" + img;
  }

  async genPdf() {
    let pdfService = new PdfmakeService();
    pdfService.configureStyles({
      header: {fontSize: 30, bold: true},
      stepName: {fontSize: 18, alignment: 'center'},
      text: {fontSize: 14}
    });
    pdfService.addText(this.instruction.name, 'header');

    this.addStep(this.copySteps(), pdfService);
  }

  copySteps(): Step[] {
    let steps = [];
    for (let step of this.instruction.steps) {
      let newStep = new Step();
      let parts = [];
      let newPart = new Part();
      newPart.type = "TYPE_NAME";
      newPart.data = step.name;
      parts.push(newPart);
      for (let part of step.parts) {
        let newPart = new Part();
        newPart.id = part.id;
        newPart.type = part.type;
        newPart.data = part.data;
        parts.push(newPart);
      }
      newStep.parts = parts;
      newStep.id = step.id;
      steps.push(newStep);
    }
    return steps;
  }

  addStep(steps: Step[], pdfService: PdfmakeService) {
    if (steps == undefined || steps.length == 0) {
      pdfService.open()
      return
    }
    if (steps[0].parts == undefined || steps[0].parts.length == 0) {
      steps.shift()
      this.addStep(steps, pdfService)
      return
    }
    this.addPart(steps, pdfService, steps[0].parts.shift());
  }

  addPart(steps: Step[], pdfService: PdfmakeService, part: Part) {
    switch (part.type) {
      case "TYPE_NAME":
        this.addStepName(steps, pdfService, part.data);
        break;
      case "TYPE_IMAGE":
        this.addImage(steps, pdfService, part.data);
        break;
      case "TYPE_TEXT":
        this.addText(steps, pdfService, part.id);
        break;
      case "TYPE_VIDEO":
        this.addVideo(steps, pdfService, part.data);
        break;
      default:
        alert("Unknown part type");
    }
  }

  addImage(steps: Step[], pdfService: PdfmakeService, name: string) {
    var image = new Image();
    let newThis = this;
    image.setAttribute('crossOrigin', 'anonymous');
    image.src = this.makeLinkToImg(name);
    image.onload = function () {
      var canvas = document.createElement('canvas');
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;
      canvas.getContext('2d').drawImage(image, 0, 0);
      let data = canvas.toDataURL('image/png');
      InstructionWatchComponent.addLine(pdfService);
      pdfService.docDefinition.content.push({image: data, width: 500});
      InstructionWatchComponent.addLine(pdfService);
      newThis.addStep(steps, pdfService);
    };
  }

  addText(steps: Step[], pdfService: PdfmakeService, id: number) {
    pdfService.addText($('#part' + id + ' markdown')["0"].innerText, 'text');
    this.addStep(steps, pdfService);
  }

  addStepName(steps: Step[], pdfService: PdfmakeService, name: string) {
    pdfService.addText(name, 'stepName');
    InstructionWatchComponent.addLine(pdfService);
    this.addStep(steps, pdfService);
  }

  addVideo(steps: Step[], pdfService: PdfmakeService, key: string) {
    pdfService.addText("Link to video: " + this.makeYoutubeLink(key), 'text');
    InstructionWatchComponent.addLine(pdfService);
    this.addStep(steps, pdfService);
  }

  makeYoutubeLink(key) {
    return "https://www.youtube.com/watch?v=" + key;
  }

  static addLine(pdfService: PdfmakeService) {
    pdfService.addText(" ", 'text');
  }

  getVideoWidth() {
    let windowWidth = $(window).width();
    if (windowWidth > 800) {
      return 640;
    } else {
      return windowWidth * 0.8;
    }
  }

  getVideoHeight() {
    return this.getVideoWidth() * 0.75;
  }
}
