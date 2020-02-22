import { Reducer, TypedReducer } from 'redoodle';
import * as Actions from 'src/redux/BattlefieldActions';
import { BattlefieldStore } from 'src/redux/BattlefieldTypes';

export function createBattlefieldReducer(): Reducer<BattlefieldStore> {
    const builder = TypedReducer.builder<BattlefieldStore>();

    builder.withHandler(Actions.SetTerrain.TYPE, (state: BattlefieldStore, payload) => {
        const newState:BattlefieldStore =  { ...state };

        newState.grid[payload.col][payload.row].terrain = payload.terrain;
        return newState;
    });

    return builder.build();
}
