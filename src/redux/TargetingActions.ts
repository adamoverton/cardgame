import { TypedAction } from "redoodle";
import { Card } from "src/models/Card";

export const SetActiveCard = TypedAction.define("gameplay::setActiveCard")<{
    activeCard: Card | undefined;
}>();

export const SetTargetedEntityId = TypedAction.define("gameplay::setTargetedEntity")<{
    entityId: string | undefined;
}>();

export const ClearTargetInfo = TypedAction.define("gameplay::clearTargetInfo")<{
}>();
