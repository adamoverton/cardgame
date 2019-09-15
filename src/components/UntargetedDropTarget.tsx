import * as React from 'react';
import * as classnames from 'classnames';
import { Component, ReactNode } from 'react';
import { Dispatch } from "redoodle";
import { connect } from "react-redux";
import { playActiveCard } from "src/redux/MiscThunks";
import { StoreState } from "src/redux/StoreState";
import { Card } from "src/models/Card";

export interface UntargetedDropTargetStateProps {
    activeCard: Card | undefined;
}

export interface UntargetedDropTargetDispatchProps {
    playActiveCard: () => void;
}

type BaseUntargetedDropTargetProps = UntargetedDropTargetStateProps & UntargetedDropTargetDispatchProps

export class BaseUntargetedDropTarget extends Component<BaseUntargetedDropTargetProps> {
    handleDragEnd = () => {
        if (this.props.activeCard && !this.props.activeCard.targeted) {
            // Because this drop target only supports untargeted casts, we don't need a target and can
            // just always try to play the active card
            this.props.playActiveCard();
        }
    };

    render = (): ReactNode => {
        const { activeCard } = this.props;

        return <div
            className={classnames(
                {showDropTarget: activeCard && !activeCard.targeted},
                "untargetedDropTarget"
            )}
            onMouseUp={this.handleDragEnd}
            onTouchEnd={this.handleDragEnd}
        />
    };
}

export const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        playActiveCard: () => dispatch(playActiveCard() as any),
    };
};

export const mapStateToProps = (store: StoreState) => ({
    activeCard: store.targeting.activeCard,
});

export const UntargetedDropTarget = connect<UntargetedDropTargetStateProps, UntargetedDropTargetDispatchProps>(mapStateToProps, mapDispatchToProps)(BaseUntargetedDropTarget);
