import { createReducer, on } from "@ngrx/store";
import { toggleFilesModal, toggleSideBar } from "../actions/configs.actions";

export interface IConfigState{
    openSideBar:boolean;
    isFilesModalOpen:boolean;
}

const initialState:IConfigState = {
    openSideBar: true,
    isFilesModalOpen: false
}

export const configsReducers = createReducer(
    initialState,
    on(toggleSideBar, (state) => {
        return {...state, openSideBar: !state.openSideBar}
    }),
    on(toggleFilesModal, (state)=>{
        return {...state, isFilesModalOpen: !state.isFilesModalOpen}
    })
)