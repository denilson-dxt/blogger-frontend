import { createReducer, on } from "@ngrx/store";
import { ITag } from "src/app/interfaces/tag";
import { getAllTags, getAllTagsFailure, getAllTagsSuccess } from "../actions/tag.actions";

export interface ITagState{
    tags:ITag[]
}
export const initialState:ITagState = {
    tags: []
}

export const tagReducer = createReducer(
    initialState,
    on(getAllTags, (state) => {
        return {...state}
    }),
    on(getAllTagsSuccess, (state, {tags})=>{
        return {...state, tags: tags}
    }),
    on(getAllTagsFailure, (state, {error}) => {
        return {...state}
    })
)