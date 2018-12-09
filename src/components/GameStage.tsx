import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Enemy, StoreState } from 'src/types/StoreState';
import { EnemyList } from 'src/components/EnemyList';
import { connect } from 'react-redux';

export interface GameStageProps {
    enemies: Enemy[];
}

class BaseGameStage extends PureComponent<GameStageProps> {
    public render(): ReactNode {
        const {enemies} = this.props;

        return (
            <div className="gameStage">
                <div className="heroList"><div className="player"></div></div>
                <EnemyList enemies={enemies}></EnemyList>
                <div className="enemies"></div>
            </div>
        );
    }
}

export const mapStateToProps = ({enemyList}: StoreState) => {
    return {
        enemies: enemyList,
    };
};

export const GameStage = connect(mapStateToProps, undefined)(BaseGameStage);