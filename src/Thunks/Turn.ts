import { Actions, ThunkType } from 'src/actions/GameActions';
import { EffectName } from 'src/GamePlay/Effect';

export function playCard(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().enemyList[0].id, hp: -10}));
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().enemyList[1].id, hp: -10}));
        dispatch(Actions.APPLY_EFFECT({effectName: EffectName.BerserkEnergy, magnitude: 3}));
    };
};

export function startCombat(): ThunkType {
    return (dispatch) => {
        dispatch(Actions.ADD_ENEMY({
            hp: 10,
            maxHp: 50,
            effectList: [],
        }));
    };
};

export function endTurn(): ThunkType {
    return (dispatch, getState) => {
        dispatch(Actions.ADJUST_HP({targetEntityId: getState().hero.id, hp: -1}));
    };
};