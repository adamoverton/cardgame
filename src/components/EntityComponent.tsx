import * as React from 'react';
import { Component, ReactNode } from 'react';
import { EffectList } from './EffectList';
import { Entity, kHeroId } from "src/models/Entity";
import { Dispatch } from "redoodle";
import { connect } from "react-redux";
import { SetTargetedEntityId } from "src/redux/TargetingActions";
import { playActiveCard } from "src/redux/MiscThunks";
import { Cast } from 'src/models/Card';

export interface EntityComponentOwnProps {
    entity: Entity;
    showHp: boolean;
    additionalClass?: string;
    smallDisplay?: boolean;
}

export interface EntityComponentDispatchProps {
    setTargetedEntityId: (entityId: string | undefined) => void;
    playActiveCard: () => void;
}

type BaseEntityComponentProps = EntityComponentOwnProps & EntityComponentDispatchProps

export class BaseEntityComponent extends Component<BaseEntityComponentProps> {
    handleDragEnd = () => {
        // Only enemies may be targeted with a card
        if (this.props.entity.id !== kHeroId) {
            // Set the target
            this.props.setTargetedEntityId(this.props.entity.id);

            // Now that we have the target (and assuming we previously set the active card), try to play the active card
            this.props.playActiveCard();
        }
    };

    render = (): ReactNode => {
        const className = this.props.additionalClass ? "entity " + this.props.additionalClass : "entity";
        let castList: Cast[] = [];
        const { smallDisplay } =  this.props;

        // Show enemy intents
        if (this.props.entity.id !== kHeroId && !smallDisplay) {
            castList = this.props.entity.deck.battleCards.hand[0].castList;
        } 
        let name = this.props.entity.id;
        const shortName = name.split(/\s/).reduce((response, word)=> response += word.slice(0, 1), '')
        let hpText = "HP: ";

        if (smallDisplay) {
            name =  shortName;
            hpText = "";
        }

        return <div
            className={className}
            key={this.props.entity.id}
            onMouseUp={this.handleDragEnd}
            onTouchEnd={this.handleDragEnd}
        >
                <div className="castList">
                    { castList.map(cast => {
                        return (<div key={cast.effect}>{cast.magnitude} {cast.effect}</div>)
                    })}
                </div>   
            <div className="highlight">{name}</div>
            {this.props.showHp ? <div className="highlight">{hpText}{this.props.entity.hp} / {this.props.entity.maxHp}</div> : undefined}
            <EffectList effectList={this.props.entity.effectList}/>
        </div>
    };
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setTargetedEntityId: (entityId: string | undefined) => dispatch(SetTargetedEntityId.create({
            entityId,
        })),
        playActiveCard: () => dispatch(playActiveCard() as any),
    };
};

export const EntityComponent = connect<null, EntityComponentDispatchProps>(null, mapDispatchToProps)(BaseEntityComponent);
