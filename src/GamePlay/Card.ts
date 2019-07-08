import { EffectName, TargetType } from 'src/GamePlay/Effect';

// A cast is a way to apply an Effect. The Iron Wave card would have two casts: 
// 1. Add 5 block to <self>
// 2. Apply 5 damage to <target>
export interface Cast {
    effect: EffectName;
    target: TargetType;
    magnitude: number;
}

//
// Note: If you want to have 4 block next turn, you apply a status effect that 
// casts another status effect when the right time arrives
//

export enum CardType {
    Attack,
    Skill,
    Power
}

//
// A card is a list of casts, that might result in status effects.
// Attack StatusEffect: Health, magnitude: -6
// Block StatusEffect: Block, magnitude: 5
// Repair StatusEffect: Repair, magnitude: 7
//
// Ultimately we should read these in from a json file at run time
//
export interface Card {
    id: number;
    title: string;
    type: CardType;
    description: string;
    castList: Cast[];
    energyCost: number;
}

export enum CardName {
    Strike = "Strike",
    Defend = "Defend",
    Inflame = "Inflame",
    Uppercut = "Uppercut",
}

/**
 * A list of card definitions
 */
export const CardDefinitions = new Map<CardName, Card>([
    [CardName.Strike, {
        id: 0,
        title: "Strike",
        type: CardType.Attack,
        description: "I attack you",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targetted,
            magnitude: 6,
        }],
        energyCost: 1,
    }],
    [CardName.Defend, {
        id: 0,
        title: "Defend",
        type: CardType.Skill,
        description: "I block me",
        castList: [{
            effect: EffectName.Block,
            target: TargetType.Self,
            magnitude: 5,
        }],
        energyCost: 1,
    }],
    [CardName.Inflame, {
        id: 0,
        title: "Inflame",
        type: CardType.Skill,
        description: "Gain strength",
        castList: [{
            effect: EffectName.Strength,
            target: TargetType.Self,
            magnitude: 2,
        }],
        energyCost: 1,
    }],
    [CardName.Uppercut, {
        id: 0,
        title: "Uppercut",
        type: CardType.Skill,
        description: "Deals damage and applies weak to the target",
        castList: [{
            effect: EffectName.Weak,
            target: TargetType.Targetted,
            magnitude: 1,
        }],
        energyCost: 1,
    }],
]);
