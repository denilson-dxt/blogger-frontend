import { createAction, props } from "@ngrx/store";
import { ILoginData } from "src/app/interfaces/login-data";
import { IRegisterData } from "src/app/interfaces/register-data";
import { IUser } from "src/app/interfaces/user";

export const LOGIN = createAction("[AUTH] start login", props<ILoginData>());
export const LOGIN_SUCCESS = createAction("[AUTH] login success", props<{token:string}>());
export const LOGIN_FAILURE = createAction("[AUTH] login failure", props<{error:any}>());

export const SIGN_UP = createAction("[AUTH] sign up", props<{payload: FormData}>());
export const SIGN_UP_SUCCESS = createAction("[AUTH] sign up success", props<{user: IUser}>());
export const SIGN_UP_FAILURE = createAction("[AUTH] sign up failure", props<{error:any}>());


export const GET_ME = createAction("[AUTH] get me");
export const GET_ME_SUCCESS = createAction("[AUTH] get me success", props<{user:IUser}>());
export const GET_ME_FAILURE = createAction("[AUTH] get me failure", props<{error:any}>());


export const LOGOUT = createAction("[Auth] logout");