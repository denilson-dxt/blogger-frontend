import { createReducer, on } from "@ngrx/store";
import { toggleSideBar } from "../actions/configs.actions";

export interface IConfigState{
    openSideBar:boolean;
}

const initialState:IConfigState = {
    openSideBar: true
}

export const configsReducers = createReducer(
    initialState,
    on(toggleSideBar, (state) => {
        return {...state, openSideBar: !state.openSideBar}
    })
)