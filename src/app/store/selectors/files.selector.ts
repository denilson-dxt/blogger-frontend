import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IFilesState } from "../reducers/files.reducer";

export const filesSelector = createFeatureSelector<IFilesState>("files");

export const selectAllFiles = createSelector(filesSelector, state => state.files);
export const seelectAllFolders = createSelector(filesSelector, state => state.folders);
