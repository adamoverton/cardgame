import { connect } from 'react-redux';
import { StoreState } from 'src/redux/StoreState';
import 'src/components/GameView.scss';
import { endTurn, drawCards } from 'src/redux/MiscThunks';
import { StatusEffect } from "src/models/Effect";
import { Card } from "src/models/Card";
import { PureComponent, ReactNode } from "react";
import { Hp } from "src/components/Hp";
import { Energy } from "src/components/Energy";
import { GameStage } from "src/components/GameStage";
import { Hand } from "src/components/Hand";
import * as React from "react";
import { kHeroId } from 'src/models/Entity';
import { Dispatch } from "redoodle";
import { ClearTargetInfo } from "src/redux/TargetingActions";

export interface GameViewStateProps {
    hp: number;
    maxHp: number;
    energy: number;
    maxEnergy: number;
    effectList: StatusEffect[];
    hand: Card[];
}

export interface GameViewDispatchProps {
    clearTargetInfo: () => void;
    endTurn: () => void;
    drawInitialHand: () => void;
}

type BaseGameViewProps = GameViewStateProps & GameViewDispatchProps

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    componentDidMount() {
        this.props.drawInitialHand();
    }

    removeTargeting = () => {
        this.props.clearTargetInfo();
    };

    render(): ReactNode {
        const {
            hp,
            maxHp,
            energy,
            maxEnergy,
            hand,
        } = this.props;

        return (
            <div className="gameView"
                 onMouseUp={this.removeTargeting}
            >
                <Hp hp={hp} maxHp={maxHp}/>
                <Energy energy={energy} maxEnergy={maxEnergy}/>
                <div className="arena">
                    <GameStage />
                    <div className="foreground">
                        <Hand
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

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        clearTargetInfo: () => dispatch(ClearTargetInfo.create({})),
        endTurn: () => dispatch(endTurn() as any),
        drawInitialHand: () => dispatch(drawCards(kHeroId, 5) as any),
    };
};

export const GameView = connect<GameViewStateProps, GameViewDispatchProps>(mapStateToProps, mapDispatchToProps)(BaseGameView);
