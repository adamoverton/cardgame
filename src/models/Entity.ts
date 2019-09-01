import { StatusEffect } from "src/models/Effect";
import { DeckStore } from 'src/redux/DeckTypes';

export interface Entity {
    id: string;
    hp: number;
    maxHp: number;
    effectList: StatusEffect[];
    energy: number;
    maxEnergy: number;
    deck: DeckStore;
}

export const kHeroId: string = "hero";