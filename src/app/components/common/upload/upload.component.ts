import {Component, Input} from "@angular/core";
import {CloudinaryUploader, CloudinaryOptions} from "ng2-cloudinary";
import {PartService} from "../../../services/part.service";
import {Part} from "../../../entities/part";

@Component({
  selector: 'image-upload',
  templateUrl: './upload.component.html'
})
export class ImageUploadComponent {
  @Input() public part: Part;
  @Input() public instructionId: number;

  public uploaded: boolean = false;

  uploader: CloudinaryUploader = new CloudinaryUploader(new CloudinaryOptions({
    cloudName: 'libraryofinstructions',
    uploadPreset: 'qrejk1xv'
  }));

  constructor(private partService: PartService) {
    this.uploader.onAfterAddingFile = (item: any) => {
      this.uploader.uploadAll();
      this.uploaded = true;
      return item;
    };

    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.uploaded = false;
      this.part.data = res.public_id;
      this.uploadPart();
      return { item, response, status, headers };
    };
  }

  uploadPart() {
    this.partService.update(this.part, this.instructionId).subscribe();
  }
}
