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
    deck: Card[];               // These are the cards regardless of current combat
    battleCards: BattleCards;   // This is the active deck that often gets morphed as a battle ensues
}

export const defaultHeroDeckStore: DeckStore = {
    deck: [],
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

export const defaultEnemyDeckStore: DeckStore = {
    deck: [],
    battleCards: {
        drawPile: [
            {...CardDefinitions.get(CardName.Strike)!, id: 6},
        ],
        hand: [
            {...CardDefinitions.get(CardName.Strike)!, id: 7},
        ],
        discardPile: [],
        cardIdIncrementer: 500,
    },
};
