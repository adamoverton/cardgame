import { StoreState } from "./types/StoreState";
import { EffectName } from "./GamePlay/Effect";
import { CardDefinitions, CardName } from "./GamePlay/Card";

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
            CardDefinitions.get(CardName.Uppercut)!,
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