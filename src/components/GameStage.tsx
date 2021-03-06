import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { StoreState } from 'src/redux/StoreState';
import { EnemyList } from 'src/components/EnemyList';
import { connect } from 'react-redux';
import { EntityComponent } from 'src/components/EntityComponent';
import { Entity, kHeroId } from "src/models/Entity";
import 'src/components/GameStage.scss';
import { Battlefield } from "src/components/Battlefield";

export interface GameStageProps {
    hero: Entity;
    enemies: Entity[];
}

class BaseGameStage extends PureComponent<GameStageProps> {
    render(): ReactNode {
        const {hero, enemies} = this.props;

        return (
            <div className="gameStage">
                <div className="entityCard">
                    <EntityComponent showHp={false} entity={hero} additionalClass="hero"/>
                </div>
                <Battlefield />
                <EnemyList enemies={enemies}/>
            </div>
        );
    }
}

export const mapStateToProps = ({entity: { entityList: entityList}}: StoreState) => {
    const enemies = {...entityList};
    delete enemies[kHeroId];
    return {
        hero: entityList[kHeroId],
        enemies: Object.values(enemies),
    };
};

export const GameStage = connect<GameStageProps>(mapStateToProps)(BaseGameStage);