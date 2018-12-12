import { connect } from 'react-redux';
import { BaseGameView } from 'src/components/BaseGameView';
import { StoreState } from 'src/types/StoreState';
import 'src/components/GameView.css';
import { playCard, endTurn } from 'src/actions/Turn';

export const mapStateToProps = ({hero}: StoreState) => {
    return {
        hp: hero.hp,
        buffs: hero.effectList,
    };
};

export const mapDispatchToProps = {
    playCard,
    endTurn,
};

export const GameView = connect(mapStateToProps, mapDispatchToProps)(BaseGameView);
