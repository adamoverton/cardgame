import { connect } from 'react-redux';
import { BaseGameView } from 'src/components/BaseGameView';
import { StoreState } from 'src/types/StoreState';
import 'src/components/GameView.css';
import { playCard } from 'src/actions/Turn';

export const mapStateToProps = ({hero}: StoreState) => {
    return {
        hp: hero.hp,
        buffs: hero.buffList,
    };
};

export const mapDispatchToProps = {
    playCard,
};

export const GameView = connect(mapStateToProps, mapDispatchToProps)(BaseGameView);
