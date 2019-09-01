import * as EntityActions from 'src/redux/EntityActions';
import { AttackStep, StrengthDecorator, VulnerableDecorator, WeakDecorator } from 'src/redux/MiscThunks';
import { ThunkType } from "src/redux/StoreState";
import { Entity } from "src/models/Entity";
import { Effect, EffectName, StatusEffect } from "src/models/Effect";

interface StatusEffectWithDefinition {
    statusEffect: StatusEffect;
    effectDefinition: EffectImpl;
}

export const statusEffectListToSortedEffectList = (statusEffectList: StatusEffect[]): StatusEffectWithDefinition[] => {
    const effectTuple: StatusEffectWithDefinition[] = [];
    for (const statusEffect of statusEffectList) {
        effectTuple.push({
            statusEffect,
            effectDefinition: EffectDefinitions.get(statusEffect.name)!,
        });
    }
    return effectTuple.sort((tuple1, tuple2) => (tuple1.effectDefinition.decoratorPriority < tuple2.effectDefinition.decoratorPriority) ? -1 : 1);
};

class EffectImpl implements Effect {
    title = "";
    description = "";
    decoratorPriority = 0;
    autoDecrementAfterUpkeep = false;
    onStartTurnUpkeepProvided: (entity: Entity, statusEffect: StatusEffect) => ThunkType;

    constructor(props: Effect) {
        this.title = props.title || this.title;
        this.description = props.description || this.description;
        this.decoratorPriority = props.decoratorPriority || this.decoratorPriority;
        this.applySourceAttackDecorator = props.applySourceAttackDecorator || this.applySourceAttackDecorator;
        this.applyTargetAttackDecorator = props.applyTargetAttackDecorator || this.applyTargetAttackDecorator;
        this.onStartTurnUpkeepProvided = props.onStartTurnUpkeep || this.onUpkeepBlank;
        this.autoDecrementAfterUpkeep = props.autoDecrementAfterUpkeep || this.autoDecrementAfterUpkeep;
    }

    applySourceAttackDecorator = (cast: AttackStep, statusEffect: StatusEffect): AttackStep => {
        return cast;
    };

    applyTargetAttackDecorator = (cast: AttackStep, statusEffect: StatusEffect): AttackStep => {
        return cast;
    };

    onStartTurnUpkeep(entity: Entity, statusEffect: StatusEffect): ThunkType {
        return (dispatch, getState, extraArgument) => {
            this.onStartTurnUpkeepProvided(entity, statusEffect)(dispatch, getState, extraArgument);
            if (this.autoDecrementAfterUpkeep) {
                dispatch(EntityActions.ApplyEffect.create({
                    effectName: statusEffect.name,
                    entityId: entity.id,
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

/**
 * So, this map has some weird syntax. I went with it over a standard object so that I could ensure that each of the
 * keys existed in the EffectName array. Otherwise when we ask for a buff from the buff dictionary, any key that is a
 * string would compile.
 *
 * We should list a class associated with each effect that knows how to process it
 */
export const EffectDefinitions = new Map<EffectName, EffectImpl> ([
    [EffectName.Attack, new EffectImpl({
        title: 'Attack',
        description: 'Deal damage',
    })],
    [EffectName.BerserkEnergy, new EffectImpl({
        title: 'Berserk Energy',
        description: 'Energy at start of turn',
        onStartTurnUpkeep: (entity: Entity, statusEffect: StatusEffect): ThunkType => {
            return (dispatch, getState, extraArgument) => {
                dispatch(EntityActions.AdjustEnergy.create({
                    entityId: entity.id,
                    energy: statusEffect.magnitude,
                }));
            }
        }
    })],
    [EffectName.Block, new EffectImpl({
        title: 'Block',
        description: 'Reduce incoming damage by this amount',
        onStartTurnUpkeep: (entity: Entity, statusEffect: StatusEffect): ThunkType => {
            return (dispatch, getState, extraArgument) => {
                dispatch(EntityActions.ClearEffect.create({
                    entityId: entity.id,
                    effectName: EffectName.Block,
                }));
            }
        }
    })],
    [EffectName.Vulnerable, new EffectImpl({
        title: 'Vulnerable',
        description: 'Vulnerable entity takes 50% more attack damage for __ turns',
        applyTargetAttackDecorator: (cast: AttackStep, statusEffect: StatusEffect): AttackStep  => new VulnerableDecorator(cast),
        autoDecrementAfterUpkeep: true,
    })],
    [EffectName.Strength, new EffectImpl({
        title: 'Strength',
        description: 'Gain 2 strength',
        applySourceAttackDecorator: (cast: AttackStep, statusEffect: StatusEffect): AttackStep  => new StrengthDecorator(cast, statusEffect.magnitude),
    })],
    [EffectName.Frail, new EffectImpl({
        title: 'Frail',
        description: 'Reduces the amount of block points gained by 25%',
        autoDecrementAfterUpkeep: true,
    })],
    [EffectName.Weak, new EffectImpl({
        title: 'Weak',
        description: 'Reduces the amount of damage given by a 25%',
        decoratorPriority: 1,
        applySourceAttackDecorator: (cast: AttackStep, statusEffect: StatusEffect): AttackStep => new WeakDecorator(cast),
        autoDecrementAfterUpkeep: true,
    })],
]);
