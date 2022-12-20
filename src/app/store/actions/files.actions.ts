import { createAction, props } from "@ngrx/store";
import { IFile } from "src/app/interfaces/file";
import { IFolder } from "src/app/interfaces/folder";


export const getAllFolders = createAction("[Folders] get all folder", props<{parentId:string}>());
export const getAllFolderSucess = createAction("[Folders] get all folders success", props<{folders: IFolder[]}>());
export const getAllFolderFailure = createAction("[Folders] get all folders failure", props<{error: any}>());


export const getAllFiles = createAction("[Files] get all files", props<{parentId: string}>());
export const getAllFilesSuccess = createAction("[Files] get all files success", props<{files: IFile[]}>());
export const getAllFilesFailure = createAction("[Files] get all files failure", props<{error:any}>());


