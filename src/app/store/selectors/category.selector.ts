import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ICategoryState } from "../reducers/category.reducer";

export const selectFeature = createFeatureSelector<ICategoryState>("categories");

export const selectAllCategories = createSelector(selectFeature, state => state.categories);