import * as DeckActions from 'src/redux/DeckActions';
import * as EntityActions from 'src/redux/EntityActions';
import { EffectDefinitions, statusEffectListToSortedEffectList } from 'src/gameLogic/EffectDefinitions';
import { Cast} from 'src/models/Card';
import randomInt from 'random-int';
import { ThunkType, StoreState } from "src/redux/StoreState";
import { kHeroId, Entity } from "src/models/Entity";
import { EffectName, TargetType } from "src/models/Effect";
import { Card } from "src/models/Card";


export function playActiveCard(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();
        const activeCard = state.targeting.activeCard;
        const targetedEntityId = state.targeting.targetedEntityId;

        // First, we need an active card to, well, play the active card
        if (activeCard) {
            // Next, if the active card isn't targeted we can cast it. Otherwise, it's targeted, so we also
            // need a targetId
            if ( !activeCard.targeted || targetedEntityId) {
                playCard(activeCard, kHeroId, targetedEntityId)(dispatch, getState, extraArgument);
            }
        }
    }
}

export function playCard(card: Card, sourceId: string, targetId?: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();

        // When there is not enough Energy to play a card, don't play the card
        if (state.entity.entityList[sourceId].energy - card.energyCost < 0) {
            return;
        }

        // Pay Energy cost for playing this card
        dispatch(EntityActions.AdjustEnergy.create({
            entityId: sourceId,
            energy: -card.energyCost,
        }));

        // Apply the effects for each cast
        for (const cast of card.castList) {
            const castCount = cast.castCount || 1;

            for (let castIndex = 0; castIndex < castCount; castIndex++) {
                const castTargetList: string[] = determineTarget(state, cast, sourceId, targetId);

                for (const castTarget of castTargetList) {
                    switch (cast.effect) {
                        case EffectName.Attack:
                            attack(cast, sourceId, castTarget)(dispatch, getState, extraArgument);
                            break;
                        case EffectName.Strength:
                        case EffectName.Weak:
                        case EffectName.Block:
                        case EffectName.Poison:                    
                        case EffectName.Vulnerable:
                            dispatch(EntityActions.ApplyEffect.create({
                                effectName: cast.effect,
                                entityId: castTarget,
                                magnitude: cast.magnitude,
                            }));
                            break;
                    }
                }
            }
        }
        dispatch(EntityActions.DeckAction.create({ 
            entityId: sourceId,
            deckAction: DeckActions.DiscardCard.create({
                card,
            }),
        }));
    };
}

function determineTarget(state: StoreState, cast: Cast, sourceId: string, targetId?: string): string[] {
    const castTargetList: string[] = [];

    switch (cast.target) {
        case TargetType.Self:
            castTargetList.push(sourceId);
            break;
        case TargetType.Targeted:
            if (!targetId) {
                console.error("Cast '" + cast.effect + "': A targeted cast needs to have a targetId, but it is undefined");
            } else {
                castTargetList.push(targetId);
            }
            break;
        case TargetType.AllEnemy:
            Object.values(state.entity.entityList).forEach(entity => {
                if (entity.id !== kHeroId) {
                    castTargetList.push(entity.id);
                }
            });
            break;

// Double check random workiness
        case TargetType.RandomEnemy:
            const randomArrayIndex = randomInt(1, Object.values(state.entity.entityList).length - 1);
            const randomKey = Object.keys(state.entity.entityList)[randomArrayIndex];
            castTargetList.push(state.entity.entityList[randomKey].id);
            break;

        default:
            // Typing should prevent us from ever getting here.
            throw new Error('invalid cast target');
            break;
    }
    return castTargetList;
}

export function startCombat(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        dispatch(EntityActions.AddEnemy.create({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
}

export function drawCards(entityId: string, count: number): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();
        const deck = state.entity.entityList[entityId].deck;
        const drawPileCount = deck.battleCards.drawPile.length;
        const discardPileCount = deck.battleCards.discardPile.length;

        // How many do we draw the first time
        if (drawPileCount < count) {
            // Draw all the available cards
            dispatch(EntityActions.DeckAction.create({ 
                entityId,
                deckAction: DeckActions.DrawCards.create({count: drawPileCount})
            }));

            // Count how many more I want
            const remainingDrawCount = count - drawPileCount;

            // Shuffle
            dispatch(EntityActions.DeckAction.create({ 
                entityId,
                deckAction: DeckActions.ShuffleDiscardPileIntoDrawPile.create({})
            }));

            // Draw as many of what I want as possible
            dispatch(EntityActions.DeckAction.create({ 
                entityId,
                deckAction: DeckActions.DrawCards.create({count: Math.min(remainingDrawCount, discardPileCount)})
            }));
        } else {
            dispatch(EntityActions.DeckAction.create({ 
                entityId,
                deckAction: DeckActions.DrawCards.create({count})
            }));
        }

    }
}


export function startTurnUpkeep(entityId: string): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();
        const entity = state.entity.entityList[entityId];

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
        const state = getState();

        // Move hero's hand to discard pile
        dispatch(EntityActions.DeckAction.create({ 
            entityId: kHeroId,
            deckAction: DeckActions.DiscardHand.create({}),
        }));

        // Go through each enemy and do their turn
        doEnemyTurn()(dispatch, getState, extraArgument);

        // Hero's turn again
        // The basics
        dispatch(EntityActions.ResetEnergy.create({ entityId: kHeroId }));

        startTurnUpkeep(kHeroId)(dispatch, getState, extraArgument);

        // Draw hero cards CONSIDER: whether enemies will do this and just play cards too
        const hero = state.entity.entityList[kHeroId];

        // We could do a callback to check for extra card draw here
        const drawCount = hero.deck.battleCards.drawCount;
        drawCards(kHeroId, drawCount)(dispatch, getState, extraArgument);
    };
}

