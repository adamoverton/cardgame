import { createDefaultBattlefieldStore } from './BattlefieldTypes';
import { defaultEntityStore } from "src/redux/EntityTypes";
import { StoreState } from "src/redux/StoreState";
import { defaultTargetingStore } from "src/redux/TargetingTypes";

export const createDefaultState = (): StoreState => {
    return {
        entity: defaultEntityStore,
        targeting: defaultTargetingStore,
        battlefield: createDefaultBattlefieldStore(),
    };
};