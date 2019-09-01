import { ThunkAction } from 'redux-thunk';
import { Action } from 'redoodle';
import { EntityStore } from "src/redux/EntityTypes";

export interface StoreState {
    entity: EntityStore;
}

export type ThunkType = ThunkAction<void, StoreState, void, Action>;
