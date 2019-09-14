import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { Card } from 'src/models/Card';
import 'src/components/CardComponent.scss';
import { connect } from "react-redux";
import { SetActiveCard } from "src/redux/TargetingActions";
import { Dispatch } from "redoodle";

export interface CardComponentOwnProps {
    card: Card;
    playCard: (card: Card, sourceId: string, targetId: string) => void;
}

export interface CardComponentDispatch {
    setActiveCard: (activeCard: Card) => void;
}

type BaseCardComponentProps = CardComponentOwnProps & CardComponentDispatch

export class BaseCardComponent extends PureComponent<BaseCardComponentProps> {

    handleDragStart = () => {
        // set this card to be the active one
        this.props.setActiveCard(this.props.card);
    };

    render(): ReactNode {
        const {
            title,
            description,
            castList,
            energyCost,
        } = this.props.card;

        return (
            <div className="card"
                 onMouseDown={this.handleDragStart}
                 onTouchStart={this.handleDragStart}
            >
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="castList">
                    {castList.map(cast => {
                        return (<div key={cast.effect}>{cast.magnitude} {cast.effect}</div>)
                    })}
                </div>    
                <div className="energyCost">{energyCost} Energy</div>
            </div>
        );
    }
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        setActiveCard: (activeCard: Card) => dispatch(SetActiveCard.create({
            activeCard: activeCard,
        })),
    };
};

export const CardComponent = connect<null, CardComponentDispatch>(null, mapDispatchToProps)(BaseCardComponent);