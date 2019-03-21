import { Actions, ThunkType } from 'src/actions/GameActions';
import { EffectDefinitions, EffectName } from 'src/GamePlay/Effect';
import { Cast } from 'src/GamePlay/Card';
import { StoreState } from 'src/types/StoreState';

export function playCard(castList: Cast[], targetId: string): ThunkType {
    return (dispatch, getState) => {
        // Apply the effects for each cast
        for (const cast of castList) {
            switch (cast.effect) {
                case EffectName.Attack:
                    attack(cast, getState);
                    break;
            }
        }
    };
};

export function startCombat(): ThunkType {
    return (dispatch) => {
        dispatch(Actions.ADD_ENEMY({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
};

export function endTurn(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};

export function attack(attackCast: Cast, getState: () => StoreState): void {
    // create attack
    let attack: AttackCast = new BasicAttack(attackCast.magnitude);
    
    // loop through all the status and apply relevant decorators
    // applyDecoratorsByType = () => {
        // ...
        // loop through all status effects of the attack source and the attack target
        // (relics can also be a source of status effects)
        // ask them if they want to decorate the attack
        for (const statusEffect of getState().hero.effectList) {
            attack = EffectDefinitions[statusEffect.name].applyAttackDecorator(attack);
        }
    // }

    // calculate raw damage
    let damage = attack.getAttackPower();

    // TODO: define getTargetBlock();
    // let block = getTargetBlock();

    // if (damage > block)  {
        // block => 0;
        // damage -= block;
        damage = applyUnblockedDamage(damage);

        // TODO: invoke action to adjust the health of the target in the store
    // }
};

const applyUnblockedDamage = (unblockedDamage: number) => {
    // TODO: loop through iterators and adjust the unblocked damage
    return unblockedDamage;
}

export class AttackCast {
    getAttackPower = (): number => {
        return 0;
    }
}

class BasicAttack {
    protected _damage: number;

    constructor(damage: number) {
        this._damage = damage;
    }

    getAttackPower = (): number => {
        return this._damage;
    }
}

class AttackDecorator extends AttackCast {
    protected _inner: AttackCast;

    constructor(inner: AttackCast) {
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
