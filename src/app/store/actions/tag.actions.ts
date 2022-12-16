import { createAction, props } from "@ngrx/store";
import { ITag } from "src/app/interfaces/tag";

export const getAllTags = createAction("[Tag] get all tags");
export const getAllTagsSuccess = createAction("[Tag] get all tags success", props<{tags: ITag[]}>());
export const getAllTagsFailure = createAction("[Tag] get all tags failure", props<{error: any}>());

export const createTag = createAction("[Tag] create tag", props<{tag: ITag}>())
export const createTagSuccess = createAction("[Tag] create tag success", props<{tag: ITag}>())
export const createTagFailure = createAction("[Tag] create tag faiure", props<{error: any}>())

export const updateTag = createAction("[Tag] update tag", props<{tag: ITag}>());
export const updateTagSuccess = createAction("[Tag] update tag success", props<{tag: ITag}>());
export const updateTagFailure = createAction("[Tag] update tag failure", props<{error: any}>());

export const deleteTag = createAction("[Tag] delete tag", props<{tagId: string}>());
export const deleteTagSuccess = createAction("[Tag] delete tag success", props<{tagId: string}>());
export const deleteTagFailure = createAction("[Tag] delete tag failure", props<{error: any}>());