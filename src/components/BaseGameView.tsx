import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { GameStage } from 'src/components/GameStage';
import { Hp } from 'src/containers/Hp';

export interface BaseGameViewProps {
    playCard: () => void;
    endTurn: () => void;
}

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    
    public render(): ReactNode {
        const {
            playCard,
            endTurn,
        } = this.props;

        return (
            <div className="gameView">
                <Hp />
                <GameStage />
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