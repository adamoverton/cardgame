import { StatusEffect } from 'src/GamePlay/Effect';
import { PureComponent, ReactNode } from 'react';
import * as React from 'react';

export interface EffectListProps {
    effectList: StatusEffect[];
}

export class EffectList extends PureComponent<EffectListProps> {
    
    public render(): ReactNode {
        const {
            effectList,
        } = this.props;

        return (
            <div className="effectList">
                {effectList.map(element => {
                    return (<> {element.magnitude} {element.name} </>)
                    })
                }
            </div>
        );
    }
}
