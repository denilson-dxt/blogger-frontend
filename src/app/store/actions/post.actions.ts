import { createAction, props } from "@ngrx/store";
import { IComment } from "src/app/interfaces/comment";
import { IPost } from "src/app/interfaces/post";

export const createPost = createAction("[POST] create post", props<{post:any}>());
export const createPostSuccess = createAction("[POST] create post success", props<{post:IPost}>())
export const createPostFailure = createAction("[POST] create post failure", props<{error:any}>())


export const setActualPost = createAction("[POST] set actual post", props<{post:IPost}>());
export const setActualPostSuccess = createAction("[POST] set actual post success", props<{post:IPost}>());
export const setActualPostFailure = createAction("[POST] set actual post failure", props<{error:any}>());

export const getAllPosts = createAction("[Post] get all posts");
export const getAllPostsSuccess = createAction("[Post] get all posts success", props<{posts: IPost[]}>());
export const getAllPostFailure = createAction("[Post] get all posts failure", props<{error: any}>());

export const getPostBySlug = createAction("[Post] get post by slug", props<{slug:string}>());
export const getPostBySlugSuccess = createAction("[Post] get post by slug success", props<{post: IPost}>());
export const getPostBySlugFailure = createAction("[Post] get post by slug failure", props<{error: any}>());

export const updatePost = createAction("[Post] update post", props<{post:IPost}>())
export const updatePostSuccess = createAction("[Post] update post success", props<{post: IPost}>())
export const updatePostFailure = createAction("[Post] update post failure", props<{error: any}>());

export const deletePost = createAction("[Post] delete post", props<{postId: string}>());
export const deletePostSuccess = createAction("[Post] delete post success", props<{postId:string}>());
export const deletePostFailure = createAction("[Post] delete  post failure", props<{error: any}>());


export const addComment = createAction("[Post] add comment", props<{postId:string, content:string}>());
export const addCommentSuccess = createAction("[Post] add comment success", props<{postId:string, comment:IComment}>());
export const addComemntFailure = createAction("[Post] add comment failure", props<{error:any}>());