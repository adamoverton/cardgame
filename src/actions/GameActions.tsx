import { EffectName, StatusEffect } from 'src/GamePlay/Effect';
import { StoreState } from 'src/types/StoreState';
import { TypedAction } from "redoodle";
import { ThunkAction } from 'redux-thunk';

export const AdjustHp = TypedAction.define("gameplay::adjustHp")<{ 
    targetEntityId: string;
    hp: number;
}>();

export const AdjustEnergy = TypedAction.define("gameplay::adjustEnergy")<{
     energy: number; 
}>();

export const SetEnergy = TypedAction.define("gameplay::setEnergy")<{
    energy: number;
}>();

export const ApplyEffect  = TypedAction.define("gameplay::applyEffect")<{
    effectName: EffectName;
    targetId: string;
    magnitude: number;
}>();

export const ClearEnemies  = TypedAction.define("gameplay::clearEnemies")<{
}>();

export const AddEnemy  = TypedAction.define("gameplay::addEnemy")<{
    hp: number;
    maxHp: number;
    effectList: StatusEffect[];
}>();

export const RemoveEnemy  = TypedAction.define("gameplay::removeEnemy")<{
    id: string;
}>();

// TODO: Last any was supposed to be union of types...we don't have access to?
export type ThunkType = ThunkAction<void, StoreState, void, any>
