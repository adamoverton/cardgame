import {StoreState, kHeroId, Entity} from 'src/types/StoreState';
import * as Actions from 'src/actions/GameActions';
import { TypedReducer } from 'redoodle';
import { defaultState } from 'src/defaultState';

export function createReducer() {
    const builder = TypedReducer.builder<StoreState>();

    builder.withHandler(Actions.AdjustHp.TYPE, (state, payload) => {
        /**
         * Increment/decrement the hero hp by the given value
         */
        const newState = {
            ...state,
        }
        if (payload.targetEntityId === kHeroId) {
            newState.hero = {
                ...state.hero,
                hp: state.hero.hp + payload.hp,
            };
        } else {
            let found = false;
            const newEnemyList = newState.enemyList.map(enemy => {
                if (enemy.id === payload.targetEntityId) {
                    enemy.hp += payload.hp;
                    found = true;
                }
                return enemy;
            });

            if (!found) {
                console.warn(`Tried to adjust hp of ${payload.targetEntityId} but could not find corresponding entity`);
            }
            newState.enemyList = newEnemyList;
        }

        return newState;
    });

    builder.withHandler(Actions.AdjustEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            hero: {
                ...state.hero,
                energy: state.hero.energy + payload.energy,
            },
        };

        return newState;
    });

    builder.withHandler(Actions.SetEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            hero: {
                ...state.hero,
                energy: payload.energy,
            },
        };

        return newState;
    });

    builder.withHandler(Actions.ResetEnergy.TYPE, (state, payload) => {
        const newState = {
            ...state,
            hero: {
                ...state.hero,
                energy: state.hero.maxEnergy,
            }
        };

        return newState;
    });
    
    /**
     * Add a buff to the given target matching the given name with the given value. If the buff already exists, add the
     * given value to the existing buff
     */
    builder.withHandler(Actions.ApplyEffect.TYPE, (state, payload) => {
        // Create a new state with both a new hero and enemy list, because we may be targeting either of them
        const newState = {
            ...state,
            hero: {
                ...state.hero,
            },
            enemyList: [
                ...state.enemyList,
            ]
        };
        let target: Entity | undefined;

        // Find the target in the new state
        if (payload.targetId === "hero") {
            target = newState.hero;
        } else {
            // We must be targeting an enemy if we aren't targeting the hero

            target = newState.enemyList.find(enemy => {
                return enemy.id === payload.targetId;
            });

            if (target === undefined) {
                throw new Error("We didn't find a target to buff, but we were expecting to!");
            }
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
        // Create a new state with both a new hero and enemy list, because we may be targeting either of them
        const newState = {
            ...state,
            hero: {
                ...state.hero,
            },
            enemyList: [
                ...state.enemyList,
            ]
        };
        let target: Entity | undefined;

        // Find the target in the new state
        if (payload.targetId === "hero") {
            target = newState.hero;
        } else {
            // We must be targeting an enemy if we aren't targeting the hero

            target = newState.enemyList.find(enemy => {
                return enemy.id === payload.targetId;
            });

            if (target === undefined) {
                throw new Error("We didn't find a target to buff, but we were expecting to!");
            }
        }

        // Clone the target's effectList now that we have the target (because immutability)
        target.effectList = [...target.effectList];

        // It is now safe to mutate the effect list on our target
        target.effectList = target.effectList.filter(effect => effect.name !== payload.effectName);
        return newState;
    });

    builder.withHandler(Actions.AddEnemy.TYPE, (state, payload) => {
        return {
            ...state,
            enemyList: [
                ...state.enemyList,
                {
                    hp: payload.hp,
                    maxHp: payload.maxHp,
                    effectList: payload.effectList,
                    id: 'enemy' + state.enemyIdIncrementer,
                },
            ],
            enemyIdIncrementer: state.enemyIdIncrementer + 1,
        }
    });

    builder.withHandler(Actions.RemoveEnemy.TYPE, (state, payload) => {
        return {
            ...state,
            enemyList: state.enemyList.filter(enemy => enemy.id !== payload.id),
            enemyIdIncrementer: state.enemyIdIncrementer + 1,
        }
    });

    builder.withHandler(Actions.ClearEnemies.TYPE, (state, payload) => {
        return {
            ...state,
            enemyList: [],
            enemyIdIncrementer: 0,
        }
    });

    /**
     * This default case is necessary for everything to compile. We should never get here.
     */
    builder.withDefaultHandler(state => {
        console.error("You somehow got to the default reducer. This is probably an error!");
        return state !== undefined ? state : defaultState;
    });

    return builder.build();
};
