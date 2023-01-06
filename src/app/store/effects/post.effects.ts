import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { catchError, exhaustMap, map, of, switchMap, take, tap } from "rxjs";
import { CommentService } from "src/app/services/comment.service";
import { PostService } from "src/app/services/post.service";
import { addComemntFailure, addComment, addCommentSuccess, changePagination, changePaginationSuccess, createPost, createPostFailure, createPostSuccess, deletePost, deletePostFailure, deletePostSuccess, getAllPostFailure, getAllPosts, getAllPostsSuccess, getPostsByCategory, getPostsByCategoryFailure, getPostsByCategorySuccess, getPostsByTag, getPostsByTagFailure, getPostsByTagSuccess, updatePost, updatePostFailure, updatePostSuccess } from "../actions/post.actions";
import { IAppState } from "../reducers";
import {selectPostsPagination } from "../selectors/post.selectors";

@Injectable()
export class PostEffect {
    constructor(private store:Store<IAppState>,private postService: PostService, private commentService: CommentService, private actions$: Actions) { }

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
        
          switchMap(actions => {
            return this.store.select(selectPostsPagination).pipe(
              take(1),
              switchMap(pagination => {
                return this.postService.getPosts(pagination.actualPage, pagination.maxPostsPerPage).pipe(
                  map(response => {
                    let paginationInfo = JSON.parse(response.headers.get('x-pagination'));
                    return getAllPostsSuccess({
                      posts: response.body,
                      paginationInfo: paginationInfo,
                    });
                  }),
                  catchError(error => of(getAllPostFailure({ error: error })))
                );
              })
            );
          })
        );
      });
    
    changePagination$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(changePagination),
            exhaustMap(() => of(changePaginationSuccess()))
        )
    })

    changePaginationSucess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(changePaginationSuccess),
            tap(actions => {
                return this.store.dispatch(getAllPosts())
            })
        )
    }, {dispatch: false})

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