import { ThunkAction } from 'redux-thunk';
import { Action } from 'redoodle';
import { DeckStore } from "src/redux/DeckTypes";
import { EntityStore } from "src/redux/EntityTypes";

export interface StoreState {
    deck: DeckStore;
    entity: EntityStore;
}

export type ThunkType = ThunkAction<void, StoreState, void, Action>;
