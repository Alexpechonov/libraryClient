import {Component, Input, Output, EventEmitter} from "@angular/core";
import {CloudinaryUploader, CloudinaryOptions} from "ng2-cloudinary";
import {Part} from "../../../entities/part";

@Component({
  selector: 'image-upload',
  templateUrl: './upload.component.html'
})
export class ImageUploadComponent {
  @Input() public part: Part;
  @Output() onChange: EventEmitter<boolean> = new EventEmitter();

  public uploaded: boolean = false;

  uploader: CloudinaryUploader = new CloudinaryUploader(new CloudinaryOptions({
    cloudName: 'libraryofinstructions',
    uploadPreset: 'qrejk1xv'
  }));

  constructor() {
    this.configUploader();
  }

  configUploader() {
    this.initAfterAddingFile();
    this.initOnSuccess();
  }

  initAfterAddingFile() {
    this.uploader.onAfterAddingFile = (item: any) => {
      this.uploader.uploadAll();
      this.uploaded = true;
      return item;
    };
  }

  initOnSuccess() {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.uploaded = false;
      this.part.data = res.public_id;
      this.onChange.emit(true)
      return { item, response, status, headers };
    };
  }
}
