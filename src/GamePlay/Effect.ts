import { VulnerableDecorator, AttackStep, StrengthDecorator } from 'src/Thunks/Turn';
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

// Effects are statuses that are applied AND might reside to do something under certain circumstances
export enum EffectName {
    Attack = "Attack", // Applies immediately, does not reside
    BerserkEnergy = "BerserkEnergy", // Applies a buff that adds energy at the start of turn
    Block = "Block", // Applies a buff that reduces incoming damage
    Vulnerable = "Vulnerable",
    Frail = "Frail",
    Strength = "Strength",
}

export interface Effect {
    title: string;
    description: string;
    // image: string; // the image to show below the character
}

export interface EffectDecorationProp extends Effect {
    applyAttackDecorator?: (cast: AttackStep) => AttackStep
}

export class EffectDecoration implements Effect {
    title = "";
    description = "";

    constructor(props: EffectDecorationProp) {
        this.title = this.title || props.title;
        this.description = this.description || props.description;
        this.applyAttackDecorator = props.applyAttackDecorator || this.applyAttackDecorator;
    }

    applyAttackDecorator = (cast: AttackStep): AttackStep  => {
        return cast;
    }
}

//
// So, this map has some weird syntax. I went with it over a standard object so that I could ensure that each of the
// keys existed in the EffectName array. Otherwise when we ask for a buff from the buff dictionary, any key that is a
// string would compile.
// 
// We should list a class associated with each effect that knows how to process it
//
export const EffectDefinitions = new Map<EffectName, EffectDecoration> ([
    [EffectName.Attack, new EffectDecoration({
        title: 'Attack',
        description: 'Deal damage',
    })],
    [EffectName.BerserkEnergy, new EffectDecoration({
        title: 'Berserk Energy',
        description: 'Energy at start of turn',
    })],
    [EffectName.Block, new EffectDecoration({
        title: 'Block',
        description: 'Reduce incoming damage by this amount',
    })],
    [EffectName.Vulnerable, new EffectDecoration({
        title: 'Vulnerable',
        description: 'Vulnerable entity takes 50% more attack damage for __ turns',
        applyAttackDecorator: (cast: AttackStep): AttackStep  => new VulnerableDecorator(cast),
    })],
    [EffectName.Strength, new EffectDecoration({
        title: 'Strength',
        description: 'Gain 2 strength',
        applyAttackDecorator: (cast: AttackStep): AttackStep  => new StrengthDecorator(cast, 2),
    })],
    [EffectName.Frail, new EffectDecoration({
        title: 'Frail',
        description: 'Reduces the amount of block points gained by 25%',
    })],
]);

// A status effect is the ongoing amount a thing has
// I might have 5 block, perhaps because of Iron Wave
// Or maybe I have 3 because fuck frail
export interface StatusEffect {
    name: EffectName;
    magnitude: number; 
}
