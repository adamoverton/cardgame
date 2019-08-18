import { StatusEffect } from "src/models/Effect";

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

export const kHeroId = "hero";