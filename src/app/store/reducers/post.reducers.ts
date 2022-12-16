import { createReducer, on } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";
import { createPost, createPostFailure, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess } from "../actions/post.actions";

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
    }),
    

    on(deletePost, (state) => {
        return {...state}
    }),
    on(deletePostSuccess, (state, {postId}) => {
        let postsTmp:IPost[] = [...state.posts];
        let index = postsTmp.findIndex(p => p.id == postId);
        postsTmp.splice(index, 1);
        return {...state, posts: [...postsTmp]}
    }),
    on(deletePostFailure, (state, {error})=>{
        return {...state}
    })
)