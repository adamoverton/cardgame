import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Card } from 'src/models/Card';
import { CardComponent } from 'src/components/CardComponent';
import 'src/components/Hand.scss';

export interface HandProps {
    cardList: Card[];
    playCard: (card: Card, sourceId: string, targetId: string) => void;
}

export class Hand extends PureComponent<HandProps> {
    render(): ReactNode {
        const {
            cardList,
            playCard,
        } = this.props;

        return (
            <div className="hand">
                {
                    cardList.map((card, index) =>
                        <div className="cardAnimationWrapper">
                            <CardComponent
                                key={card.id}
                                card={card}
                                playCard={playCard}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}