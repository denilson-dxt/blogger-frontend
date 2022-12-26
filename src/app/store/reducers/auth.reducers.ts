import { createReducer, on } from "@ngrx/store";
import { IUser } from "src/app/interfaces/user";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/auth.actions";

export interface IAuthState{
    isAuthenticated:boolean;
    user?:IUser;
    loginErrors?:string;
    signupErrors?:string[];
}

const initialState:IAuthState = {
    isAuthenticated:false,
    user: undefined,
    loginErrors: undefined,
    signupErrors: []
}

export const authReducer = createReducer(
    initialState,

    on(LOGIN, (state) => {
        return {...state, isAuthenticated: false, loginErrors: undefined, signupErrors: []}
    }),
    on(LOGIN_SUCCESS, (state, {token}) => {
        return {...state, isAuthenticated: true, loginErrors: undefined, signupErrors: []}
    }),
    on(LOGIN_FAILURE, (state, {error}) => {
        return {...state, loginErrors: "Invalid credentials", signupErrors: []}
    }),

    on(LOGOUT, (state) => {
        return {...initialState}
    })
)