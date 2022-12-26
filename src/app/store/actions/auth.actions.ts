import { createAction, props } from "@ngrx/store";
import { ILoginData } from "src/app/interfaces/login-data";

export const LOGIN = createAction("[AUTH] start login", props<ILoginData>());
export const LOGIN_SUCCESS = createAction("[AUTH] login success", props<{token:string}>());
export const LOGIN_FAILURE = createAction("[AUTH] login failure", props<{error:any}>());



export const LOGOUT = createAction("[Auth] logout");