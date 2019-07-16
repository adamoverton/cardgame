import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Enemy } from 'src/types/StoreState';
import { PureEntity } from './Entity';

export interface EnemyListProps {
    enemies: Enemy[];
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
    
    private renderEnemy = (enemy: Enemy): ReactNode => {
        return <PureEntity entity={enemy} showHp = {true}/>;
    };
}
