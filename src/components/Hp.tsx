import * as React from 'react';
import {PureComponent, ReactNode} from 'react';

export interface HpProps {
    hp: number;
}

export class Hp extends PureComponent<HpProps> {
    public render(): ReactNode {
        const {
            hp = 50,
        } = this.props;

        return (
            <div className="hp">
                HP: {hp}
            </div>
        );
    }
}