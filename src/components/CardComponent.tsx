import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { Card } from 'src/models/Card';
import 'src/components/CardComponent.scss';
import { connect } from "react-redux";
import { SetActiveCard } from "src/redux/TargetingActions";
import { Dispatch } from "redoodle";

export interface CardComponentOwnProps {
    card: Card;
}

export interface CardComponentDispatch {
    setActiveCard: (activeCard: Card | undefined) => void;
}

type BaseCardComponentProps = CardComponentOwnProps & CardComponentDispatch

export class BaseCardComponent extends PureComponent<BaseCardComponentProps> {

    handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
        event.stopPropagation();
        // set this card to be the active one
        this.props.setActiveCard(this.props.card);
    };

    preventMouseUpPropagation = (event: React.MouseEvent | React.TouchEvent) => {
        // Because we have a onMouseUp handler on the GameView that removes targeting information if it's invoked,
        // and we want to support clicking on card/entity instead of forcing everyone to drag cards, we need this.
        // The problem is that clicking triggers a mouseDown *and* mouseUp event, so if we don't preventDefault,
        // GameView will get the mouseUp event and will reset the target.
        event.stopPropagation();
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
                 onMouseUp={this.preventMouseUpPropagation}
                 onTouchEnd={this.preventMouseUpPropagation}
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
        setActiveCard: (activeCard: Card | undefined) => dispatch(SetActiveCard.create({
            activeCard,
        })),
    };
};

export const CardComponent = connect<null, CardComponentDispatch>(null, mapDispatchToProps)(BaseCardComponent);