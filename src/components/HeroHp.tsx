import * as React from 'react';
import 'src/components/HeroHp.css';
import {Buff, BuffDefs} from 'src/types/StoreState';
import {PureComponent, ReactNode} from 'react';

export interface HeroHpProps {
    hp: number;
    buffs: Buff[];
    onIncrement: () => void;
    onDecrement: () => void;
    onAddBuff: () => void;
}

function renderBuff(buff: Buff): ReactNode {
    return (
        <div className="buff">
            <div className="title">{BuffDefs.get(buff.name)!.title}</div>
            <div>{BuffDefs.get(buff.name)!.description}</div>
            <div>{buff.value}</div>
        </div>
    );
}

export class HeroHp extends PureComponent<HeroHpProps> {
    public render(): ReactNode {
        const {
            hp = 50,
            onIncrement,
            onDecrement,
            onAddBuff,
            buffs,
        } = this.props;

        return (
            <div className="heroHp">
                <div className="greeting">
                    {hp}
                </div>
                <div className="buffs">
                    {buffs.map(renderBuff)}
                </div>
                <div>
                    <button onClick={onDecrement}>-</button>
                    <button onClick={onIncrement}>+</button>
                </div>
                <button onClick={onAddBuff}>Add Buff</button>
            </div>
        );
    }
}