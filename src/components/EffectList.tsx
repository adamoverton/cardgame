import { StatusEffect, statusEffectListToSortedEffectList } from 'src/GamePlay/Effect';
import { PureComponent, ReactNode } from 'react';
import * as React from 'react';

export interface EffectListProps {
    effectList: StatusEffect[];
}

export class EffectList extends PureComponent<EffectListProps> {
    
    render(): ReactNode {
        const effectTupleList = statusEffectListToSortedEffectList(this.props.effectList);
        return (
            <div className="effectList">
                {effectTupleList.map(element => {
                    return (<> {element.statusEffect.magnitude} {element.statusEffect.name} </>)
                    })
                }
            </div>
        );
    }
}
