import * as React from 'react';
import {PureComponent, ReactNode} from 'react';

export interface HpProps {
    hp: number;
    maxHp: number;
}

export class Hp extends PureComponent<HpProps> {
    public render(): ReactNode {
        const {
            hp,
            maxHp,
        } = this.props;

        return (
            <div className="hp">
                HP: {hp} / {maxHp}
            </div>
        );
    }
}