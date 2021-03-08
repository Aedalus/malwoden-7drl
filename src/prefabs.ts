import { Vector2, Glyph, CharCode, Color } from "malwoden";
import { Entity } from "./entities";

interface EntityOptions {
  position: Vector2;
}

export function getMantis(options: EntityOptions): Entity {
  return {
    name: "Mantis",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Red),
    ai: "wander",
    collision: true,
    stats: {
      hp: 2,
      level: 1,
      attack: 2,
      armor: 1,
      speed: 2,
      exp: 0,
    },
  };
}

export function getCorpse(options: EntityOptions): Entity {
  return {
    name: "Corpse",
    enemy: false,
    position: options.position,
    renderPriority: 3,
    glyph: Glyph.fromCharCode(CharCode.space, Color.Red),
    ai: "wander",
    stats: {
      hp: 3,
      level: 1,
      attack: 2,
      armor: 1,
      speed: 2,
      exp: 0,
    },
  };
}

export function getPlayer(options: EntityOptions): Entity {
  return {
    name: "Mal",
    player: true,
    position: options.position,
    renderPriority: 1,
    glyph: Glyph.fromCharCode(CharCode.at, Color.Yellow),
    stats: {
      hp: 10,
      level: 1,
      attack: 3,
      armor: 1,
      speed: 1,
      exp: 0,
    },
  };
}

export function getRestartStairs(options: EntityOptions): Entity {
  return {
    name: "Loop",
    position: options.position,
    renderPriority: 3,
    glyph: Glyph.fromCharCode(CharCode.upwardsArrow, Color.Red),
    stairs: true,
    restart: true
  }
}

export function getStairs(options: EntityOptions): Entity {
  return {
    name: "Stairs",
    position: options.position,
    renderPriority: 3,
    glyph: Glyph.fromCharCode(CharCode.downwardsArrow, Color.Cyan),
    stairs: true,
  };
}
