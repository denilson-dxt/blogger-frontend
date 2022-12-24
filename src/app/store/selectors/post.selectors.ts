import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPostState } from "../reducers/post.reducers";

export const postSelector = createFeatureSelector<IPostState>("posts");
export const selectAllPosts = createSelector(postSelector, state => state.posts);
export const selectActualPost = createSelector(postSelector, state => state.actualPost);