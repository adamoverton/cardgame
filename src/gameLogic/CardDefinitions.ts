import { TargetType } from 'src/models/Effect';
import { EffectName } from "src/models/Effect";
import { Card, CardName, CardType } from "src/models/Card";

/**
 * A list of card definitions
 */
export const CardDefinitions = new Map<CardName, Card>([
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
    }],
    [CardName.Uppercut, {
        id: 0,
        title: "Uppercut",
        type: CardType.Skill,
        description: "Deals damage and applies weak to the target",
        castList: [{
            effect: EffectName.Weak,
            target: TargetType.Targeted,
            magnitude: 1,
        }],
        energyCost: 1,
    }],
]);
