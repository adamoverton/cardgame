import { TargetType } from 'src/models/Effect';
import { EffectName } from "src/models/Effect";
import { Card, CardType } from "src/models/Card";

export enum CardName {
    // Attacks
    Bash = "Bash",
    Bite = "Bite",
    Strike = "Strike",
    Uppercut = "Uppercut",
    // Skills
    BlockTest = "BlockTest",
    BouncingFlask = "Bouncing Flask",
    DeadlyPoison = "Deadly Poison",
    Defend = "Defend",
    Recouperate = "Recouperate",
    ShrugItOff = "Shrug It Off",
    // Powers
    Inflame = "Inflame",
    // Enemy cards
    Bellow = "Bellow",
    Chomp = "Chomp",
    Thrash = "Thrash",
}

/**
 * A list of card definitions
 */
export const CardDefinitions = new Map<CardName, Card>([
    // Player Attacks
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
    [CardName.Bite, {
        id: 0,
        title: "Bite",
        type: CardType.Attack,
        description: "Deal 7 damage, Heal 2 HP",
        castList: [{
            effect: EffectName.Attack,
            target: TargetType.Targeted,
            magnitude: 7,
        }, {
            effect: EffectName.Heal,
            target: TargetType.Self,
            magnitude: 2,
        },],
        energyCost: 1,
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
    // Player Skills
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
    [CardName.BouncingFlask, {
        id: 0,
        title: "Bouncing Flask",
        type: CardType.Skill,
        description: "Apply 3 Poison to a random Enemy 3 times",
        castList: [{
            effect: EffectName.Poison,
            target: TargetType.RandomEnemy,
            magnitude: 3,
            castCount: 3,
        }],
        energyCost: 2,
        targeted: false,
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
    [CardName.DeadlyPoison, {
        id: 0,
        title: "Deadly Poison",
        type: CardType.Skill,
        description: "Apply 5 Poison",
        castList: [{
            effect: EffectName.Poison,
            target: TargetType.Targeted,
            magnitude: 5,
        }],
        energyCost: 1,
        targeted: true,
    }],
    [CardName.Recouperate, {
        id: 0,
        title: "Recouperate",
        type: CardType.Skill,
        description: "Apply 5 Regeneration to self",
        castList: [{
            effect: EffectName.Regeneration,
            target: TargetType.Self,
            magnitude: 5,
        }],
        energyCost: 1,
        targeted: false,
    }],
    [CardName.ShrugItOff, {
        id: 0,
        title: "Shrug It Off",
        type: CardType.Skill,
        description: "Gain 8 Block, Draw 1 Card",
        castList: [{
            effect: EffectName.Block,
            target: TargetType.Self,
            magnitude: 8,
        }, {
            effect: EffectName.CardDraw,
            target: TargetType.Self,
            magnitude: 1,
        }],
        energyCost: 1,
        targeted: false,
    }],
    // Player Powers
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
    // Enemy Cards
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
]);
