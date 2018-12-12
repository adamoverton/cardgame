import { StatusEffect } from 'src/GamePlay/Effect';

export interface Entity {
    id: string;
    hp: number;
    maxHp: number;
    effectList: StatusEffect[];
}

export interface Hero extends Entity {
    // relicList: Relic[];
}

export interface Enemy extends Entity {
}

export interface StoreState {
    hero: Hero,
    enemyList: Enemy[],
    enemyIdIncrementer: number,
}
