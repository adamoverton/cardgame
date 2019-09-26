import { EffectName } from "src/models/Effect";
import { TargetType } from "src/models/Effect";

/**
 * A cast is a way to apply an Effect. The Iron Wave card would have two casts:
 * 1. Add 5 block to <self>
 * 2. Apply 5 damage to <target>
 */
export interface Cast {
    effect: EffectName;
    target: TargetType;
    magnitude: number;
    castCount?: number;
}

/**
 * Note: If you want to have 4 block next turn, you apply a status effect that
 * casts another status effect when the right time arrives
 */
export enum CardType {
    Attack,
    Skill,
    Power
}

/**
 * A card is a list of casts, that might result in status effects.
 * Attack StatusEffect: Health, magnitude: -6
 * Block StatusEffect: Block, magnitude: 5
 * Repair StatusEffect: Repair, magnitude: 7
 * Ultimately we should read these in from a json file at run time
 */
export interface Card {
    id: number;
    title: string;
    type: CardType;
    description: string;
    castList: Cast[];
    energyCost: number;
    targeted: boolean;
}

