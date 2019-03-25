import { Actions, ThunkType } from 'src/actions/GameActions';
import { EffectDefinitions, EffectName } from 'src/GamePlay/Effect';
import { Cast } from 'src/GamePlay/Card';

export function playCard(castList: Cast[], targetId: string): ThunkType {
    return (dispatch, getState, extraArguement) => {
        // Apply the effects for each cast
        for (const cast of castList) {
            switch (cast.effect) {
                case EffectName.Attack:
                    attack(cast)(dispatch, getState, extraArguement);
                    break;
            }
        }
    };
};

export function startCombat(): ThunkType {
    return (dispatch, getState, extraArguement) => {
        dispatch(Actions.ADD_ENEMY({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
};

export function endTurn(): ThunkType {
    return (dispatch, getState, extraArguement) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};

// export function attack(dispatch: () => void, getState: () => StoreState, attackCast: Cast): void {
export function attack(attackCast: Cast): ThunkType {
    return (dispatch, getState, extraArguement) => {
        // create attack
        let attackStep: AttackStep = new BasicMagnitudeAttack(attackCast.magnitude);
        
        // loop through all the status and apply relevant decorators
        // applyDecoratorsByType = () => {
            // ...
            // loop through all status effects of the attack source and the attack target
            // (relics can also be a source of status effects)
            // ask them if they want to decorate the attack
            for (const statusEffect of getState().hero.effectList) {
                attackStep = EffectDefinitions[statusEffect.name].applyAttackDecorator(attack);
            }
        // }

        // loop through all the target's status' and apply them as well for attack
        // TODO: We need to define some directionality of applying status effects because 
        // of strength/weak (source) vs vulnerable/block (target)
        // for (const statusEffect of getState().enemyList[0].effectList) {
        //     attack = EffectDefinitions[statusEffect.name].applyAttackDecorator(attack);
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
            targetEntityId: "enemy1"
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

// class WeakDecorator extends AttackDecorator {
//     getAttackPower = (): number => {
//         return this._inner.getAttackPower() * .75;
//     }
// }
