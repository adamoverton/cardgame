import { StatusEffect } from 'src/GamePlay/Effect';
import { Card } from 'src/GamePlay/Card';

export interface Entity {
    id: string;
    hp: number;
    maxHp: number;
    effectList: StatusEffect[];
}

export interface Hero extends Entity {
    // relicList: Relic[];
    energy: number;
    maxEnergy: number;
}

export interface Enemy extends Entity {
}

export interface BattleCards {
    drawPile: Card[];
    hand: Card[];
    discardPile: Card[];
    // exhaustPile: Card[];
}

export interface StoreState {
    hero: Hero;
    heroDeck: Card[];
    battleCards: BattleCards;
    enemyList: Enemy[];
    enemyIdIncrementer: number;
}

export const kHeroId = "hero";
