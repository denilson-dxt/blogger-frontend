import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { PostService } from "src/app/services/post.service";
import { createPost, createPostFailure, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess } from "../actions/post.actions";

@Injectable()
export class PostEffect {
    constructor(private postService: PostService, private actions$: Actions) { }

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        exhaustMap(actions => {
            return this.postService.createPost(actions.post).pipe(
                map(post => createPostSuccess({ post: post })),
                catchError((error) => of(createPostFailure({ error: error })))
            )
        })
    ))

    getAllPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllPosts),
            exhaustMap(actions => {
                return this.postService.getPosts().pipe(
                    map(posts => getAllPostsSuccess({ posts: posts })),
                    catchError(error => of(getAllPostFailure({ error: error })))
                )
            })
        )
    })

    deletePost$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deletePost),
            exhaustMap(actions => this.postService.deletePost(actions.postId).pipe(
                map(status => deletePostSuccess({ postId: actions.postId })),
                catchError(error => of(deletePostFailure({ error: error })))
            ))
        )
    })
}