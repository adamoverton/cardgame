import { TargetType } from 'src/models/Effect';
import { EffectName } from "src/models/Effect";
import { Card, CardType } from "src/models/Card";

export enum CardName {
    Bash = "Bash",
    Strike = "Strike",
    Defend = "Defend",
    Inflame = "Inflame",
    Uppercut = "Uppercut",
    BlockTest = "BlockTest",
    // Enemy cards
    Chomp = "Chomp",
    Thrash = "Thrash",
    Bellow = "Bellow",
}

/**
 * A list of card definitions
 */
export const CardDefinitions = new Map<CardName, Card>([
    [CardName.Bash, {
        id: 0,
        title: "Bash",
        type: CardType.Attack,
        description: "",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targeted,
            magnitude: 8,
        }, {
            effect: EffectName.Vulnerable,
            target: TargetType.Targeted,
            magnitude: 2,
        }],
        energyCost: 2,
        targeted: true,
    }],
    [CardName.Strike, {
        id: 0,
        title: "Strike",
        type: CardType.Attack,
        description: "I attack you",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targeted,
            magnitude: 6,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Defend, {
        id: 0,
        title: "Defend",
        type: CardType.Skill,
        description: "I block me",
        castList: [{
            effect: EffectName.Block,
            target: TargetType.Self,
            magnitude: 5,
        }],
        energyCost: 1,
        targeted: false,
    }],
    [CardName.BlockTest, {
        id: 0,
        title: "Block Test",
        type: CardType.Skill,
        description: "I block for you?",
        castList: [{
            effect: EffectName.Block,
            target: TargetType.Targeted,
            magnitude: 8,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Inflame, {
        id: 0,
        title: "Inflame",
        type: CardType.Skill,
        description: "Gain strength",
        castList: [{
            effect: EffectName.Strength,
            target: TargetType.Self,
            magnitude: 2,
        }],
        energyCost: 1,
        targeted: false,
    }],
    [CardName.Uppercut, {
        id: 0,
        title: "Uppercut",
        type: CardType.Attack,
        description: "Deals damage and applies weak to the target",
        castList: [{
            effect: EffectName.Weak,
            target: TargetType.Targeted,
            magnitude: 1,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Chomp, {
        id: 0,
        title: "Chomp",
        type: CardType.Attack,
        description: "Chomp",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targeted,
            magnitude: 11,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Thrash, {
        id: 0,
        title: "Thrash",
        type: CardType.Attack,
        description: "Thrash",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targeted,
            magnitude: 7,
        }, {
            effect: EffectName.Block,
            target: TargetType.Self,
            magnitude: 5,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Bellow, {
        id: 0,
        title: "Bellow",
        type: CardType.Skill,
        description: "Bellow",
        castList: [{
            effect: EffectName.Strength,
            target: TargetType.Self,
            magnitude: 3,
        }, {
            effect: EffectName.Block,
            target: TargetType.Self,
            magnitude: 6,
        }],
        energyCost: 1,
        targeted: true,
    }],
]);
