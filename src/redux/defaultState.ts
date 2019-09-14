import { defaultEntityStore } from "src/redux/EntityTypes";
import { StoreState } from "src/redux/StoreState";
import { defaultTargetingStore } from "src/redux/TargetingTypes";

export const defaultState: StoreState = {
    entity: defaultEntityStore,
    targeting: defaultTargetingStore,
};