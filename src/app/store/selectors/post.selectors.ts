import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IPostState } from "../reducers/post.reducers";

export const postSelector = createFeatureSelector<IPostState>("posts");
export const selectAllPosts = createSelector(postSelector, state => state.posts);
export const selectActualPost = createSelector(postSelector, state => state.actualPost);
export const selectTotalPosts = createSelector(postSelector, state => state.totalPosts);
export const selectActualPage = createSelector(postSelector, state => state.actualPage);
export const selectMaxPostsPerPage = createSelector(postSelector, state => state.maxPostsPerPage);