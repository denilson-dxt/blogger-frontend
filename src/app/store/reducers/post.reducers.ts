import { createReducer, on } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";
import { addComemntFailure, addComment, addCommentSuccess, createPost, createPostFailure, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess, getPostBySlug, getPostBySlugSuccess, getPostsByCategory, getPostsByCategoryFailure, getPostsByCategorySuccess, getPostsByTag, getPostsByTagFailure, getPostsByTagSuccess, setActualPost, setActualPostFailure, updatePost, updatePostFailure, updatePostSuccess } from "../actions/post.actions";

export interface IPostState{
    posts:IPost[];
    actualPost?:IPost;
    actualPage: number;
    maxPostsPerPage:number;
    totalPosts: number;
}

const initialState:IPostState = {
    posts:[],
    actualPage: 1,
    maxPostsPerPage: 5,
    totalPosts: 0
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
    
    
    on(setActualPost, (state, {post}) => {
        return {...state, actualPost: post}
    }),

    on(updatePost, (state) => {
        return {...state}
    }),
    on(updatePostSuccess, (state, {post}) => {
        return {...state, posts: [...state.posts, post]}
    }),
    on(updatePostFailure, (state, {error}) => {
        return {...state}
    }),

    on(getAllPosts, (state) => {
        return {...state}
    }),
    on(getAllPostsSuccess, (state, {posts, paginationInfo}) => {
        return {...state, posts: posts, actualPage: paginationInfo.ActualPage, totalPosts: paginationInfo.TotalPosts, maxPostsPerPage: paginationInfo.MaxPostsPerPage}
    }),
    on(getAllPostFailure, (state, {error})=>{
        return {...state}
    }),
    on(getPostsByCategory, (state) => {
        return {...state}
    }),
    on(getPostsByCategorySuccess, (state, {posts}) => {
        return {...state, posts: posts}
    }),
    on(getPostsByCategoryFailure, (state, {error})=>{
        return {...state}
    }),

    on(getPostsByTag, (state) => {
        return {...state}
    }),
    on(getPostsByTagSuccess, (state, {posts}) => {
        return {...state, posts: [...posts]}
    }),
    on(getPostsByTagFailure, (state, {error}) => {
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
    }),


    on(addComment, (state) => {
        return {...state}
    }),
    on(addCommentSuccess, (state, {postId, comment}) => {
        let actualPostTmp:IPost = {...state.actualPost!};
        actualPostTmp.comments = [...actualPostTmp.comments, comment];
        
        return {...state, actualPost: {...actualPostTmp}}
    }),
    on(addComemntFailure, (state) => {
        return {...state}
    })
)