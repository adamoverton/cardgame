import {BuffName} from 'src/types/StoreState';
import {unionize, ofType, UnionOf} from 'unionize';

export const Actions = unionize({
    ADJUST_HP: ofType<{ hp: number }>(),
    ADD_BUFF: ofType<{ buffName: BuffName, value: number }>(),
}, {
    tag: 'type',
    value: 'payload',
});

export type ActionsType = UnionOf<typeof Actions>;
