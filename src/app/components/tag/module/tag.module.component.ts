import {Component} from "@angular/core";
import {Tag} from "../../../entities/tag";
import {TagService} from "../../../services/tag.service";

declare var TagCanvas: any;
declare var $: any;

@Component({
  selector: 'tag-module',
  templateUrl: './tag.module.component.html',
  styleUrls: ['./tag.module.component.css']
})
export class TagModuleComponent {
  tags: Tag[] = [];

  constructor(private tagService: TagService) {
    this.getTags();
  }

  getTags() {
    this.tagService.getAll().subscribe(data => {
      this.tags = data;
      this.startAnimation();
    }, error => {
      alert("Can't load tags");
    });
  }

  startAnimation() {
    $(document).ready(function () {
      try {
        TagCanvas.Start('myCanvas', 'tags', {
          textFont: 'Impact,"Arial Black",sans-serif',
          textColour: null,
          outlineColour: '#5cff52',
          textHeight: 15,
          shape: "sphere",
        });
      } catch (e) {
        $('#myCanvasContainer').style.display = 'none';
      }
    });
  }
}
