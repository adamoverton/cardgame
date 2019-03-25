import {StoreState} from 'src/types/StoreState';
import {Actions, ActionsType} from 'src/actions/GameActions';

export const reducer = (state: StoreState, action: ActionsType) => Actions.match(action, {
    /**
     * Increment/decrement the hero hp by the given value
     */
    ADJUST_HP: ({targetEntityId, hp}) => {
        let newState = {
            ...state,
        }
        if (targetEntityId === 'hero') {
            newState.hero = {
                ...state.hero,
                hp: state.hero.hp + hp,
            };
        } else {
            let found = false;
            const newEnemyList = newState.enemyList.map(enemy => {
                if (enemy.id === targetEntityId) {
                    enemy.hp += hp;
                    found = true;
                }
                return enemy;
            });

            if (!found) {
                console.warn(`Tried to adjust hp of ${targetEntityId} but could not find corresponding entity`);
            }
            newState.enemyList = newEnemyList;
        }

        return newState;
    },
    /**
     * Add a hero buff matching the given name with the given value. If the buff already exists, add the given value
     * to the existing buff
     */
    APPLY_EFFECT: ({effectName, targetId, magnitude}) => {
        // TODO: Should take an entity id and not just apply it to the hero
        //
        // TODO: oh my god having to care about not mutating existing state sucks. There's got to be a way where we
        // TODO: don't have to think so much about it in these reducers. Modularizing the state would help, but not fix.
        if (targetId === "hero") {
            let newState = {
                ...state,
                hero: {
                    ...state.hero,
                    effectList: [...state.hero.effectList]
                }
            };

            // Having already made a copy, it is safe to mutate
            const existingEffect = newState.hero.effectList.find(effect => effect.name === effectName);
            if (existingEffect) {
                existingEffect.magnitude += magnitude;
            } else {
                newState.hero.effectList.push({
                    name: effectName,
                    magnitude,
                });
            }
            return newState;
        } else {
            // TODO:
            return state;
        }
    },
    ADD_ENEMY: (enemy) => ({
        ...state,
        enemyList: [
            ...state.enemyList,
            {
                ...enemy,
                id: 'enemy' + state.enemyIdIncrementer,
            },
        ],
        enemyIdIncrementer: state.enemyIdIncrementer + 1,
    }),
    REMOVE_ENEMY: (enemyId) => ({
        ...state,
        enemyList: state.enemyList.filter(enemy => enemy.id !== enemyId),
        enemyIdIncrementer: state.enemyIdIncrementer + 1,
    }),
    CLEAR_ENEMIES: () => ({
        ...state,
        enemyList: [],
        enemyIdIncrementer: 0,
    }),
    /**
     * This default case is necessary for everything to compile. We should never get here.
     */
    default: a => {
        console.error("You somehow got to the default reducer. This is probably an error!");
        return {...state}
    },
});