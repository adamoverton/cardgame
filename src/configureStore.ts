import { CardDefinitions, CardName } from './GamePlay/Card';
import { createStore, applyMiddleware } from 'redux';
import { createReducer } from 'src/reducers/GameReducer';
import { StoreState } from 'src/types/StoreState';
import thunk from 'redux-thunk';
import { EffectName } from 'src/GamePlay/Effect';

export const defaultState: StoreState = {
    hero: {
        id: 'hero',
        hp: 10,
        maxHp: 50,
        energy: 3,
        maxEnergy: 3,
        effectList: [
            {
                name: EffectName.BerserkEnergy,
                magnitude: 3,
            },
            {
                name: EffectName.Vulnerable,
                magnitude: 2,
            },
        ],
    },
    heroDeck: [],
    battleCards: {
        drawPile: [CardDefinitions.get(CardName.Defend)!],
        hand: [
            CardDefinitions.get(CardName.Strike)!,
            CardDefinitions.get(CardName.Defend)!,
            CardDefinitions.get(CardName.Inflame)!,
        ],
        discardPile: [],
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
        createReducer(),
        initialState,
        applyMiddleware(thunk)
    );
};