import * as React from 'react';
import {PureComponent, ReactNode} from 'react';

export interface EnergyProps {
    energy: number;
}

export class Energy extends PureComponent<EnergyProps> {
    public render(): ReactNode {
        const {
            energy = 3,
        } = this.props;

        return (
            <div className="energy">
                Energy: {energy}
            </div>
        );
    }
}