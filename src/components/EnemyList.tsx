import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Enemy } from 'src/types/StoreState';
import { StatusEffect } from "src/GamePlay/Effect";

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
        return <div className="enemy" key={enemy.id}>
            <div>name: {enemy.id}</div>
            <div>hp: {enemy.hp} / {enemy.maxHp}</div>
            {enemy.effectList.length ? <div>EffectList: {enemy.effectList.map(this.renderEffect)}</div> : undefined}
        </div>
    };

    private renderEffect = (effect: StatusEffect): ReactNode => {
        return <div>{effect.name}: {effect.magnitude}</div>
    };
}
