import { Component, OnInit } from '@angular/core';
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

  categories$?:Observable<ICategory[]>;
  constructor(private store:Store<IAppState>) { }

  ngOnInit(): void {
    this.store.dispatch(getAllCategories());
    this.categories$ = this.store.pipe(select(selectAllCategories));
  }

}
