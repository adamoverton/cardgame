import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Enemy } from 'src/types/StoreState';

export interface EnemyListProps {
    enemies: Enemy[];
}

export class EnemyList extends PureComponent<EnemyListProps> {
    private renderEnemy(enemy: Enemy): ReactNode {
        return <div className="enemy" key={enemy.id}>
            <div>name: {enemy.id}</div>
            <div>hp: {enemy.hp} / {enemy.maxHp}</div>
        </div>
    }

    public render(): ReactNode {
        const {enemies} = this.props;

        return (
            <div className="enemyList">
                {enemies.map(this.renderEnemy)}
            </div>
        );
    }
}