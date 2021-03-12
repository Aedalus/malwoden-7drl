import { Entity } from "./entities";
import { Stage, selectStage } from "./stage";
import { Rand } from "malwoden";

export enum GameState {
  GAME_START,
  PLAYER_TURN,
  ENEMY_TURN,
  AWAITING_INPUT,
}

export enum Direction {
  UP = "up",
  DOWN = "down",
  LEFT = "left",
  RIGHT = "right",
}
const startingStage = 1;
export const gameSeed = new Rand.AleaRNG();

interface GlobalState {
  stageCount: number;
  stage: Stage;
  posCache: Map<string, Entity[]>;
  playerCache: Entity | undefined;
  help: boolean;
}

export const state: GlobalState = {
  // The current level 'depth'
  stageCount: 1,
  // Stores the current level
  stage: selectStage(startingStage),
  // Allows quick lookup of entities.
  // Should not be changed outside the cache system
  posCache: new Map<string, Entity[]>(),
  // Allows quick lookup of player entity.
  // Should not be changed outside the cache system
  playerCache: undefined,
  // Toggle Help Screen
  help: true,
};
