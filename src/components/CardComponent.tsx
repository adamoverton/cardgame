import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import {CardType, Cast, Card} from 'src/GamePlay/Card';

export interface CardComponentProps {
    title: string;
    type: CardType;
    description: string;
    castList: Cast[];
    energyCost: number;
    playCard: (card: Card, sourceId: string, targetId: string) => void;
}

export class CardComponent extends PureComponent<CardComponentProps> {
    onclick = () => {
        const card: Card = {
            title: this.props.title,
            type: this.props.type,
            description: this.props.description,
            castList: this.props.castList,
            energyCost: this.props.energyCost,
        }
        this.props.playCard(card, "hero", "enemy1");
    }

    render(): ReactNode {
        const {
            title,
            description,
            castList,
            energyCost,
        } = this.props;

        return (
            <div className="card" onClick={this.onclick}>
                <div className="title">{title}</div>
                <div className="description">{description}</div>
                <div className="castList">
                    {castList.map(cast => {
                        return (<div>{cast.magnitude} {cast.effect}</div>)
                    })}
                </div>    
                <div className="energyCost">{energyCost} Energy</div>
            </div>
        );
    }
}