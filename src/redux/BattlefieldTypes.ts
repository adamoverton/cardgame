import { defaultEntityStore } from 'src/redux/EntityTypes';

export enum Terrain {
    Empty = 1,
    Mud,
    Blocked,
}

export interface BattlefieldTile {
    terrain: Terrain;
    entityId: string;
}

const defaultBattlefieldSize = {
    width: 10,
    height: 10,
}

export interface BattlefieldStore {
    // Meta battlefield stuff

    // Battlefield tiles
    grid: BattlefieldTile[][];
}

export const createDefaultBattlefieldStore = (): BattlefieldStore => {
    const battlefieldStore: BattlefieldStore = { grid: [[]] };

    let col: number;

    // Create the array of columns, each an array of pathHelpers
    battlefieldStore.grid = new Array<BattlefieldTile[]>(defaultBattlefieldSize.width);

    // For each of those columns, create an array to represent one pathHelper for each row
    for (col = 0; col < defaultBattlefieldSize.width; col++) {
        battlefieldStore.grid[col] = new Array<BattlefieldTile>(defaultBattlefieldSize.height);
    }

    // Create empty battlefield
    for (col = 0; col < defaultBattlefieldSize.width; col++) {
        for (let row: number = 0; row < defaultBattlefieldSize.height; row++) {
            battlefieldStore.grid[col][row] = {
                terrain: Terrain.Empty,
                entityId: "",
            };
        }
    }

    // Make one row be mud for the funsies
    for (col = 0; col < defaultBattlefieldSize.width; col++) {
        battlefieldStore.grid[col][5] = {
            terrain: Terrain.Mud,
            entityId: "",
        }
    }

    // It's not ideal for BattlefieldTypes to know about entities, but we are choosing to double bookkeep, so tough tooties
    // We could let the store state and reducers fully initialize, and then add these cross referenced bits using the reducers
    // Let's do that once we have some kind of StartLevel function. It'll read it all from JSON and be genius 
    Object.values(defaultEntityStore.entityList).forEach(entity => {
        battlefieldStore.grid[entity.x][entity.y].entityId = entity.id;
    });

    return battlefieldStore;
}
