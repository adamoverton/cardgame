import { connect } from 'react-redux';
import { BaseGameView, BaseGameViewDispatch, BaseGameViewState } from 'src/components/BaseGameView';
import { StoreState } from 'src/types/StoreState';
import 'src/components/GameView.css';
import { endTurn, playCard } from 'src/Thunks/Turn';

export const mapStateToProps = ({hero, battleCards}: StoreState) => {
    return {
        hp: hero.hp,
        maxHp: hero.maxHp,
        energy: hero.energy,
        effectList: hero.effectList,
        hand: battleCards.hand,
    };
};

export const mapDispatchToProps = {
    playCard,
    endTurn,
};

export const GameView = connect<BaseGameViewState, BaseGameViewDispatch>(mapStateToProps, mapDispatchToProps)(BaseGameView);
