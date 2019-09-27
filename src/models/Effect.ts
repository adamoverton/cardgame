import { AttackStep } from "src/redux/MiscThunks";
import { ThunkType } from "src/redux/StoreState";
import { Entity } from "src/models/Entity";

export enum Timing {
    Never, // For resetTiming
    Immediate,
    TurnStart,
    TurnEnd,
}

export enum TargetType {
    Self,
    Targeted,
    RandomEnemy,
    AllEnemy,
}

// Effects are statuses that are applied AND might reside to do something under certain circumstances
export enum EffectName {
    Attack = "Attack", // Applies immediately, does not reside
    Heal = "Heal", // Applies immediately, does not reside
    BerserkEnergy = "BerserkEnergy", // Applies a buff that adds energy at the start of turn
    Block = "Block", // Applies a buff that reduces incoming damage
    Vulnerable = "Vulnerable", // Increases the damage taken by a percentage
    Frail = "Frail", // Reduces the amount of block you apply by a percentage
    Strength = "Strength", // Increases the amount of damage given by a flat amount
    Poison = "Poison", // Deal damage equal to the amount of Poison, subtract 1 from Poison stacks
    Weak = "Weak", // Reduces the amount of damage given by a percentage
    Regeneration = "Regeneration", // Restore health equal to the amount of Regeneration, subtract 1 from Regeneration stacks
}

export interface Effect {
    title: string;
    description: string;
    // image: string; // the image to show below the character
    decoratorPriority?: number;
    applySourceAttackDecorator?: (cast: AttackStep, statusEffect: StatusEffect) => AttackStep;
    applyTargetAttackDecorator?: (cast: AttackStep, statusEffect: StatusEffect) => AttackStep;
    onStartTurnUpkeep?: (entity: Entity, statusEffect: StatusEffect) => ThunkType;
    autoDecrementAfterUpkeep?: boolean;
}

// A status effect is the ongoing amount a thing has
// I might have 5 block, perhaps because of Iron Wave
// Or maybe I have 3 because fuck frail
export interface StatusEffect {
    name: EffectName;
    magnitude: number;
}
