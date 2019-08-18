import { connect } from 'react-redux';
import { StoreState } from 'src/redux/StoreState';
import 'src/components/GameView.scss';
import { endTurn, playCard } from 'src/redux/MiscThunks';
import { StatusEffect } from "src/models/Effect";
import { Card } from "src/models/Card";
import { PureComponent, ReactNode } from "react";
import { Hp } from "src/components/Hp";
import { Energy } from "src/components/Energy";
import { GameStage } from "src/components/GameStage";
import { Hand } from "src/components/Hand";
import * as React from "react";

export interface BaseGameViewState {
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    effectList: StatusEffect[];
    hand: Card[];
}

export interface BaseGameViewDispatch {
    playCard: (card: Card, sourceId: string, targetId: string) => void;
    endTurn: () => void;
}

type BaseGameViewProps  = BaseGameViewState & BaseGameViewDispatch

export class BaseGameView extends PureComponent<BaseGameViewProps> {

    render(): ReactNode {
        const {
            hp,
            maxHp,
            energy,
            maxEnergy,
            playCard,
            endTurn,
            hand,
        } = this.props;

        return (
            <div className="gameView">
                <Hp hp={hp} maxHp={maxHp}/>
                <Energy energy={energy} maxEnergy={maxEnergy}/>
                <GameStage />
                <div
                    className="endTurn"
                    onClick={endTurn}
                >
                    End Turn
                </div>
                <Hand
                    playCard={playCard}
                    cardList={hand}
                />

            </div>
        );
    }
}

export const mapStateToProps = ({entity: {hero}, deck: {battleCards}}: StoreState) => {
    return {
        hp: hero.hp,
        maxHp: hero.maxHp,
        energy: hero.energy,
        maxEnergy: hero.maxEnergy,
        effectList: hero.effectList,
        hand: battleCards.hand,
    };
};

export const mapDispatchToProps = {
    playCard,
    endTurn,
};

export const GameView = connect<BaseGameViewState, BaseGameViewDispatch>(mapStateToProps, mapDispatchToProps)(BaseGameView);
