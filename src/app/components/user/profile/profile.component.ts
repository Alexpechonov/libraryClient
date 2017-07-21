import {Component, OnInit} from "@angular/core";
import {User} from "../../../entities/user";
import {UserService} from "../../../services/user.service";
import {CloudinaryUploader, CloudinaryOptions} from "ng2-cloudinary";

declare var Materialize: any;

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User = new User();

  uploader: CloudinaryUploader = new CloudinaryUploader(new CloudinaryOptions({
    cloudName: 'libraryofinstructions',
    uploadPreset: 'qrejk1xv'
  }));

  constructor(private userService: UserService) {
    userService.authData.subscribe(data => {
      this.user = data;
    })

    this.uploader.onAfterAddingFile = (item: any) => {
      this.upload();
      return item;
    };

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.user.image = res.public_id;
      this.updateUser();
      return { item, response, status, headers };
    };
  }

  ngOnInit(): void {
    this.user = this.userService.getAuthUser();
    setTimeout(() => {
      Materialize.updateTextFields();
    }, 100);
  }

  updateUser() {
    this.userService.update().subscribe();
  }

  upload() {
    this.uploader.uploadAll();
  }
}
