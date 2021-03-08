import { Terminal } from "malwoden";
import { RenderSystem } from "./systems/RenderSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { Log } from "./logs";
import { GameState } from "./globals";
import { AISystem } from "./systems/AISystem";
import { StairSystem } from "./systems/StairSystem";
import { CacheSystem } from "./systems/CacheSystem";
import { CombatSystem } from "./systems/CombatSystem"

import { map_width, map_height, state } from "./globals";

// Globals
let terminal: Terminal.RetroTerminal;
let mapTerminal: Terminal.PortTerminal;

// Systems
const renderSystem = new RenderSystem();
const inputSystem = new InputSystem();
const movementSystem = new MovementSystem();
const aiSystem = new AISystem();
const stairSystem = new StairSystem();
const cacheSystem = new CacheSystem();
const combatSystem = new CombatSystem();

let currentGameState = GameState.GAME_START;

export function init(term: Terminal.RetroTerminal) {
  terminal = term;
  mapTerminal = terminal.port({ x: 17, y: 1 }, map_width, map_height);

  Log.addEntry("Game Start!");

  // Render once to start
  renderSystem.loop({
    level: state.level,
    mapTerminal,
    terminal,
  });
}

export function loop() {
  // Cache System should always run first to build up cache
  cacheSystem.loop();

  // Input System
  if (currentGameState === GameState.AWAITING_INPUT) {
    const wasInput = inputSystem.loop(state.level);
    if (wasInput) currentGameState = GameState.PLAYER_TURN;
  }

  // Logic Systems
  movementSystem.loop(state.level);
  stairSystem.loop(state.level);

  if (currentGameState === GameState.ENEMY_TURN) {
    aiSystem.loop(state.level);
  }

  // Transition between needed states
  // Keep logic above, this is just for automatic
  // transitions between states
  if (currentGameState === GameState.GAME_START) {
    currentGameState = GameState.AWAITING_INPUT;
  } else if (currentGameState === GameState.PLAYER_TURN) {
    Log.addEntry("Player Turn!");
    currentGameState = GameState.ENEMY_TURN;
  } else if (currentGameState === GameState.ENEMY_TURN) {
    currentGameState = GameState.AWAITING_INPUT;
  }

  // Render comes very last
  renderSystem.loop({
    level: state.level,
    mapTerminal,
    terminal,
  });
}
