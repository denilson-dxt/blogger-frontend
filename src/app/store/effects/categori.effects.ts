import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { ICategory } from "src/app/interfaces/category";
import { CategoryService } from "src/app/services/category.service";
import { getAllCategories, getAllCategoriesFailure, getAllCategoriesSuccess } from "../actions/category.actions";

const cat: ICategory[] = [];

@Injectable()
export class CategoryEffect {
  constructor(private categoryService: CategoryService, private actions$: Actions) { }


  loadCategories$ = createEffect(() => this.actions$.pipe(
    ofType(getAllCategories),
    exhaustMap(actions =>
      this.categoryService.getAllCategories().pipe(
        map(categories => getAllCategoriesSuccess({ categories: categories })),
        catchError(error => of(getAllCategoriesFailure({ error: error })))
      )
    )
  )
  )
}