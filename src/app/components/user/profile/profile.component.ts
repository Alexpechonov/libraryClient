import {Component, OnInit} from "@angular/core";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/user.service";
import {CloudinaryUploader, CloudinaryOptions} from "ng2-cloudinary";
import {Instruction} from "../../../entities/instruction";
import {InstructionService} from "../../../services/instruction.service";
import {Router} from "@angular/router";

declare var Materialize: any;

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();
  instructions: Instruction[] = [];

  uploader: CloudinaryUploader = new CloudinaryUploader(new CloudinaryOptions({
    cloudName: 'libraryofinstructions',
    uploadPreset: 'qrejk1xv'
  }));

  constructor(private userService: UserService,
              private instructionService: InstructionService,
              private router: Router) {
    this.user = userService.getAuthUser();
    userService.authData.subscribe(data => {
      this.user = data;
      this.getInstructions();
    })
    this.getInstructions();
    this.configUploader();
    window.scrollTo(0,0);
  }

  getInstructions() {
    this.instructionService.getAllByUser(this.user.id).subscribe(data => {
      this.instructions = data;
    })
  }


  configUploader() {
    this.uploader.onAfterAddingFile = (item: any) => {
      this.upload();
      return item;
    };

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.user.image = res.public_id;
      this.updateUser();
      return {item, response, status, headers};
    };
  }

  ngOnInit(): void {
    this.user = this.userService.getAuthUser();
    setTimeout(() => {
      Materialize.updateTextFields();
    }, 300);
  }

  createNewInstruction() {
    let newInst = new Instruction();
    newInst.user = this.userService.getAuthUser();
    this.instructionService.create(newInst).subscribe(data => {
      this.userService.updateUser();
      this.router.navigate(['instruction/update',data.id]);
    });
  }

  updateUser() {
    this.userService.update(this.user).subscribe();
  }

  upload() {
    this.uploader.uploadAll();
  }
}
