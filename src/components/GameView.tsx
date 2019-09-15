import { connect } from 'react-redux';
import { StoreState } from 'src/redux/StoreState';
import 'src/components/GameView.scss';
import { endTurn, playCard, drawCards } from 'src/redux/MiscThunks';
import { StatusEffect } from "src/models/Effect";
import { Card } from "src/models/Card";
import { PureComponent, ReactNode } from "react";
import { Hp } from "src/components/Hp";
import { Energy } from "src/components/Energy";
import { GameStage } from "src/components/GameStage";
import { Hand } from "src/components/Hand";
import * as React from "react";
import { kHeroId } from 'src/models/Entity';

export interface GameViewStateProps {
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    effectList: StatusEffect[];
    hand: Card[];
}

export interface GameViewDispatchProps {
    playCard: (card: Card, sourceId: string, targetId: string) => void;
    endTurn: () => void;
    drawInitialHand: () => void;
}

type BaseGameViewProps = GameViewStateProps & GameViewDispatchProps

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    componentDidMount() {
        this.props.drawInitialHand();
    }

    render(): ReactNode {
        const {
            hp,
            maxHp,
            energy,
            maxEnergy,
            hand,
        } = this.props;

        return (
            <div className="gameView">
                <Hp hp={hp} maxHp={maxHp}/>
                <Energy energy={energy} maxEnergy={maxEnergy}/>
                <div className="arena">
                    <GameStage />
                    <div className="foreground">
                        <Hand
                            playCard={this.props.playCard}
                            cardList={hand}
                        />
                        <div
                            className="endTurn"
                            onClick={this.props.endTurn}
                        >
                            End Turn
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

export const mapStateToProps = (store: StoreState) => {
    const hero = store.entity.entityList[kHeroId];
    const battleCards = hero.deck.battleCards;
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
    drawInitialHand: () => drawCards(kHeroId, 5),
};

export const GameView = connect<GameViewStateProps, GameViewDispatchProps>(mapStateToProps, mapDispatchToProps)(BaseGameView);
