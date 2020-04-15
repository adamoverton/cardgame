import { Reducer, TypedReducer } from "redoodle";
import * as Actions from 'src/redux/EntityActions';
import { kHeroId } from "src/models/Entity";
import { EntityStore } from "src/redux/EntityTypes";
import { createDeckReducer } from 'src/redux/DeckReducer';
import { defaultEnemyDeckStore } from 'src/redux/DeckTypes';

export function createEntityReducer(): Reducer<EntityStore> {
    const deckReducer = createDeckReducer();
    const builder = TypedReducer.builder<EntityStore>();

    builder.withHandler(Actions.DeckAction.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {...state.entityList},
        }

        // make a new copy of the entity we want to update, and then give it the reduced deck
        newState.entityList[payload.entityId] = {
            ...state.entityList[payload.entityId],
            deck: deckReducer(state.entityList[payload.entityId].deck, payload.deckAction),
        };

        return newState;
    });

    builder.withHandler(Actions.AdjustHp.TYPE, (state, payload) => {
        /**
         * Increment/decrement the hero hp by the given value
         */
        const newState = {
            ...state,
            entityList: {
                ...state.entityList,
            }
        };

        const newEntityList = newState.entityList;
        newEntityList[payload.entityId] = {
            ...newEntityList[payload.entityId],
            hp: newEntityList[payload.entityId].hp + payload.hp,
        };

        return newState;
    });

    builder.withHandler(Actions.AdjustEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {
                ...state.entityList,
            }
        };

        const newEntityList = newState.entityList;
        newEntityList[payload.entityId] = {
            ...newEntityList[payload.entityId],
            energy: newEntityList[payload.entityId].energy + payload.energy,
        };

        return newState;
    });

    builder.withHandler(Actions.SetEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {
                ...state.entityList,
            }
        };

        const newEntityList = newState.entityList;
        newEntityList[payload.entityId] = {
            ...newEntityList[payload.entityId],
            energy: payload.energy,
        };

        return newState;
    });

    builder.withHandler(Actions.ResetEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {
                ...state.entityList,
            }
        };

        const newEntityList = newState.entityList;
        newEntityList[payload.entityId] = {
            ...newEntityList[payload.entityId],
            energy: newEntityList[payload.entityId].maxEnergy,
        };

        return newState;
    });

    /**
     * Add a buff to the given target matching the given name with the given value. If the buff already exists, add the
     * given value to the existing buff
     */
    builder.withHandler(Actions.ApplyEffect.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {...state.entityList},
        }

        // make a new copy of the entity we want to update, and then give it the reduced deck
        newState.entityList[payload.entityId] = {
            ...state.entityList[payload.entityId],
        };

        const target = newState.entityList[payload.entityId];

        if (target === undefined) {
            throw new Error("We didn't find a target to buff, but we were expecting to!");
        }

        // Clone the target's effectList now that we have the target (because immutability)
        target.effectList = [...target.effectList];

        // It is now safe to mutate the effect list on our target
        const existingEffect = target.effectList.find(effect => effect.name === payload.effectName);
        if (existingEffect) {
            existingEffect.magnitude += payload.magnitude;
            if (existingEffect.magnitude === 0) {
                target.effectList = target.effectList.filter(effect => effect.name !== payload.effectName);
            }
        } else {
            target.effectList.push({
                name: payload.effectName,
                magnitude: payload.magnitude,
            });
        }
        return newState;
    });

    /**
     * Remove all effects matching the given name with the given value.
     */
    builder.withHandler(Actions.ClearEffect.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {...state.entityList},
        }

        // make a new copy of the entity we want to update, and then give it the reduced deck
        newState.entityList[payload.entityId] = {
            ...state.entityList[payload.entityId],
        };

        const target = newState.entityList[payload.entityId];

        if (target === undefined) {
            throw new Error("We didn't find a target to buff, but we were expecting to!");
        }

        // Clone the target's effectList now that we have the target (because immutability)
        target.effectList = [...target.effectList];
        // It is now safe to mutate the effect list on our target
        target.effectList = target.effectList.filter(effect => effect.name !== payload.effectName);
        return newState;
    });

    builder.withHandler(Actions.AddEnemy.TYPE, (state, payload) => {
        const newEnemyId = 'enemy' + state.enemyIdIncrementer;
        const newState = {
            ...state,
            entityList: {
                ...state.entityList,
            },
            enemyIdIncrementer: state.enemyIdIncrementer + 1,
        }
        newState.entityList[newEnemyId] = {
            hp: payload.hp,
            maxHp: payload.maxHp,
            effectList: payload.effectList,
            id: 'enemy' + state.enemyIdIncrementer,
            energy: 1,
            maxEnergy: 1,
            deck: defaultEnemyDeckStore,
            x: 7,
            y: 7,
        };

        return newState;
    });

    builder.withHandler(Actions.RemoveEntity.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: { ...state.entityList },
        }
        delete newState.entityList[payload.entityId];

        return newState;
    });

    builder.withHandler(Actions.ClearEnemies.TYPE, (state, payload) => {
        const newState = {
            ...state,
            entityList: {},
            enemyIdIncrementer: 0,
        }
        newState.entityList[kHeroId] = state.entityList[kHeroId];

        return newState;
    });

    return builder.build();
}