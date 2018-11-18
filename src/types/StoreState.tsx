export enum Timing {
    Immediate, 
    TurnStart, 
    TurnEnd,
}

export enum TargetType {
    Self,
    Targetted,
    RandomEnemy,
    AllEnemy,
}

export interface BuffInfo {
    id: number;
    name: string;
    description: string;
}

export const BuffDefinitions: BuffInfo[] = [
    {
        id: 0,
        name: "Damage",
        description: "Energy at start of turn",
    },
    {
        id: 1,
        name: "BerserkEnergy",
        description: "Energy at start of turn",
    },
    {
        id: 2,
        name: "Vulnerable",
        description: "Vulnerable increases attack damage by 50% for __ turns",
    }
];

export interface Buff {
    id: number;
    name: string;
    value: number; // how much and how long, all in one!
}

export interface BuffCard {
    target: TargetType;
    timing: Timing;
}

export interface Hero {
    hp: number;
    maxHp: number;
    buffList: Buff[];
    // relicList: Relic[];
}

export interface Enemy {
    hp: number;
    maxHp: number;
    buffList: Buff[];
}

export interface StoreState {
    hp: number;
}
