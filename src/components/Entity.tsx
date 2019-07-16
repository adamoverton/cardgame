import * as React from 'react';
import {Component, ReactNode} from 'react';
import { Entity } from 'src/types/StoreState';

import { EffectList } from './EffectList';

export interface EntityProps {
    entity: Entity;
    showHp: boolean;
    additionalClass?: string;
}

export class PureEntity extends Component<EntityProps> {
    render = (): ReactNode => {
        const className = this.props.additionalClass ? "entity " + this.props.additionalClass : "entity";
        return <div className={className} key={this.props.entity.id}>
            <div className="highlight">{this.props.entity.id}</div>
            {this.props.showHp ? <div className="highlight">HP: {this.props.entity.hp} / {this.props.entity.maxHp}</div> : undefined}
            <EffectList  effectList={this.props.entity.effectList}/>
        </div>
    };
}
