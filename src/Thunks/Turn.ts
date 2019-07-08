import  * as Actions from 'src/actions/GameActions';
import { EffectDefinitions, EffectName, TargetType } from 'src/GamePlay/Effect';
import { Cast, Card } from 'src/GamePlay/Card';
import { Entity, StoreState, kHeroId } from 'src/types/StoreState';
import { ThunkType } from 'src/actions/GameActions';
import randomInt from 'random-int';

export function playCard(card: Card, sourceId: string, targetId: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();

        // When there is not enough Energy to play a card, don't play the card
        if (state.hero.energy - card.energyCost < 0) {
            return;
        }

        // Pay Energy cost for playing this card
        dispatch(Actions.AdjustEnergy.create({
            energy: -card.energyCost,
        }))

        // Apply the effects for each cast
        for (const cast of card.castList) {
            const castTargetList: string[] = [];

            switch (cast.target) {
                case TargetType.Self:
                    castTargetList.push(sourceId);
                    break;
                case TargetType.Targetted:
                    castTargetList.push(targetId);
                    break;
                case TargetType.AllEnemy:
                    for (const enemy of state.enemyList) {
                        castTargetList.push(enemy.id);
                    }
                    break;
                case TargetType.RandomEnemy:
                    const randomArrayIndex = randomInt(0, state.enemyList.length - 1);
                    castTargetList.push(state.enemyList[randomArrayIndex].id);
                    break;
                default:
                    // Typing should prevent us from ever getting here.
                    throw new Error('invalid cast target');
                    break;
            }
            for (const castTarget of castTargetList) {
                switch (cast.effect) {
                    case EffectName.Attack:
                        attack(cast, sourceId, castTarget)(dispatch, getState, extraArgument);
                        break;
                    case EffectName.Strength:
                        dispatch(Actions.ApplyEffect.create({
                            effectName: cast.effect,
                            targetId: castTarget,
                            magnitude: cast.magnitude,
                        }));
                        break;
                    case EffectName.Weak:
                        dispatch(Actions.ApplyEffect.create({
                            effectName: cast.effect,
                            targetId: castTarget,
                            magnitude: cast.magnitude,
                        }));
                        break;
                }
            }
        }
    };
};

export function startCombat(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        dispatch(Actions.AddEnemy.create({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
};

export function startTurnUpkeep(entityId: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();
        const entity = getEntityById(entityId, state);

        // loop through all status effects and call them with the event
        for (const statusEffect of entity.effectList) {
            EffectDefinitions.get(statusEffect.name)!.onStartTurnUpkeep(entity, statusEffect)(dispatch, getState, extraArgument);
        }
    }
}

export function endTurn(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        // 
        // Do end of hero turn upkeep
        //  


        // Go through each enemy and do their turn
        for (const enemy of getState().enemyList) {
            startTurnUpkeep(enemy.id)(dispatch, getState, extraArgument);
        }

        // Hero's turn again
        // The basics
        dispatch(Actions.ResetEnergy.create({}));

        startTurnUpkeep(kHeroId)(dispatch, getState, extraArgument);
    };
};

function getEntityById(id: string, state: StoreState): Entity {
    return (id === kHeroId) ? state.hero : state.enemyList.find(enemy => enemy.id === id)!;
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
        let attackStep: AttackStep = new MagnitudeAttack(attackCast.magnitude);

        const sourceEntity = getEntityById(sourceId, getState());
        // const targetEntity = getEntityById(targetId, getState());

        // loop through all the status and apply relevant decorators
        // applyDecoratorsByType = () => {
        // ...
        // loop through all status effects of the attack source and the attack target
        // (relics can also be a source of status effects)
        // ask them if they want to decorate the attack
        for (const statusEffect of sourceEntity.effectList) {
            attackStep = EffectDefinitions.get(statusEffect.name)!.applyAttackDecorator(attackStep, statusEffect.magnitude);
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
        // damage = applyUnblockedDamage(damage);

        // TODO: invoke action to adjust the health of the target in the store
        // }

        dispatch(Actions.AdjustHp.create({
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

export class MagnitudeAttack extends AttackStep {
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
