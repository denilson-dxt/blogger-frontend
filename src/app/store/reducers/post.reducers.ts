import { createReducer, on } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";
import { createPost, createPostFailure, createPostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess } from "../actions/post.actions";

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
    }),

    on(getAllPosts, (state) => {
        return {...state}
    }),
    on(getAllPostsSuccess, (state, {posts}) => {
        return {...state, posts: posts}
    }),
    on(getAllPostFailure, (state, {error})=>{
        return {...state}
    })
)