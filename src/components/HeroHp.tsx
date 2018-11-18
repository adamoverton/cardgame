import * as React from 'react';
import './HeroHp.css';

export interface Props {
    hp?: number;
    onIncrement?: () => void;
    onDecrement?: () => void;
  }

export function HeroHp({ hp = 50, onIncrement, onDecrement }: Props) {
    return (
      <div className="heroHp">
        <div className="greeting">
          { hp }
        </div>
        <div>
          <button onClick={onDecrement}>-</button>
          <button onClick={onIncrement}>+</button>
        </div>
      </div>
    );
  }