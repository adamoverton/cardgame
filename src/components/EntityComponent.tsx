import * as React from 'react';
import { Component, ReactNode } from 'react';
import { EffectList } from './EffectList';
import { Entity } from "src/models/Entity";
import { Dispatch } from "redoodle";
import { connect } from "react-redux";
import { SetTargetedEntityId } from "src/redux/TargetingActions";
import { playActiveCard } from "src/redux/MiscThunks";

export interface EntityComponentOwnProps {
    entity: Entity;
    showHp: boolean;
    additionalClass?: string;
}

export interface EntityComponentDispatchProps {
    setTargetedEntityId: (entityId: string) => void;
    playActiveCard: () => void;
}

type BaseEntityComponentProps = EntityComponentOwnProps & EntityComponentDispatchProps

export class BaseEntityComponent extends Component<BaseEntityComponentProps> {
    handleDragEnd = () => {
        this.props.setTargetedEntityId(this.props.entity.id);
        this.props.playActiveCard();
    };

    render = (): ReactNode => {
        const className = this.props.additionalClass ? "entity " + this.props.additionalClass : "entity";
        return <div
            className={className}
            key={this.props.entity.id}
            onMouseUp={this.handleDragEnd}
            onTouchEnd={this.handleDragEnd}
        >
            <div className="highlight">{this.props.entity.id}</div>
            {this.props.showHp ? <div className="highlight">HP: {this.props.entity.hp} / {this.props.entity.maxHp}</div> : undefined}
            <EffectList  effectList={this.props.entity.effectList}/>
        </div>
    };
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setTargetedEntityId: (entityId: string) => dispatch(SetTargetedEntityId.create({
            entityId,
        })),
        playActiveCard: () => dispatch(playActiveCard() as any),
    };
};

export const EntityComponent = connect<null, EntityComponentDispatchProps>(null, mapDispatchToProps)(BaseEntityComponent);
