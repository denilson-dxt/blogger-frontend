import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { PostService } from "src/app/services/post.service";
import { createPost, createPostFailure, createPostSuccess } from "../actions/post.actions";

@Injectable()
export class PostEffect{
    constructor(private postService:PostService, private actions$:Actions){}

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        exhaustMap(actions => {
            return this.postService.createPost(actions.post).pipe(
                map(post => createPostSuccess({post: post})),
                catchError((error) => of(createPostFailure({error: error})))
            )
        })
    ))
}