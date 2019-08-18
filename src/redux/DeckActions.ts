import { Card } from "src/models/Card";
import { TypedAction } from "redoodle";

export const DiscardHand = TypedAction.define("gameplay::discardHand")<{
}>();

export const DiscardCard = TypedAction.define("gameplay::discardCard")<{
    card: Card;
}>();

export const DrawCards = TypedAction.define("gameplay::drawCards")<{
    count: number;
}>();

export const ShuffleDiscardPileIntoDrawPile = TypedAction.define("gameplay::shuffleDiscardPileIntoDrawPile")<{
}>();