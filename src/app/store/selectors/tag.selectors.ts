import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ITagState } from "../reducers/tag.reducers";

export const tagSelector = createFeatureSelector<ITagState>("tags");
export const selectAllTags = createSelector(tagSelector, state => state.tags);