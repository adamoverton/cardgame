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
        },
    },
    enemyIdIncrementer: 4,
};