export function doEnemyTurn(): ThunkType {
    return (dispatch, getState, extraArgument) => {
        const state = getState();

        // Make a handy array of enemies
        const enemyList: Entity[] = [];
        Object.values(state.entity.entityList).forEach((entity) => {
            if (entity.id !== kHeroId) {
                enemyList.push(entity);
            }
        });

        // Go through each enemy and do their turn upkeep (update buffs and debuffs)
        enemyList.map((entity => {
            startTurnUpkeep(entity.id)(dispatch, getState, extraArgument);
        }));

        // TODO: If it is poisoned, can't we lose an enemy at this point and need to update our array?
        // Actually this can happen at any moment, like in the middle of playing a card if it incidentally dies

        // Go through each enemy and play their hands
        enemyList.map((entity => {
            console.log("Enemy turn for: " + entity.id);
            entity.deck.battleCards.hand.map(card => {
                // Every card will be played, and that should be fine, but if we ran out of energy, 
                // playCard would just refuse to play it

                playCard(card, entity.id, kHeroId)(dispatch, getState, extraArgument);
                console.log("Playing card: " + card.title);
            });

            // Discard any remaining cards, for completeness
            dispatch(EntityActions.DeckAction.create({ 
                entityId: entity.id,
                deckAction: DeckActions.DiscardHand.create({}),
            }));

            // Draw the new hand so we can show intents
            const drawCount = entity.deck.battleCards.drawCount;
            drawCards(entity.id, drawCount)(dispatch, getState, extraArgument);

            // Reset energy
            dispatch(EntityActions.ResetEnergy.create({ entityId: entity.id }));
        }));
    };
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
        const state = getState();
        // create attack
        let attackStep: AttackStep = new MagnitudeAttack(attackCast.magnitude);

        const sourceEntity = state.entity.entityList[sourceId];
        const targetEntity = state.entity.entityList[targetId];

        // loop through all status effects of the attack source and the attack target
        // (relics can also be a source of status effects)
        // ask them if they want to decorate the attack

        const sourceEffectTuple = statusEffectListToSortedEffectList(sourceEntity.effectList);
        for (const effectTuple of sourceEffectTuple) {
            attackStep = effectTuple.effectDefinition.applySourceAttackDecorator(attackStep, effectTuple.statusEffect);
        }
        // loop through all the target's status' and apply them as well for attack
        const targetEffectTuple = statusEffectListToSortedEffectList(targetEntity.effectList);
        for (const effectTuple of targetEffectTuple) {
             attackStep = effectTuple.effectDefinition.applyTargetAttackDecorator(attackStep, effectTuple.statusEffect);
        }

        // Calculate damage amounts
        const incomingDamage = attackStep.getAttackPower();
        let damageToFace = incomingDamage;

        // Consider block
        const blockEffect = targetEntity.effectList.find( effect => {
            return effect.name === EffectName.Block;
        });

        if (blockEffect) {
            damageToFace = damageToFace - blockEffect.magnitude;
            damageToFace = damageToFace < 0 ? 0 : damageToFace;

            // Adjust block effect due to damage
            const blockAmountUsed = damageToFace > 0 ? blockEffect.magnitude : incomingDamage;
            dispatch(EntityActions.ApplyEffect.create({
                entityId: targetId,
                effectName: EffectName.Block,
                magnitude: -blockAmountUsed,
            }));
        }

        dispatch(EntityActions.AdjustHp.create({
            entityId: targetId,
            hp: -damageToFace,
        }));
    }
}

// const applyUnblockedDamage = (unblockedDamage: number) => {
//     // TODO: loop through iterators and adjust the unblocked damage
//     return unblockedDamage;
// }

export interface AttackStep {
    getAttackPower: () => number;
}

export class MagnitudeAttack implements AttackStep {
    protected _damage: number;

    constructor(damage: number) {
        this._damage = damage;
    }

    getAttackPower = (): number => {
        return this._damage;
    }
}

export class AttackDecorator implements AttackStep {
    protected _inner: AttackStep;

    constructor(inner: AttackStep) {
        this._inner = inner;
    }

    getAttackPower = (): number => {
        return this._inner.getAttackPower();
    }
}

// export class VulnerableDecorator extends AttackDecorator {
//     getAttackPower = (): number => {
//         return this._inner.getAttackPower() * 1.5;
//     }
// }

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

export class VulnerableDecorator extends AttackDecorator {
    constructor(inner: AttackStep) {
        super(inner);
    }
    getAttackPower = (): number => {
        return Math.round(this._inner.getAttackPower() * 1.5);
    }
}

export class WeakDecorator extends AttackDecorator {
    constructor(inner: AttackStep) {
        super(inner);
    }
    getAttackPower = (): number => {
        return Math.round(this._inner.getAttackPower() * 0.75);
    }
}
