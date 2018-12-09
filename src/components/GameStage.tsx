import * as React from 'react';
import {PureComponent, ReactNode} from 'react';

export interface GameStageProps {
}

export class GameStage extends PureComponent<GameStageProps> {
    public render(): ReactNode {

        return (
            <div className="gameStage">
                <div className="player"></div>
                <div className="enemy"></div>
            </div>
        );
    }
}