import { statusEffectListToSortedEffectList } from 'src/gameLogic/EffectDefinitions';
import { PureComponent, ReactNode } from 'react';
import * as React from 'react';
import { StatusEffect } from "src/models/Effect";

export interface EffectListProps {
    effectList: StatusEffect[];
}

export class EffectList extends PureComponent<EffectListProps> {
    
    render(): ReactNode {
        const effectTupleList = statusEffectListToSortedEffectList(this.props.effectList);
        return (
            <div className="effectList">
                {effectTupleList.map(element => this.renderEffect(element.statusEffect))}
            </div>
        );
    }
    private renderEffect = (effect: StatusEffect): ReactNode => {
        return <div>{effect.name}: {effect.magnitude}</div>
    };
}