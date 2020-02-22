import { Terrain } from './BattlefieldTypes';
import { TypedAction } from "redoodle";

export const SetTerrain = TypedAction.define("map::setTerrain")<{
    col: number;
    row: number;
    terrain: Terrain;
}>();

