import { createAction, props } from "@ngrx/store";
import { ITag } from "src/app/interfaces/tag";

export const getAllTags = createAction("[Tag] get all tags");
export const getAllTagsSuccess = createAction("[Tag] get all tags success", props<{tags: ITag[]}>());
export const getAllTagsFailure = createAction("[Tag] get all tags failure", props<{error: any}>());