import { Component, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ICategory } from 'src/app/interfaces/category';
import { getAllCategories } from 'src/app/store/actions/category.actions';
import { IAppState } from 'src/app/store/reducers';
import { selectAllCategories } from 'src/app/store/selectors/category.selector';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  selectedCategory?:ICategory;

  @Output()
  isCategoryFormOpen:boolean = false;
  
  categories$?:Observable<ICategory[]>;
  filteredCategories:ICategory[] = [];
  search:string = "";
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories());
    this.categories$ = this.store.pipe(select(selectAllCategories));
    this.categories$.subscribe(categories => {
      this.filteredCategories = categories;
    })
  }
  
  onSearchInputChange(event$:any){
    let value = event$.trim();
    console.log(value);
    this.categories$?.subscribe(data => {
      this.filteredCategories =  data.filter(cat => {
        return cat.description.includes(value) || cat.slug.includes(value);
      })
    })
  }
  openCategoryForm():void{
    this.isCategoryFormOpen = true;
  }
  onNewCategory(){
    this.selectedCategory = undefined;
      this.openCategoryForm();
  }
  closeCategoryForm(){
    this.isCategoryFormOpen = false;
  }
  onEditCategory(category:ICategory){
    this.selectedCategory = category;
    this.openCategoryForm();
  }
}
