import { createAction, props } from "@ngrx/store";
import { ICategory } from "src/app/interfaces/category";

export const getAllCategories = createAction("[Category] get all categories");
export const getAllCategoriesSuccess = createAction("[Category] get all categories success", props<{categories: ICategory[]}>())
export const getAllCategoriesFailure = createAction("[Category] get all categories failure", props<{error: any}>())


export const createCategory = createAction("[Category] create category", props<{category:ICategory}>());
export const createCategorySuccess = createAction("[Category] create category success", props<{category:ICategory}>())
export const createCategoryFailure = createAction("[Category] create category failure", props<{error:any}>())

export const updateCategory = createAction("[Category] update category", props<{category:ICategory}>());
export const updateCategorySuccess = createAction("[Category] update category success", props<{category:ICategory}>())
export const updateCategoryFailure = createAction("[Category] update category failure", props<{error:any}>())
