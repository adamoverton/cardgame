import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { GameStage } from 'src/containers/GameStage';
import { Hp } from 'src/components/Hp';
import { StatusEffect } from 'src/GamePlay/Effect';
import { EffectList } from 'src/components/EffectList';
import { Energy } from 'src/components/Energy';
import { Card } from 'src/GamePlay/Card';
import { Hand } from 'src/components/Hand';

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
            effectList,
            playCard,
            endTurn,
            hand,
        } = this.props;

        return (
            <div className="gameView">
                <Hp hp={hp} maxHp={maxHp}/>
                <Energy energy={energy} maxEnergy={maxEnergy}/>
                <EffectList effectList={effectList}/>
                <GameStage />
                <Hand
                    playCard={playCard}
                    cardList={hand}
                />
                <div
                    className="endTurn"
                    onClick={endTurn}
                >
                    End Turn
                </div>
            </div>
        );
    }
}