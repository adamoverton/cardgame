import { Reducer, TypedReducer } from 'redoodle';
import * as Actions from 'src/redux/TargetingActions';
import { TargetingStore } from "src/redux/TargetingTypes";

export function createTargetingReducer(): Reducer<TargetingStore> {
    const builder = TypedReducer.builder<TargetingStore>();

    builder.withHandler(Actions.SetActiveCard.TYPE, (state: TargetingStore, payload) => {
        return {
            ...state,
            activeCard: payload.activeCard,
        };
    });

    builder.withHandler(Actions.SetTargetedEntityId.TYPE, (state: TargetingStore, payload) => {
        return {
            ...state,
            targetedEntityId: payload.entityId,
        };
    });

    return builder.build();
}
