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
    ADD_BUFF: ({buffName, value}) => {
        // TODO: oh my god having to care about not mutating existing state sucks. There's got to be a way where we
        // TODO: don't have to think so much about it in these reducers. Modularizing the state would help, but not fix.
        let newState = {
            ...state,
            hero: {
                ...state.hero,
                buffList: [...state.hero.buffList]
            }
        };
        const existingBuff = newState.hero.buffList.find(buff => buff.name === buffName);
        if (existingBuff) {
            existingBuff.value += value;
        } else {
            newState.hero.buffList.push({
                name: buffName,
                value,
            });
        }
        return newState;
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