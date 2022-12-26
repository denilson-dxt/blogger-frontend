import { ActionReducerMap } from "@ngrx/store";
import { createFeatureReducerFactory } from "@ngrx/store/src/utils";
import { authReducer, IAuthState } from "./auth.reducers";
import { categoryReducer, ICategoryState } from "./category.reducer";
import { configsReducers, IConfigState } from "./configs.reducers";
import { filesReducer, IFilesState } from "./files.reducer";
import { IPostState, postReducer } from "./post.reducers";
import { ITagState, tagReducer } from "./tag.reducers";

export interface IAppState{
    categories:ICategoryState;
    tags:ITagState,
    posts: IPostState,
    configs: IConfigState,
    files: IFilesState,
    auth:IAuthState
};

export const reducers:ActionReducerMap<IAppState> = {
    categories:categoryReducer,
    tags:tagReducer,
    posts: postReducer,
    configs:configsReducers,
    files: filesReducer,
    auth:authReducer,
};