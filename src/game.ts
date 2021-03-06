import { Terminal } from "malwoden";
import { getNewLevel } from "./level";
import { RenderSystem } from "./systems/RenderSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";
import { Log } from "./logs";

// Globals
let terminal: Terminal.RetroTerminal = undefined;
let mapTerminal: Terminal.PortTerminal = undefined;

const map_width = 52;
const map_height = 38;

let level = getNewLevel(map_width, map_height);

// Systems
const renderSystem = new RenderSystem();
const inputSystem = new InputSystem();
const movementSystem = new MovementSystem();

enum GameState {
  GAME_START,
  PLAYER_TURN,
  ENEMY_TURN,
  AWAITING_INPUT,
}

let currentGameState = GameState.GAME_START;

export function init(term: Terminal.RetroTerminal) {
  terminal = term;
  mapTerminal = terminal.port({ x: 17, y: 1 }, map_width, map_height);

  Log.addEntry("Game Start!");

  // Render once to start
  renderSystem.loop({
    level,
    mapTerminal,
    terminal,
  });
}

export function loop() {
  // Input System
  if (currentGameState === GameState.AWAITING_INPUT) {
    const wasInput = inputSystem.loop(level);
    if (wasInput) currentGameState = GameState.PLAYER_TURN;
  }

  // Logic Systems
  movementSystem.loop(level);

  // Transition between needed states
  // Keep logic above, this is just for automatic
  // transitions between states
  if (currentGameState === GameState.GAME_START) {
    currentGameState = GameState.AWAITING_INPUT;
  } else if (currentGameState === GameState.PLAYER_TURN) {
    Log.addEntry("Player Turn!");
    currentGameState = GameState.ENEMY_TURN;
  } else if (currentGameState === GameState.ENEMY_TURN) {
    Log.addEntry("Enemy Turn!");
    currentGameState = GameState.AWAITING_INPUT;
  }

  // Render comes very last
  renderSystem.loop({
    level,
    mapTerminal,
    terminal,
  });
}
