import { Actions, ThunkType } from 'src/actions/GameActions';
import { EffectDefinitions, EffectName, TargetType } from 'src/GamePlay/Effect';
import { Cast } from 'src/GamePlay/Card';
import { Entity, StoreState } from 'src/types/StoreState';

export function playCard(castList: Cast[], sourceId: string, targetId: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        // Apply the effects for each cast
        for (const cast of castList) {
            let castTarget = targetId;

            switch(cast.target) {
                case TargetType.Self:
                    castTarget = sourceId;
                    break;
                default:
                    // TODO: Fix other cast targets
                    break;
            }
            switch (cast.effect) {
                case EffectName.Attack:
                    attack(cast, sourceId, targetId)(dispatch, getState, extraArgument);
                    break;
                case EffectName.Strength:
                    dispatch(Actions.APPLY_EFFECT({
                        effectName: cast.effect,
                        targetId: castTarget,
                        magnitude: cast.magnitude,
                    }));
                    break;
            }
        }
    };
};

export function startCombat(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        dispatch(Actions.ADD_ENEMY({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
};

export function endTurn(): ThunkType {
    // Do end of hero turn shenanigans

    // Go through each enemy and do their turn
    // for (const enemy of getState().enemyList)

    return (dispatch, getState, extraArgument) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};

function getEntityById(id: string, state: StoreState): Entity {
    return (id === "hero") ? state.hero : state.enemyList.find(enemy => enemy.id === id)!;
}

//
// TODO: Revive this to apply decorations to this process!
//
// export function applyStatusEffect(cast: Cast, sourceId: string, targetId: string): ThunkType {
//     return (dispatch, getState, extraArgument) => {
//         const targetEntity = getEntityById(targetId, getState());
//         const existingEffect = targetEntity.effectList.find(effect => effect.name === cast.effect);

//         if (existingEffect) {
//             existingEffect.magnitude += cast.magnitude;
//         } else {
//             targetEntity.effectList.push({
//                 name: cast.effect,
//                 magnitude: cast.magnitude,
//             });
//         }
//     }
// }

export function attack(attackCast: Cast, sourceId: string, targetId: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        // create attack
        let attackStep: AttackStep = new BasicMagnitudeAttack(attackCast.magnitude);

        const sourceEntity = getEntityById(sourceId, getState());
        // const targetEntity = getEntityById(targetId, getState());
        
        // loop through all the status and apply relevant decorators
        // applyDecoratorsByType = () => {
            // ...
            // loop through all status effects of the attack source and the attack target
            // (relics can also be a source of status effects)
            // ask them if they want to decorate the attack
            for (const statusEffect of sourceEntity.effectList) {
                attackStep = EffectDefinitions.get(statusEffect.name)!.applyAttackDecorator(attackStep);
            }
        // }

        // loop through all the target's status' and apply them as well for attack
        // TODO: We need to define some directionality of applying status effects because 
        // of strength/weak (source) vs vulnerable/block (target)
        // for (const statusEffect of getState().enemyList[0].effectList) {
        //     attack = EffectDefinitions[statusEffect.name].applyAttackDecorator(attackStep);
        // }

        // calculate raw damage
        const damage = attackStep.getAttackPower();

        // TODO: define getTargetBlock();
        // let block = getTargetBlock();

        // if (damage > block)  {
            // block => 0;
            // damage -= block;

            // If we call it applyXxx, it should actually do it. But then it will need dispatch and whatnot
            //damage = applyUnblockedDamage(damage);

            // TODO: invoke action to adjust the health of the target in the store
        // }
        dispatch(Actions.ADJUST_HP({
            hp: -damage,
            targetEntityId: targetId,
        }));
    }
};

// const applyUnblockedDamage = (unblockedDamage: number) => {
//     // TODO: loop through iterators and adjust the unblocked damage
//     return unblockedDamage;
// }

export class AttackStep {
    getAttackPower = (): number => {
        return 0;
    }
}

export class BasicMagnitudeAttack extends AttackStep {
    protected _damage: number;

    constructor(damage: number) {
        super();
        this._damage = damage;
    }

    getAttackPower = (): number => {
        return this._damage;
    }
}

export class AttackDecorator extends AttackStep {
    protected _inner: AttackStep;

    constructor(inner: AttackStep) {
        super();
        this._inner = inner;
    }

    getAttackPower = (): number => {
        return this._inner.getAttackPower();
    }
}

export class VulnerableDecorator extends AttackDecorator {
    getAttackPower = (): number => {
        return this._inner.getAttackPower() * 1.5;
    }
}

export class StrengthDecorator extends AttackDecorator {
    _strength: number;

    constructor(inner: AttackStep, strength: number) {
        super(inner);
        this._strength = strength;
    }
    getAttackPower = (): number => {
        return this._inner.getAttackPower() + this._strength;
    }
}

// class WeakDecorator extends AttackDecorator {
//     getAttackPower = (): number => {
//         return this._inner.getAttackPower() * .75;
//     }
// }
