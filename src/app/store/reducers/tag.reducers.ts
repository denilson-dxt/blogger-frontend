import { createReducer, on } from "@ngrx/store";
import { ITag } from "src/app/interfaces/tag";
import { createTag, createTagFailure, createTagSuccess, deleteTag, deleteTagFailure, deleteTagSuccess, getAllTags, getAllTagsFailure, getAllTagsSuccess, updateTag, updateTagFailure, updateTagSuccess } from "../actions/tag.actions";

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
    }),

    on(createTag, (state) => {
        return {...state}
    }),
    on(createTagSuccess, (state, {tag}) => {
        return {...state, tags: [...state.tags, tag]}
    }),
    on(createTagFailure, (state, {error})=>{
        return {...state}
    }),

    on(updateTag, (state)=>{
        return {...state}
    }),
    on(updateTagSuccess, (state, {tag})=>{
        let tagsTmp = state.tags.map(t => {
            if(t.id == tag.id) return tag;
            return t;
        })
        return {...state, tags: [...tagsTmp]}
    }),
    on(updateTagFailure, (state, {error}) => {
        return {...state}
    }),

    on(deleteTag, (state)=>{
        return {...state}
    }),
    on(deleteTagSuccess, (state, {tagId})=>{
        let tagsTmp:ITag[] = [...state.tags];
        let index = tagsTmp.findIndex(t => t.id == tagId);
        tagsTmp.splice(index, 1);
        return {...state, tags: [...tagsTmp]}
    }),
    on(deleteTagFailure, (state)=>{
        return {...state}
    })
)