import { createReducer, on } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";
import { createPost, createPostFailure, createPostSuccess } from "../actions/post.actions";

export interface IPostState{
    posts:IPost[]
}

const initialState:IPostState = {
    posts:[]
}

export const postReducer = createReducer(
    initialState,
    on(createPost, (state) => {
        return {...state}
    }),
    on(createPostSuccess, (state, {post}) => {
        return {...state, posts: [...state.posts, post]}
    }),
    on(createPostFailure, (state, {error}) => {
        return {...state}
    })
)