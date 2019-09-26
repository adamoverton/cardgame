import { CardDefinitions} from "src/gameLogic/CardDefinitions";
import { Card } from "src/models/Card";
import { CardName } from "src/gameLogic/CardDefinitions";

export interface BattleCards {
    drawPile: Card[];
    hand: Card[];
    discardPile: Card[];
    // exhaustPile: Card[];
    drawCount: number;
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
        ],
        hand: [
        ],
        discardPile: [
            {...CardDefinitions.get(CardName.BouncingFlask)!, id: 0},
            {...CardDefinitions.get(CardName.Bash)!, id: 1},
            {...CardDefinitions.get(CardName.Strike)!, id: 2},
            {...CardDefinitions.get(CardName.Strike)!, id: 3},
            {...CardDefinitions.get(CardName.Strike)!, id: 4},
            {...CardDefinitions.get(CardName.Strike)!, id: 5},
            {...CardDefinitions.get(CardName.Defend)!, id: 6},
            {...CardDefinitions.get(CardName.Defend)!, id: 7},
            {...CardDefinitions.get(CardName.Defend)!, id: 8},
            {...CardDefinitions.get(CardName.Defend)!, id: 9},
            {...CardDefinitions.get(CardName.DeadlyPoison)!, id: 10},
        ],
        drawCount: 5,
        cardIdIncrementer: 500,
    },
};

export const defaultEnemyDeckStore: DeckStore = {
    deck: [],
    battleCards: {
        drawPile: [
            {...CardDefinitions.get(CardName.Thrash)!, id: 7},
            {...CardDefinitions.get(CardName.Bellow)!, id: 9},
        ],
        hand: [
            {...CardDefinitions.get(CardName.Chomp)!, id: 8},
        ],
        discardPile: [],
        drawCount: 2,
        cardIdIncrementer: 500,
    },
};
