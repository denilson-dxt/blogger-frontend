import { createReducer, on } from "@ngrx/store";
import { IFile } from "src/app/interfaces/file";
import { IFolder } from "src/app/interfaces/folder";
import { getAllCategoriesFailure } from "../actions/category.actions";
import { getAllFiles, getAllFilesFailure, getAllFilesSuccess, getAllFolders, getAllFolderSucess } from "../actions/files.actions";

export interface IFilesState{
    folders:IFolder[];
    files:IFile[];
}

const initialState:IFilesState = {
    folders: [],
    files: []
} 

export const filesReducer = createReducer<IFilesState>(
    initialState, 
    on(getAllFolders, (state) => {
        return {...state}
    }),
    on(getAllFolderSucess, (state, {folders}) => {
        return {...state, folders: folders}
    }),
    on(getAllCategoriesFailure, (state, {error}) => {
        return {...state}
    }),

    on(getAllFiles, (state) => {
        return {...state}
    }),
    on(getAllFilesSuccess, (state, {files}) => {
        return {...state, files: files}
    }),
    on(getAllFilesFailure, (state, error) => {
        return {...state}
    })
)
