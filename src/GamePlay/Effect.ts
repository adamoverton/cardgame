import  * as Actions from 'src/actions/GameActions';
import { AttackStep, StrengthDecorator, VulnerableDecorator } from 'src/Thunks/Turn';
import { Entity, kHeroId, ThunkType } from 'src/types/StoreState';

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
    Vulnerable = "Vulnerable", // Increases the damage taken by a percentage
    Frail = "Frail", // Reduces the amount of block you apply by a percentage
    Strength = "Strength", // Increases the amount of damage given by a flat amount
    Weak = "Weak", // Reduces the amount of damage given by a percentage
}

export interface Effect {
    title: string;
    description: string;
    // image: string; // the image to show below the character
}

export interface EffectDecorationProp extends Effect {
    applySourceAttackDecorator?: (cast: AttackStep, statusEffect: StatusEffect) => AttackStep;
    applyTargetAttackDecorator?: (cast: AttackStep, statusEffect: StatusEffect) => AttackStep;
    onStartTurnUpkeep?: (entity: Entity, statusEffect: StatusEffect) => ThunkType;
    autoDecrementAfterUpkeep?: boolean;
}

export class EffectDecoration implements Effect {
    title = "";
    description = "";
    autoDecrementAfterUpkeep = false;
    onStartTurnUpkeepProvided: (entity: Entity, statusEffect: StatusEffect) => ThunkType;

    constructor(props: EffectDecorationProp) {
        this.title = props.title || this.title;
        this.description = props.description || this.description;
        this.applySourceAttackDecorator = props.applySourceAttackDecorator || this.applySourceAttackDecorator;
        this.applyTargetAttackDecorator = props.applyTargetAttackDecorator || this.applyTargetAttackDecorator;
        this.onStartTurnUpkeepProvided = props.onStartTurnUpkeep || this.onUpkeepBlank;
        this.autoDecrementAfterUpkeep = props.autoDecrementAfterUpkeep || this.autoDecrementAfterUpkeep;
    }


    applySourceAttackDecorator = (cast: AttackStep, statusEffect: StatusEffect): AttackStep => {
        return cast;
    }

    applyTargetAttackDecorator = (cast: AttackStep, statusEffect: StatusEffect): AttackStep => {
        return cast;
    }

    onStartTurnUpkeep(entity: Entity, statusEffect: StatusEffect): ThunkType {
        return (dispatch, getState, extraArgument) => {
            this.onStartTurnUpkeepProvided(entity, statusEffect)(dispatch, getState, extraArgument);
            if (this.autoDecrementAfterUpkeep) {
                dispatch(Actions.ApplyEffect.create({
                    effectName: statusEffect.name,
                    targetId: entity.id,
                    magnitude: -1,
                }));
            }
        };
    }

    onUpkeepBlank(entity: Entity, statusEffect: StatusEffect): ThunkType {
        return (dispatch, getState, extraArgument) => {
        };
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
        onStartTurnUpkeep: (entity: Entity, statusEffect: StatusEffect): ThunkType => {
            return (dispatch, getState, extraArgument) => {
                dispatch(Actions.AdjustEnergy.create({
                        energy: statusEffect.magnitude,
                }));
            }
        }
    })],
    [EffectName.Block, new EffectDecoration({
        title: 'Block',
        description: 'Reduce incoming damage by this amount',
        onStartTurnUpkeep: (entity: Entity, statusEffect: StatusEffect): ThunkType => {
            return (dispatch, getState, extraArgument) => {
                dispatch(Actions.ClearEffect.create({
                    effectName: EffectName.Block,
                    targetId: kHeroId,
                }));
            }
        }
    })],
    [EffectName.Vulnerable, new EffectDecoration({
        title: 'Vulnerable',
        description: 'Vulnerable entity takes 50% more attack damage for __ turns',
        applyTargetAttackDecorator: (cast: AttackStep, statusEffect: StatusEffect): AttackStep  => new VulnerableDecorator(cast),
        autoDecrementAfterUpkeep: true,
    })],
    [EffectName.Strength, new EffectDecoration({
        title: 'Strength',
        description: 'Gain 2 strength',
        applySourceAttackDecorator: (cast: AttackStep, statusEffect: StatusEffect): AttackStep  => new StrengthDecorator(cast, statusEffect.magnitude),
    })],
    [EffectName.Frail, new EffectDecoration({
        title: 'Frail',
        description: 'Reduces the amount of block points gained by 25%',
        autoDecrementAfterUpkeep: true,
    })],
    [EffectName.Weak, new EffectDecoration({
        title: 'Weak',
        description: 'Reduces the amount of damage given by a 25%',
        autoDecrementAfterUpkeep: true,
    })],
]);

// A status effect is the ongoing amount a thing has
// I might have 5 block, perhaps because of Iron Wave
// Or maybe I have 3 because fuck frail
export interface StatusEffect {
    name: EffectName;
    magnitude: number; 
}
