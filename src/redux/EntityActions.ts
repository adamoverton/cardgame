import { TypedAction } from "redoodle";
import { EffectName, StatusEffect } from "src/models/Effect";

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

export const ResetEnergy = TypedAction.define("gameplay::resetEnergy")<{
}>();

export const ApplyEffect  = TypedAction.define("gameplay::applyEffect")<{
    effectName: EffectName;
    targetId: string;
    magnitude: number;
}>();

export const ClearEffect = TypedAction.define("gameplay::clearEffect")<{
    effectName: EffectName;
    targetId: string;
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