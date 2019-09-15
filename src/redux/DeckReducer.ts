import { Reducer, TypedReducer } from 'redoodle';
import * as Actions from 'src/redux/DeckActions';
import { DeckStore } from "src/redux/DeckTypes";
import randomInt from 'random-int';

export function createDeckReducer(): Reducer<DeckStore> {
    const builder = TypedReducer.builder<DeckStore>();

    builder.withHandler(Actions.DiscardHand.TYPE, (state, payload) => {
        const newState: DeckStore = {
            ...state,
            battleCards: {
                ...state.battleCards,
                hand: [],
                discardPile: [...state.battleCards.discardPile, ...state.battleCards.hand],
            },
        };

        return newState;
    });

    builder.withHandler(Actions.DiscardCard.TYPE, (state: DeckStore, payload) => {
        const newState: DeckStore = {
            ...state,
            battleCards: {
                ...state.battleCards,
                hand: state.battleCards.hand.filter(card => card.id !== payload.card.id),
                discardPile: [...state.battleCards.discardPile, payload.card],
            },
        };

        return newState;
    });

    builder.withHandler(Actions.DrawCards.TYPE, (state, payload) => {
        const newState = {
            ...state,
            battleCards: {
                ...state.battleCards,
                // remove count cards from the draw pile
                drawPile: state.battleCards.drawPile.slice(payload.count, state.battleCards.drawPile.length),
                // add those cards to the hand
                hand: [...state.battleCards.hand, ...state.battleCards.drawPile.slice(0, payload.count)],
            },
        };

        return newState;
    });

    builder.withHandler(Actions.ShuffleDiscardPileIntoDrawPile.TYPE, (state, payload) => {
        const newPile = [];
        const discardPile = [...state.battleCards.discardPile];
        while (discardPile.length > 0) {
            // Pick a random card from the discard pile
            const cardIndex = randomInt(0, discardPile.length - 1);

            // Put it in the draw pile
            newPile.push(discardPile[cardIndex]);

            // Remove it from discard pile
            discardPile.splice(cardIndex, 1);
        }

        const newState = {
            ...state,
            battleCards: {
                ...state.battleCards,
                discardPile: [],
                drawPile: newPile,
            },
        };

        // TODO: Randomize the draw pile

        return newState;
    });

    return builder.build();
}
