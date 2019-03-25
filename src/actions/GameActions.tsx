import { ThunkAction } from 'redux-thunk';
import { ofType, unionize, UnionOf } from 'unionize';
import { EffectName } from 'src/GamePlay/Effect';
import { StoreState, Enemy } from 'src/types/StoreState';

export const Actions = unionize({
    ADJUST_HP: ofType<{ targetEntityId: string, hp: number }>(),
    APPLY_EFFECT: ofType<{ effectName: EffectName, targetId: string, magnitude: number }>(),
    CLEAR_ENEMIES: ofType<{}>(),
    ADD_ENEMY: ofType<Partial<Enemy>>(),
    REMOVE_ENEMY: ofType<string>(),
}, {
    tag: 'type',
    value: 'payload',
});

export type ActionsType = UnionOf<typeof Actions>;
export type ThunkType = ThunkAction<void, StoreState, void, ActionsType>