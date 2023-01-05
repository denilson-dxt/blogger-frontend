import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { CommentService } from "src/app/services/comment.service";
import { PostService } from "src/app/services/post.service";
import { addComemntFailure, addComment, addCommentSuccess, createPost, createPostFailure, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess, getPostsByCategory, getPostsByCategoryFailure, getPostsByCategorySuccess, getPostsByTag, getPostsByTagFailure, getPostsByTagSuccess, updatePost, updatePostFailure, updatePostSuccess } from "../actions/post.actions";

@Injectable()
export class PostEffect {
    constructor(private postService: PostService, private commentService: CommentService, private actions$: Actions) { }

    createPost$ = createEffect(() => this.actions$.pipe(
        ofType(createPost),
        exhaustMap(actions => {
            return this.postService.createPost(actions.post).pipe(
                map(post => createPostSuccess({ post: post })),
                catchError((error) => of(createPostFailure({ error: error })))
            )
        })
    ))

    updatePost = createEffect(() => {
        return this.actions$.pipe(
            ofType(updatePost),
            exhaustMap(actions => this.postService.updatePost(actions.post).pipe(
                map(post => updatePostSuccess({ post: post })),
                catchError(error => of(updatePostFailure({ error: error })))
            ))
        )
    })

    getAllPosts$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllPosts),
            exhaustMap(actions => {
                return this.postService.getPosts().pipe(
                    map(response => {
                        let paginationInfo = JSON.parse(response.headers.get('x-pagination'));

                        return getAllPostsSuccess({
                            posts: response.body,
                            paginationInfo:  paginationInfo
                        })
                    }),
                    catchError(error => of(getAllPostFailure({ error: error })))
                )
            })
        )
    })
    getAllPostsByCategory$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getPostsByCategory),
            exhaustMap(actions => {
                return this.postService.getPostsByCategory(actions.categorySlug).pipe(
                    map(posts => getPostsByCategorySuccess({ posts: posts })),
                    catchError(error => of(getPostsByCategoryFailure({ error: error })))
                )
            })
        )
    })

    getPostsByTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getPostsByTag),
            exhaustMap(actions => {
                return this.postService.getPostsByTag(actions.tagDescription).pipe(
                    map(posts => getPostsByTagSuccess({ posts: posts })),
                    catchError(error => of(getPostsByTagFailure({ error: error })))
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

    addComment$ = createEffect(() => this.actions$.pipe(
        ofType(addComment),
        exhaustMap(actions => {
            return this.commentService.postComment({ postId: actions.postId, content: actions.content }).pipe(
                map(comment => addCommentSuccess({ postId: actions.postId, comment: comment })),
                catchError(error => of(addComemntFailure({ error: error })))
            )
        })
    ))
}