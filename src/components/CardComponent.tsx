import * as React from 'react';
import { PureComponent, ReactNode } from 'react';
import { Card } from 'src/models/Card';
import { kHeroId } from "src/models/Entity";
import 'src/components/CardComponent.scss';

export interface CardComponentProps {
    card: Card;
    playCard: (card: Card, sourceId: string, targetId: string) => void;
}

export class CardComponent extends PureComponent<CardComponentProps> {
    onclick = () => {
        this.props.playCard(this.props.card, kHeroId, "enemy1");
    };

    render(): ReactNode {
        const {
            title,
            description,
            castList,
            energyCost,
        } = this.props.card;

        return (
            <div className="card" onClick={this.onclick}>
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