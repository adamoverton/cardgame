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

export enum BuffName {
    BerserkEnergy = "BerserkEnergy",
    Vulnerable = "Vulnerable",
}

export interface BuffDef {
    title: string;
    description: string;
    // image: string; // the image to show below the character
}

// So, this map has some weird syntax. I went with it over a standard object so that I could ensure that each of the
// keys existed in the BuffName array. Otherwise when we ask for a buff from the buff dictionary, any key that is a
// string would compile.
export const BuffDefs = new Map<BuffName, BuffDef>([
    [BuffName.BerserkEnergy, {
        title: 'Berserk Energy',
        description: 'Energy at start of turn',
    }],
    [BuffName.Vulnerable, {
        title: 'Vulnerable',
        description: 'Vulnerable increases attack damage by 50% for __ turns',
    }],
]);

export interface BuffCard {
    target: TargetType;
    timing: Timing;
    buffName: BuffName;
}

export interface Buff {
    name: BuffName;
    value: number; // how much and how long, all in one!
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
    hero: Hero,
    enemy: Enemy,
}
