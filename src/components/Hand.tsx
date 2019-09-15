import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Card } from 'src/models/Card';
import { CardComponent } from 'src/components/CardComponent';
import 'src/components/Hand.scss';

export interface HandProps {
    cardList: Card[];
}

export class Hand extends PureComponent<HandProps> {
    render(): ReactNode {
        const {
            cardList,
        } = this.props;

        return (
            <div className="hand">
                {
                    cardList.map((card, index) =>
                        <div key={card.id} className="cardAnimationWrapper">
                            <CardComponent
                                key={card.id}
                                card={card}
                            />
                        </div>
                    )
                }
            </div>
        );
    }
}