import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustAll, exhaustMap, map, of, tap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { LOGIN, LOGIN_FAILURE, LOGIN_SUCCESS, LOGOUT } from "../actions/auth.actions";

@Injectable()
export class AuthEffect{
    constructor(private authService:AuthService, private router:Router, private actions$:Actions){}

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
                this.router.navigateByUrl("/")
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
}