import { createReducer, on } from "@ngrx/store";
import { IRegisterError } from "src/app/interfaces/register-error";
import { IUser } from "src/app/interfaces/user";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SIGN_UP_FAILURE, SIGN_UP_SUCCESS, SIGN_UP } from "../actions/auth.actions";

export interface IAuthState{
    isAuthenticated:boolean;
    user?:IUser;
    loginErrors?:string;
    signupErrors?:IRegisterError;
}

const initialState:IAuthState = {
    isAuthenticated:false,
    user: undefined,
    loginErrors: undefined,
    signupErrors: undefined
}

export const authReducer = createReducer(
    initialState,

    on(LOGIN, (state) => {
        return {...state, isAuthenticated: false, loginErrors: undefined, signupErrors: undefined}
    }),
    on(LOGIN_SUCCESS, (state, {token}) => {
        return {...state, isAuthenticated: true, loginErrors: undefined, signupErrors: undefined}
    }),
    on(LOGIN_FAILURE, (state, {error}) => {
        return {...state, loginErrors: "Invalid credentials", signupErrors: undefined}
    }),

    on(LOGOUT, (state) => {
        return {...initialState}
    }),

    on(SIGN_UP, (state) => {
        return {...state, signupErrors: undefined}
    }),
    on(SIGN_UP_SUCCESS, (state) => {
        return {...state, signupErrors: undefined}
    }),
    on(SIGN_UP_FAILURE, (state, errors) => {
        let error:IRegisterError = {};
        console.log("ERROR", errors);
        errors.error.error.forEach((err:{Code:string, Description:string}) => {
            if(err.Code.toLowerCase().includes("email")){
                error.email = err.Description;
            }else if(err.Code.toLowerCase().includes("password")){
                error.password = err.Description;
            }else if(err.Code.toLowerCase().includes("username")){
                error.userName = err.Description;
            }else if(err.Code.toLowerCase().includes("profilepicture")){
                error.profilePicture = err.Description
            }

        })
        return {...state, signupErrors: {...error}}
    })
)