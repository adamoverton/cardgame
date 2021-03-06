import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { EntityComponent } from './EntityComponent';
import { Entity } from "src/models/Entity";

export interface EnemyListProps {
    enemies: Entity[];
}

export class EnemyList extends PureComponent<EnemyListProps> {
    render = (): ReactNode => {
        const {enemies} = this.props;

        return (
            <div className="enemyList">
                {enemies.map(this.renderEnemy)}
            </div>
        );
    };
    
    private renderEnemy = (enemy: Entity): ReactNode => {
        return ( 
            <div className="entityCard" key={enemy.id}>
                <EntityComponent entity={enemy} showHp={true}/>
            </div>);
    };
}
