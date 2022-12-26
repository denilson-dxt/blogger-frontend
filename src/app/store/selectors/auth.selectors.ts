import { createFeatureSelector, createSelector } from "@ngrx/store";
import { IAuthState } from "../reducers/auth.reducers";

const authSelector = createFeatureSelector<IAuthState>("auth");

export const SELECT_IS_AUTHENTICATED = createSelector(authSelector, state => state.isAuthenticated);
export const SELELCT_USER = createSelector(authSelector, state => state.user);
export const SELECT_LOGIN_ERRORS = createSelector(authSelector, state => state.loginErrors);
export const SELECT_SIGNUP_ERRORS = createSelector(authSelector, state => state.signupErrors);

