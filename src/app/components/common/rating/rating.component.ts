import {Component, Input, OnChanges, SimpleChanges} from "@angular/core";
import {RatingService} from "../../../services/rating.service";
import {Rating} from "../../../entities/rating";
import {AuthService} from "../../../services/auth.service";

declare var $: any;

@Component({
  selector: 'rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnChanges {
  ngOnChanges(changes: SimpleChanges): void {
    this.getRating();
    this.getUserRate();
  }

  @Input() instructionId: number;
  rate: number = 0;
  myRate: number = 0;

  show: boolean = false;
  isLoggedIn: boolean;

  constructor(private ratingService: RatingService,
              private authService: AuthService) {
    this.getAuth();
  }

  getAuth() {
    this.isLoggedIn = AuthService.loggedIn();
    this.authService.isLoggedIn.subscribe(item => {
      this.isLoggedIn = item;
    });
  }

  getUserRate() {
    if (!this.instructionId || !this.isLoggedIn) return;
    this.ratingService.getMyRate(this.instructionId).subscribe(data =>this.myRate = data, error =>{});
  }

  getRating() {
    if (!this.instructionId) return;
    this.ratingService.getInstructionRate(this.instructionId).subscribe(data =>
      this.rate = data
    );
  }

  updateRating(rating) {
    let newRating = new Rating;
    newRating.instruction.id = this.instructionId;
    newRating.rate = rating;
    this.ratingService.update(newRating).subscribe(data => {
      this.getRating();
      this.myRate = rating;
    })
  }

  showRate() {
    this.show = true;
  }

  hideRate() {
    this.show = false;
  }
}
