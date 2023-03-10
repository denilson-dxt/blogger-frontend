import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { Action } from "rxjs/internal/scheduler/Action";
import { ICategory } from "src/app/interfaces/category";
import { CategoryService } from "src/app/services/category.service";
import { createCategory, createCategoryFailure, createCategorySuccess, deleteCategory, deleteCategoryFailure, deleteCategorySuccess, getAllCategories, getAllCategoriesFailure, getAllCategoriesSuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from "../actions/category.actions";

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

  createCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createCategory),
      exhaustMap(actions => {
        return this.categoryService.createCategory(actions.category).pipe(
          map(category => createCategorySuccess({ category: category })),
          catchError(error => of(createCategoryFailure({ error: error })))
        )
      })
    )
  })

  updateCategory$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateCategory),
      exhaustMap(actions => this.categoryService.updateCategory(actions.category).pipe(
        map(category => updateCategorySuccess({ category: category })),
        catchError(error => of(updateCategoryFailure({ error: error })))
      ))
    ))

  deleteCategory$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(deleteCategory),
      exhaustMap(actions => this.categoryService.deleteCategory(actions.categoryId).pipe(
        map(status => deleteCategorySuccess({categoryId: actions.categoryId})),
        catchError(error => of(deleteCategoryFailure({error: error})))
      ))
    )
  })
}