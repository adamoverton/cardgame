import { kHeroId, Entity } from "src/models/Entity";
import { defaultHeroDeckStore, defaultEnemyDeckStore } from 'src/redux/DeckTypes';

export interface EntityStore {
    entityList: { [key: string]: Entity};
    enemyIdIncrementer: number;
}

export const defaultEntityStore: EntityStore = {
    entityList: {
        "hero": {
            id: kHeroId,
            hp: 80,
            maxHp: 80,
            energy: 3,
            maxEnergy: 3,
            effectList: [
            ],
            deck: defaultHeroDeckStore,
            x: 0,
            y: 0,
        },
        "Jaw Worm": {
            id: "Jaw Worm",
            hp: 44,
            maxHp: 44,
            energy: 1,
            maxEnergy: 1,
            effectList: [
            ],
            deck: defaultEnemyDeckStore,
            x: 7,
            y: 3,
        },
        "Jaw Worm 2": {
            id: "Jaw Worm 2",
            hp: 44,
            maxHp: 44,
            energy: 1,
            maxEnergy: 1,
            effectList: [
            ],
            deck: defaultEnemyDeckStore,
            x: 7,
            y: 6,
        },
    },
    enemyIdIncrementer: 4,
};