import * as React from 'react';
import { PureComponent, ReactNode } from 'react';

export interface EnergyProps {
    energy: number;
    maxEnergy: number;
}

export class Energy extends PureComponent<EnergyProps> {
    render(): ReactNode {
        const {
            energy,
            maxEnergy,
        } = this.props;

        return (
            <div className="energy">
                Energy: {energy} / {maxEnergy}
            </div>
        );
    }
}