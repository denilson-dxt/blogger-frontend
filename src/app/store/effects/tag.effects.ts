import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { TagService } from "src/app/services/tag.service";
import { getAllTags, getAllTagsFailure, getAllTagsSuccess } from "../actions/tag.actions";

@Injectable()
export class TagEffect{

    constructor(private tagService:TagService, private actions$:Actions){}

    loadTags$ = createEffect(() => this.actions$.pipe(
        ofType(getAllTags),
        exhaustMap(actions => {
            return this.tagService.getAllTags().pipe(
                map(tags => getAllTagsSuccess({tags: tags})),
                catchError(error => of(getAllTagsFailure({error: error})))
            )
        })
    ))
}