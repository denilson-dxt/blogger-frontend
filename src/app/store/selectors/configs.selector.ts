import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IConfigState } from "../reducers/configs.reducers";

const configsSelector = createFeatureSelector<IConfigState>("configs");
export const selectToggleSideBar = createSelector(configsSelector, state => state.openSideBar);