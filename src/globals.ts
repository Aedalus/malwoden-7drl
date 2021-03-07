import { Entity } from "./entities";
import { getNewLevel } from "./level";

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

export const map_width = 52;
export const map_height = 38;

export const state = {
  // The current level 'depth'
  levelCount: 1,
  // Stores the current level
  level: getNewLevel(map_width, map_height, true),
  // Allows quick lookup of entities. Should not be changed
  // Outside the cache system
  posCache: new Map<string, Entity[]>(),
};