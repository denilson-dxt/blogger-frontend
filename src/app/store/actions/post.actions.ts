import { createAction, props } from "@ngrx/store";
import { IPost } from "src/app/interfaces/post";

export const createPost = createAction("[POST] create post", props<{post:any}>());
export const createPostSuccess = createAction("[POST] create post success", props<{post:IPost}>())
export const createPostFailure = createAction("[POST] create post failure", props<{error:any}>())