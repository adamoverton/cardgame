import { kHeroId, Entity } from "src/models/Entity";
import { EffectName } from "src/models/Effect";
import { defaultHeroDeckStore, defaultEnemyDeckStore } from 'src/redux/DeckTypes';

export interface EntityStore {
    entityList: { [key: string]: Entity};
    enemyIdIncrementer: number;
}

export const defaultEntityStore: EntityStore = {
    entityList: {
        "hero": {
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
                {
                    name: EffectName.Weak,
                    magnitude: 2,
                },
            ],
            deck: defaultHeroDeckStore,
        },
        "enemy1": {
            id: "enemy1",
            hp: 10,
            maxHp: 50,
            energy: 2,
            maxEnergy: 2,
            effectList: [
                {
                    name: EffectName.Vulnerable,
                    magnitude: 3,
                },
            ],
            deck: defaultEnemyDeckStore,
        },
        "enemy2":
        {
            id: "enemy2",
            hp: 20,
            maxHp: 100,
            energy: 2,
            maxEnergy: 2,
            effectList: [],
            deck: defaultEnemyDeckStore,
        }
    },
    enemyIdIncrementer: 4,
};