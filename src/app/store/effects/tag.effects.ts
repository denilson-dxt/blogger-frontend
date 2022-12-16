import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { TagService } from "src/app/services/tag.service";
import { createTag, createTagFailure, createTagSuccess, deleteTag, deleteTagFailure, deleteTagSuccess, getAllTags, getAllTagsFailure, getAllTagsSuccess, updateTag, updateTagFailure, updateTagSuccess } from "../actions/tag.actions";

@Injectable()
export class TagEffect {

    constructor(private tagService: TagService, private actions$: Actions) { }

    loadTags$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTags),
        exhaustMap(actions => {
            return this.tagService.getAllTags().pipe(
                map(tags => getAllTagsSuccess({ tags: tags })),
                catchError(error => of(getAllTagsFailure({ error: error })))
            )
        })
    ))

    createTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(createTag),
            exhaustMap(actions => this.tagService.createTag(actions.tag).pipe(
                map(tag => createTagSuccess({ tag: tag })),
                catchError(error => of(createTagFailure({ error: error })))
            ))
        )
    })
    updateTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(updateTag),
            exhaustMap(actions => this.tagService.updateTag(actions.tag).pipe(
                map(t => updateTagSuccess({ tag: t })),
                catchError(error => of(updateTagFailure({ error: error })))
            ))
        )
    })

    deleteTag$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(deleteTag),
            exhaustMap(actions => this.tagService.deleteTag(actions.tagId).pipe(
                map(status => deleteTagSuccess({ tagId: actions.tagId })),
                catchError(error => of(deleteTagFailure({ error: error })))
            ))
        )
    })
}