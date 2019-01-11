import * as React from 'react';
import {PureComponent, ReactNode} from 'react';
import { Card } from 'src/GamePlay/Card';
import { CardComponent } from 'src/components/CardComponent';

export interface HandProps {
    cardList: Card[];
}

export class Hand extends PureComponent<HandProps> {
    public render(): ReactNode {
        const {
            cardList,
        } = this.props;

        return (
            <div className="hand">
                {
                    cardList.map( card => {
                        return (<CardComponent
                            title={card.title}
                            type={card.type}
                            description={card.description}
                            castList={card.castList}
                        />)
                    })
                }
            </div>
        );
    }
}