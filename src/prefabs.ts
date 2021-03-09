import { Vector2, Glyph, CharCode, Color } from "malwoden";
import { Entity } from "./entities";

interface EntityOptions {
  position: Vector2;
}

export function getMantis(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Mantis",
    enemy: true,
    position: options.position,
    incomingDamage: [],
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Orange),
    ai: "wander",
    collision: true,
    stats: {
      hp: 3,
      maxHp: 3,
      level: 1,
      attack: 2,
      armor: 1,
      speed: 2,
      exp: 0,
    },
  };
}

export function getLadybug(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Ladybug",
    enemy: true,
    position: options.position,
    incomingDamage: [],
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.lUpper, Color.Red),
    ai: "wander",
    collision: true,
    stats: {
      hp: 1,
      maxHp: 1,
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
    id: Math.random().toString(),
    name: "Mal",
    player: true,
    position: options.position,
    incomingDamage: [],
    renderPriority: 1,
    glyph: Glyph.fromCharCode(CharCode.at, Color.Yellow),
    vision: 7,
    stats: {
      hp: 10,
      maxHp: 10,
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
    id: Math.random().toString(),
    name: "Loop",
    position: options.position,
    renderPriority: 3,
    glyph: Glyph.fromCharCode(CharCode.upwardsArrow, Color.Red),
    stairs: true,
    restart: true,
  };
}

export function getStairs(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Stairs",
    position: options.position,
    renderPriority: 3,
    glyph: Glyph.fromCharCode(CharCode.downwardsArrow, Color.Cyan),
    stairs: true,
  };
}
