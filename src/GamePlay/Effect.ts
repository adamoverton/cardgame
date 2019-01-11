export enum Timing {
    Never, // For resetTiming
    Immediate, 
    TurnStart, 
    TurnEnd,
}

export enum TargetType {
    Self,
    Targetted,
    RandomEnemy,
    AllEnemy,
}

export enum EffectName {
    BerserkEnergy = "BerserkEnergy",
    Block = "Block",
    Health = "Health",
    Vulnerable = "Vulnerable",
}

export interface Effect {
    title: string;
    description: string;
    // image: string; // the image to show below the character
}

//
// So, this map has some weird syntax. I went with it over a standard object so that I could ensure that each of the
// keys existed in the EffectName array. Otherwise when we ask for a buff from the buff dictionary, any key that is a
// string would compile.
// 
// We should list a class associated with each effect that knows how to process it
//
export const EffectDefinitions = new Map<EffectName, Effect>([
    [EffectName.BerserkEnergy, {
        title: 'Berserk Energy',
        description: 'Energy at start of turn',
    }],
    [EffectName.Block, {
        title: 'Block',
        description: 'Reduce incoming damage by this amount',
    }],
    [EffectName.Health, {
        title: 'HP',
        description: "Don't let this go below 1!",
    }],
    [EffectName.Vulnerable, {
        title: 'Vulnerable',
        description: 'Vulnerable increases attack damage by 50% for __ turns',
    }],
]);

// A status effect is the ongoing amount a thing has
// I might have 5 block, perhaps because of Iron Wave
// Or maybe I have 3 because fuck frail
export interface StatusEffect {
    name: EffectName;
    magnitude: number; 
}

//
// An effect is a default class that has an opportunity to apply its effect when certain events happen
// Block will override onDamageTaken to reduce the amount of the damage and its own value, and also
// override onTurnEnd to remove itself completely
//
export class UNUSED_Effect {
    onCombatStart: () => {}; 
    onCombatEnd: () => {};
    onTurnStart: () => {};
    onTurnEnd: () => {};
    // Planned damage can be modified, but by default is unchanged
    // onDamageOut (sourceId: string, damage: number): number { return damage; };
    // onDamageIn (dispatch, getState, targetId: string, damage: number): number { return damage; };
    // ? onCardPlayed: (card: Card) => {};
}

// Do we make these ThunkType?
export class BlockEffect extends UNUSED_Effect {
    // onDamageIn (dispatch, getState, targetId: string, damage: number): number {
    //     let block: number = getState.;

    //     return damage - block;
    // }
}
