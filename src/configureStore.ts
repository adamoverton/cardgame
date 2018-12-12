import { createStore, applyMiddleware } from 'redux';
import {reducer} from 'src/reducers/GameReducer';
import { StoreState } from 'src/types/StoreState';
import thunk from 'redux-thunk';

export const defaultState: StoreState = {
    hero: {
        id: 'hero',
        hp: 10,
        maxHp: 50,
        effectList: [],
    },
    enemyList: [
        {
            id: 'enemy1',
            hp: 10,
            maxHp: 50,
            effectList: [],
        },
        {
            id: 'enemy2',
            hp: 20,
            maxHp: 100,
            effectList: [],
        }
    ],
    enemyIdIncrementer: 3,
};

export const configureStore = (initialState?: StoreState) => {
    initialState = initialState || defaultState;
    return createStore<StoreState, any, any, any>(
        reducer as any,
        initialState,
        applyMiddleware(thunk)
    );
};