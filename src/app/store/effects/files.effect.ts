import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, map, of } from "rxjs";
import { FilesService } from "src/app/services/files/files.service";
import { getAllFiles, getAllFilesFailure, getAllFilesSuccess, getAllFolderFailure, getAllFolders, getAllFolderSucess } from "../actions/files.actions";

@Injectable()
export class FilesEffect{
    constructor(private filesService:FilesService, private actions$:Actions){}

    getAllFolders$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllFolders),
            exhaustMap(actions => this.filesService.getFoldersByParent(actions.parentId).pipe(
                map(folders => getAllFolderSucess({folders: folders})),
                catchError(error => of(getAllFolderFailure({error: error})))
            ))
        )
    })

    getAllFiles$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getAllFiles),
            exhaustMap(actions => this.filesService.getFilesByParent(actions.parentId).pipe(
                map(files => getAllFilesSuccess({files: files})),
                catchError(error => of(getAllFilesFailure({error: error})))
            ))
        )
    })
}