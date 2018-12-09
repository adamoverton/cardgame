import * as React from 'react';
import {PureComponent, ReactNode} from 'react';

export interface BaseHpProps {
    hp: number;
}

export class BaseHp extends PureComponent<BaseHpProps> {
    public render(): ReactNode {
        const {
            hp = 50,
        } = this.props;

        return (
            <div className="heroHp">
                HP: {hp}
            </div>
        );
    }
}