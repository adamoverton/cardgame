import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import {CardType, Cast} from 'src/GamePlay/Card';

export interface CardComponentProps {
    title: string;
    type: CardType;
    description: string;
    castList: Cast[];
    playCard: (castList: Cast[], targetId: string) => void;
}

export class CardComponent extends PureComponent<CardComponentProps> {
    onclick = () => {
        this.props.playCard(this.props.castList, "enemy1");
    }

    render(): ReactNode {
        const {
            title,
            description,
            castList,
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
            </div>
        );
    }
}