import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { createAction, Store } from "@ngrx/store";
import { catchError, exhaustAll, exhaustMap, map, mapTo, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { GET_ME, GET_ME_FAILURE, GET_ME_SUCCESS, LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT, SIGN_UP, SIGN_UP_FAILURE, SIGN_UP_SUCCESS } from "../actions/auth.actions";
import { IAppState } from "../reducers";

@Injectable()
export class AuthEffect{
    constructor(private authService:AuthService, private router:Router, private actions$:Actions, private store:Store<IAppState>){}

    login$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN),
            exhaustMap(actions => this.authService.login(actions).pipe(
                map(response => LOGIN_SUCCESS(response)),
                catchError(error => of(LOGIN_FAILURE(error)))
            ))
        )
    })

    loginSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGIN_SUCCESS),
            tap(actions => {
                localStorage.setItem("authToken", actions.token);
                this.router.navigateByUrl("/");
                this.store.dispatch(GET_ME())
            })
        )
    }, {dispatch: false})

    getMe$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GET_ME),
            exhaustMap(actions => this.authService.getMe().pipe(
                map(user => GET_ME_SUCCESS({user: user})),
                catchError(error => of(GET_ME_FAILURE({error:error})))
            ))
        )
    })

    getMeFailure$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(GET_ME_FAILURE),
            tap(actions => {
                localStorage.removeItem("authToken")
            })
        )
    }, {dispatch: false})

    logout$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(LOGOUT),
            tap(actions => {
                localStorage.removeItem("authToken");
                this.router.navigateByUrl("/auth/login")
                
            })
        )
    }, {dispatch: false})

    register$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SIGN_UP),
            exhaustMap(actions => this.authService.register(actions.payload).pipe(
                map(response => SIGN_UP_SUCCESS({user: response})),
                catchError(error => of(SIGN_UP_FAILURE({error: error})))
            ))
        )
    })

    registerSuccess$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(SIGN_UP_SUCCESS),
            tap(actions => {
                this.router.navigateByUrl("/auth/login");
            })
        )
    }, {dispatch: false})
}