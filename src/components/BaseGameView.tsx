import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { GameStage } from 'src/components/GameStage';
import { Hp } from 'src/containers/Hp';

export interface BaseGameViewProps {
    playCard: () => void;
}

export class BaseGameView extends PureComponent<BaseGameViewProps> {
    
    public render(): ReactNode {
        const {
            playCard,
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
            </div>
        );
    }
}