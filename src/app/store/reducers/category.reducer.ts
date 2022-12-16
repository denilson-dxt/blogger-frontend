import { createReducer, on } from "@ngrx/store";
import { ICategory } from "src/app/interfaces/category";
import { createCategory, createCategoryFailure, createCategorySuccess, getAllCategories, getAllCategoriesFailure, getAllCategoriesSuccess, updateCategory, updateCategoryFailure, updateCategorySuccess } from "../actions/category.actions";

export interface ICategoryState{
    categories: ICategory[];
}

const initialState:ICategoryState = {
    categories: []
}

export const categoryReducer = createReducer(
    initialState, 
    on(getAllCategories, (state) => {
        return {...state}
    }),
    on(getAllCategoriesSuccess, (state, {categories}) => {
        return {...state, categories: [...categories]};
    }),
    on(getAllCategoriesFailure, (state, {error}) => {
        return {...state};
    }),

    on(createCategory, (state) => {
        return {...state}
    }),
    on(createCategorySuccess, (state, {category})=>{
        return {...state, categories: [...state.categories, category]}
    }),
    on(createCategoryFailure, (state, {error})=>{
        return {...state}
    }),

    on(updateCategory, (state) => {
        return {...state}
    }),
    on(updateCategorySuccess, (state, {category})=>{
        let categoriesTmp = state.categories.map(cat => {
            if(cat.id == category.id) return category;
            return cat;
        });

        return {...state, categories: [...categoriesTmp]}
    }),
    on(updateCategoryFailure, (state, {error})=>{
        return {...state}
    })

)