import { Terminal } from "malwoden";
import { RenderSystem } from "./systems/RenderSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { Log } from "./logs";
import { GameState } from "./globals";
import { AISystem } from "./systems/AISystem";
import { StairSystem } from "./systems/StairSystem";
import { CacheSystem } from "./systems/CacheSystem";
import { CombatSystem } from "./systems/CombatSystem";
import { map_height, map_width } from "./stage";
import { state } from "./globals";
import { ViewSystem } from "./systems/ViewSystem";
import { LevelSystem } from "./systems/levelSystem";
import { ConsumableSystem } from "./systems/ConsumableSystem";

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
const viewSystem = new ViewSystem();
const combatSystem = new CombatSystem();
const levelSystem = new LevelSystem();
const consumableSystem = new ConsumableSystem();

export function init(term: Terminal.RetroTerminal) {
  terminal = term;
  mapTerminal = terminal.port({ x: 17, y: 1 }, map_width, map_height);

  Log.addEntryHigh("Game Start!");

  // Render once to start
  renderSystem.loop({
    stage: state.stage,
    mapTerminal,
    terminal,
  });
}

export function loop() {
  // Cache System should always run first to build up cache
  cacheSystem.loop();

  if (
    state.currentGameState === GameState.GAME_WIN ||
    state.currentGameState === GameState.GAME_LOSS
  ) {
    // Input, render, return
    inputSystem.loop(state.stage);
    renderSystem.loop({
      stage: state.stage,
      mapTerminal,
      terminal,
    });
    return;
  }

  // Input System
  if (state.currentGameState === GameState.AWAITING_INPUT) {
    const wasInput = inputSystem.loop(state.stage);
    if (wasInput) state.currentGameState = GameState.PLAYER_TURN;
  }

  // Logic Systems
  movementSystem.loop(state.stage);
  consumableSystem.loop(state.stage);
  stairSystem.loop(state.stage);
  viewSystem.loop(state.stage);
  combatSystem.loop(state.stage);
  levelSystem.loop(state.stage);

  if (state.currentGameState === GameState.ENEMY_TURN) {
    aiSystem.loop(state.stage);
  }

  // Transition between needed states
  // Keep logic above, this is just for automatic
  // transitions between states
  if (state.currentGameState === GameState.GAME_START) {
    state.currentGameState = GameState.AWAITING_INPUT;
  } else if (state.currentGameState === GameState.PLAYER_TURN) {
    state.currentGameState = GameState.ENEMY_TURN;
  } else if (state.currentGameState === GameState.ENEMY_TURN) {
    state.currentGameState = GameState.AWAITING_INPUT;
  }

  // Render comes very last
  renderSystem.loop({
    stage: state.stage,
    mapTerminal,
    terminal,
  });
}
