import {Component} from "@angular/core";
import {Category} from "../../../../entities/category";
import {CategoryService} from "../../../../services/category.service";

@Component({
  selector: 'admin-manage',
  templateUrl: './admin.manage.html',
  styleUrls: ['./admin.manage.css']
})
export class AdminManageComponent {
  categories: Category[] = [];
  category: string = "";

  constructor(private categoryService: CategoryService) {
    this.getAll();
  }

  getAll() {
    this.categoryService.getAll().subscribe(data => {
      this.categories = data;
    })
  }

  addCategory() {
    if (this.category == undefined || this.category == "") return;
    this.categoryService.create(this.category).subscribe(data => {
      this.getAll();
    })
  }

  deleteCategory(category: Category) {
    this.categoryService.delete(category.id).subscribe(data => {
      this.categories.splice(this.categories.indexOf(category, 0), 1);
    })
  }
}
