import { TypedAction } from "redoodle";
import { EffectName, StatusEffect } from "src/models/Effect";

export const AdjustHp = TypedAction.define("gameplay::adjustHp")<{
    entityId: string;
    hp: number;
}>();

export const AdjustEnergy = TypedAction.define("gameplay::adjustEnergy")<{
    entityId: string;
    energy: number;
}>();

export const SetEnergy = TypedAction.define("gameplay::setEnergy")<{
    entityId: string;
    energy: number;
}>();

export const ResetEnergy = TypedAction.define("gameplay::resetEnergy")<{
    entityId: string;
}>();

export const ApplyEffect = TypedAction.define("gameplay::applyEffect")<{
    entityId: string;
    effectName: EffectName;
    magnitude: number;
}>();

export const ClearEffect = TypedAction.define("gameplay::clearEffect")<{
    entityId: string;
    effectName: EffectName;
}>();

export const ClearEnemies = TypedAction.define("gameplay::clearEnemies")<{
}>();

export const AddEnemy = TypedAction.define("gameplay::addEnemy")<{
    hp: number;
    maxHp: number;
    effectList: StatusEffect[];
}>();

export const RemoveEntity = TypedAction.define("gameplay::removeEntity")<{
    entityId: string;
}>();

export const DeckAction = TypedAction.define("entity::deckAction")<{
    entityId: string;
    deckAction: any;
}>();
