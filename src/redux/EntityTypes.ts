import { Enemy, Hero, kHeroId } from "src/models/Entity";
import { EffectName } from "src/models/Effect";

export interface EntityStore {
    hero: Hero;
    enemyList: Enemy[];
    enemyIdIncrementer: number;
}

export const defaultEntityStore: EntityStore = {
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
            {
                name: EffectName.Weak,
                magnitude: 2,
            },
        ],
    },
    enemyList: [
        {
            id: 'enemy1',
            hp: 10,
            maxHp: 50,
            effectList: [
                {
                    name: EffectName.Vulnerable,
                    magnitude: 3,
                },
            ],
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