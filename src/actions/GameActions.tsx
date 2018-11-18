import { createActions } from 'redux-actions';

const ADJUST_HP = 'ADJUST_HP';

export interface AdjustHpPayload {
    hp: number;
}

export type GamePayload = AdjustHpPayload;

export const {
    adjustHp,
} = createActions<GamePayload>(
    ADJUST_HP,
);