import { ThunkAction } from 'redux-thunk';
import { BuffName, StoreState, Enemy } from 'src/types/StoreState';
import { ofType, unionize, UnionOf } from 'unionize';

export const Actions = unionize({
    ADJUST_HP: ofType<{ targetEntityId: string, hp: number }>(),
    ADD_BUFF: ofType<{ buffName: BuffName, value: number }>(),
    CLEAR_ENEMIES: ofType<{}>(),
    ADD_ENEMY: ofType<Partial<Enemy>>(),
    REMOVE_ENEMY: ofType<string>(),
}, {
    tag: 'type',
    value: 'payload',
});

export type ActionsType = UnionOf<typeof Actions>;
export type ThunkType = ThunkAction<void, StoreState, void, ActionsType>