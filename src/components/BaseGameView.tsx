import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { GameStage } from 'src/components/GameStage';
import { Hp } from 'src/components/Hp';
import { StatusEffect } from 'src/GamePlay/Effect';
import { EffectList } from 'src/components/EffectList';
import { Energy } from 'src/components/Energy';
import { Card } from 'src/GamePlay/Card';
import { Hand } from 'src/components/Hand';

export interface BaseGameViewProps {
    hp: number;
    energy: number;
    effectList: StatusEffect[];
    hand: Card[];
    playCard: () => void;
    endTurn: () => void;
}

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    
    public render(): ReactNode {
        const {
            hp,
            energy,
            effectList,
            playCard,
            endTurn,
            hand,
        } = this.props;

        return (
            <div className="gameView">
                <Hp hp={hp} />
                <Energy energy={energy} />
                <EffectList effectList={effectList}/>
                <GameStage />
                <Hand cardList={hand}/>
                <div
                    className="playCard"
                    onClick={playCard}
                >
                    Play Card
                </div>
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