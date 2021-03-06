import { Terminal } from "malwoden";
import { getNewLevel } from "./level";
import { RenderSystem } from "./systems/RenderSystem";
import { InputSystem } from "./systems/InputSystem";
import { MovementSystem } from "./systems/MovementSystem";

// Globals
let terminal: Terminal.RetroTerminal = undefined;
let mapTerminal: Terminal.PortTerminal = undefined;

const map_width = 52;
const map_height = 38;

let level = getNewLevel(map_width, map_height);

let logs: string[] = [];

function addLog(txt: string) {
  logs.push(txt);
  while (logs.length > 5) logs.shift();
}

// Systems
const renderSystem = new RenderSystem();
const inputSystem = new InputSystem();
const movementSystem = new MovementSystem();

export function init(term: Terminal.RetroTerminal) {
  terminal = term;
  mapTerminal = terminal.port({ x: 17, y: 1 }, map_width, map_height);
}

export function loop() {
  inputSystem.loop(level);
  movementSystem.loop(level);
  renderSystem.loop({
    level,
    mapTerminal,
    terminal,
    logs,
  });
}
