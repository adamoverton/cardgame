import { Card } from "src/models/Card";

export interface TargetingStore {
    activeCard: Card | undefined; // Card that is currently being dragged/targeted
    targetedEntityId: string | undefined;
}

export const defaultTargetingStore: TargetingStore = {
    activeCard: undefined,
    targetedEntityId: undefined,
};
