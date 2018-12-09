import {StoreState} from 'src/types/StoreState';
import {Actions, ActionsType} from 'src/actions/GameActions';

export const initialState = {
    hero: {
        id: 'hero',
        hp: 10,
        maxHp: 50,
        buffList: [],
    },
    enemyList: [
        {
            id: 'enemy1',
            hp: 10,
            maxHp: 50,
            buffList: [],
        },
        {
            id: 'enemy2',
            hp: 20,
            maxHp: 100,
            buffList: [],
        }
    ],
};

export const reducer = (state: StoreState, action: ActionsType) => Actions.match(action, {
    /**
     * Increment/decrement the hero hp by the given value
     */
    ADJUST_HP: ({hp}) => ({
        ...state,
        hero: {
            ...state.hero,
            hp: state.hero.hp + hp,
        },
    }),
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
    /**
     * This default case is necessary for everything to compile. We should never get here.
     */
    default: a => {
        console.error("You somehow got to the default reducer. This is probably an error!");
        return {...state}
    },
});