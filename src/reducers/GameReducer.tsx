import {StoreState} from 'src/types/StoreState';
import * as Actions from 'src/actions/GameActions';
import { TypedReducer } from 'redoodle';
import { defaultState } from 'src/configureStore';

export function createReducer() {
    const builder = TypedReducer.builder<StoreState>();

    builder.withHandler(Actions.AdjustHp.TYPE, (state, payload) => {
    /**
     * Increment/decrement the hero hp by the given value
     */
        const newState = {
            ...state,
        }
        if (payload.targetEntityId === 'hero') {
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
    
    /**
     * Add a hero buff matching the given name with the given value. If the buff already exists, add the given value
     * to the existing buff
     */
    builder.withHandler(Actions.ApplyEffect.TYPE, (state, payload) => {
        // TODO: Should take an entity id and not just apply it to the hero
        //
        // TODO: oh my god having to care about not mutating existing state sucks. There's got to be a way where we
        // TODO: don't have to think so much about it in these reducers. Modularizing the state would help, but not fix.
        if (payload.targetId === "hero") {
            let newState = {
                ...state,
                hero: {
                    ...state.hero,
                    effectList: [...state.hero.effectList]
                }
            };

            // Having already made a copy, it is safe to mutate
            const existingEffect = newState.hero.effectList.find(effect => effect.name === payload.effectName);
            if (existingEffect) {
                existingEffect.magnitude += payload.magnitude;
            } else {
                newState.hero.effectList.push({
                    name: payload.effectName,
                    magnitude: payload.magnitude,
                });
            }
            return newState;
        } else {
            // TODO:
            return state;
        }
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
