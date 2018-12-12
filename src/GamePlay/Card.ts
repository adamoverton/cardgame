import { Cast } from 'src/GamePlay/Effect';

//
// Note: If you want to have 4 block next turn, you apply a status effect that 
// casts another status effect when the right time arrives
//

export enum CardType {
    Attack,
    Skill,
    Power
}

//
// A card is a list of casts, that might result in status effects.
// Attack StatusEffect: Health, magnitude: -6
// Block StatusEffect: Block, magnitude: 5
// Repair StatusEffect: Repair, magnitude: 7
//
// Ultimately we should read these in from a json file at run time
//
export interface Card {
    title: string;
    type: CardType;
    description: string;
    castList: Cast[];
}
