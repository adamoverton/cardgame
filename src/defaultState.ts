import { StoreState, kHeroId } from "./types/StoreState";
import { EffectName } from "./GamePlay/Effect";
import { CardDefinitions, CardName } from "./GamePlay/Card";

export const defaultState: StoreState = {
    hero: {
        id: kHeroId,
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
        drawPile: [
            {...CardDefinitions.get(CardName.Defend)!, id: 0},
            {...CardDefinitions.get(CardName.Strike)!, id: 1},
            {...CardDefinitions.get(CardName.Strike)!, id: 2},
            {...CardDefinitions.get(CardName.Defend)!, id: 3},
            {...CardDefinitions.get(CardName.Defend)!, id: 4},
            {...CardDefinitions.get(CardName.Strike)!, id: 5},
            {...CardDefinitions.get(CardName.Strike)!, id: 6},
        ],
        hand: [
            {...CardDefinitions.get(CardName.Strike)!, id: 7},
            {...CardDefinitions.get(CardName.Defend)!, id: 8},
            {...CardDefinitions.get(CardName.Inflame)!, id: 9},
            {...CardDefinitions.get(CardName.Uppercut)!, id: 10},
            {...CardDefinitions.get(CardName.Defend)!, id: 11},
        ],
        discardPile: [],
        cardIdIncrementer: 500,
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