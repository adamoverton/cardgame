import { CardDefinitions} from "src/gameLogic/CardDefinitions";
import { Card, CardName } from "src/models/Card";

export interface BattleCards {
    drawPile: Card[];
    hand: Card[];
    discardPile: Card[];
    // exhaustPile: Card[];
    cardIdIncrementer: number;
}

export interface DeckStore {
    heroDeck: Card[];
    battleCards: BattleCards;
}

export const defaultDeckStore: DeckStore = {
    heroDeck: [],
    battleCards: {
        drawPile: [
            {...CardDefinitions.get(CardName.Defend)!, id: 0},
            {...CardDefinitions.get(CardName.Strike)!, id: 1},
            {...CardDefinitions.get(CardName.Strike)!, id: 2},
            {...CardDefinitions.get(CardName.Defend)!, id: 3},
            {...CardDefinitions.get(CardName.Defend)!, id: 4},
            {...CardDefinitions.get(CardName.Strike)!, id: 5},
            {...CardDefinitions.get(CardName.Strike)!, id: 6},
        ],
        hand: [
            {...CardDefinitions.get(CardName.Strike)!, id: 7},
            {...CardDefinitions.get(CardName.Defend)!, id: 8},
            {...CardDefinitions.get(CardName.Inflame)!, id: 9},
            {...CardDefinitions.get(CardName.Uppercut)!, id: 10},
            {...CardDefinitions.get(CardName.BlockTest)!, id: 11},
        ],
        discardPile: [],
        cardIdIncrementer: 500,
    },
};
