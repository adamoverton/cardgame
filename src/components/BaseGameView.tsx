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
    maxHp: number;
    energy: number;
    effectList: StatusEffect[];
    hand: Card[];
    playCard: () => void;
    endTurn: () => void;
}

export interface BaseGameViewDispatch extends Pick<BaseGameViewProps,
"playCard" | "endTurn">{}

export interface BaseGameViewState extends Pick<BaseGameViewProps,
"hp" |
"maxHp" |
"energy" |
"effectList" |
"hand">{}

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    
    public render(): ReactNode {
        const {
            hp,
            maxHp,
            energy,
            effectList,
            playCard,
            endTurn,
            hand,
        } = this.props;

        return (
            <div className="gameView">
                <Hp hp={hp} maxHp={maxHp}/>
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