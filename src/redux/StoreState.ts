import { BattlefieldStore } from './BattlefieldTypes';
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redoodle';
import { EntityStore } from "src/redux/EntityTypes";
import { TargetingStore } from "src/redux/TargetingTypes";

export interface StoreState {
    entity: EntityStore;
    targeting: TargetingStore;
    battlefield: BattlefieldStore;
}

export type ThunkType = ThunkAction<void, StoreState, void, Action>;
