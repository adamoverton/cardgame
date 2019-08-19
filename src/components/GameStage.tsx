import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { StoreState } from 'src/redux/StoreState';
import { EnemyList } from 'src/components/EnemyList';
import { connect } from 'react-redux';
import { PureEntity } from 'src/components/Entity';
import { Enemy, Entity } from "src/models/Entity";
import 'src/components/GameStage.scss';

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

export const mapStateToProps = ({entity: {hero, enemyList}}: StoreState) => {
    return {
        hero,
        enemies: enemyList,
    };
};

export const GameStage = connect(mapStateToProps, undefined)(BaseGameStage);