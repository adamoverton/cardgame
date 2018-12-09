import { Actions, ThunkType } from 'src/actions/GameActions';

export function playCard(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().enemyList[0].id, hp: -10}));
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().enemyList[1].id, hp: -10}));
    };
};

export function startCombat(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};

export function endTurn(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};