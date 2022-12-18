import { createAction, props } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";

export const createPost = createAction("[POST] create post", props<{post:any}>());
export const createPostSuccess = createAction("[POST] create post success", props<{post:IPost}>())
export const createPostFailure = createAction("[POST] create post failure", props<{error:any}>())

export const getAllPosts = createAction("[Post] get all posts");
export const getAllPostsSuccess = createAction("[Post] get all posts success", props<{posts: IPost[]}>());
export const getAllPostFailure = createAction("[Post] get all posts failure", props<{error: any}>());

export const updatePost = createAction("[Post] update post", props<{post:IPost}>())
export const updatePostSuccess = createAction("[Post] update post success", props<{post: IPost}>())
export const updatePostFailure = createAction("[Post] update post failure", props<{error: any}>());

export const deletePost = createAction("[Post] delete post", props<{postId: string}>());
export const deletePostSuccess = createAction("[Post] delete post success", props<{postId:string}>());
export const deletePostFailure = createAction("[Post] delete  post failure", props<{error: any}>());
