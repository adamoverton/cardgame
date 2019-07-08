import { StoreState } from 'src/types/StoreState';
import { TypedReducer } from 'redoodle';
import * as Actions from 'src/actions/GameActions';

export function buildDeckReducer(builder: TypedReducer.Builder<StoreState>) {
    builder.withHandler(Actions.DiscardHand.TYPE, (state, payload) => {
        const newState = {
            ...state,
            battleCards: {
                ...state.battleCards,
                hand: [],
                discardPile: [...state.battleCards.discardPile, ...state.battleCards.hand],
            },
        };

        return newState;
    });

    builder.withHandler(Actions.DiscardCard.TYPE, (state, payload) => {
        const newState = {
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
        const newState = {
            ...state,
            battleCards: {
                ...state.battleCards,
                discardPile: [],
                drawPile: [...state.battleCards.drawPile, ...state.battleCards.discardPile],
            },
        };

        // TODO: Randomize the draw pile

        return newState;
    });
}
