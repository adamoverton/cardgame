import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Enemy, StoreState, Entity } from 'src/types/StoreState';
import { EnemyList } from 'src/components/EnemyList';
import { connect } from 'react-redux';
import { PureEntity } from 'src/components/Entity';

export interface GameStageProps {
    hero: Entity;
    enemies: Enemy[];
}

class BaseGameStage extends PureComponent<GameStageProps> {
    render(): ReactNode {
        const {hero, enemies} = this.props;

        return (
            <div className="gameStage">
                <PureEntity showHp = {false} entity={hero} additionalClass="hero"/>
                <EnemyList enemies={enemies}/>
            </div>
        );
    }
}

export const mapStateToProps = ({hero, enemyList}: StoreState) => {
    return {
        hero,
        enemies: enemyList,
    };
};

export const GameStage = connect(mapStateToProps, undefined)(BaseGameStage);