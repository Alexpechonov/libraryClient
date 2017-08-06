import {Component} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {SearchService} from "../../../services/search.service";
import {SearchResult} from "../../../entities/searchResult";

@Component({
  selector: 'search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: SearchResult[] = [];
  searchData: string;

  constructor(private route: ActivatedRoute,
              private searchService: SearchService) {
    this.takeParamFromRoute();
  }

  takeParamFromRoute() {
    this.route.params.subscribe(params => {
      this.searchData = params['data'];
      this.getResult();
    });
  }

  search(event) {
    if (event.keyCode != 13) return;
    this.getResult();
  }

  getResult() {
    if (this.searchData == "") return;
    this.searchService.search(this.searchData).subscribe(data => {
      this.searchResults = data;
    });
  }
}
