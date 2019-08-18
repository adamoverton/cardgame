import { defaultDeckStore } from "src/redux/DeckTypes";
import { defaultEntityStore } from "src/redux/EntityTypes";
import { StoreState } from "src/redux/StoreState";

export const defaultState: StoreState = {
    deck: defaultDeckStore,
    entity: defaultEntityStore,
};