import { createAction, props } from "@ngrx/store";
import { ICategory } from "src/app/interfaces/category";

export const getAllCategories = createAction("[Category] get all categories");
export const getAllCategoriesSuccess = createAction("[Category] get all categories success", props<{categories: ICategory[]}>())
export const getAllCategoriesFailure = createAction("[Category] get all categories failure", props<{error: any}>())