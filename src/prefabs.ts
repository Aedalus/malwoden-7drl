import { Vector2, Glyph, CharCode, Color, Rand } from "malwoden";
import { Entity } from "./entities";

const rng = new Rand.AleaRNG();

interface EntityOptions {
  position: Vector2;
}

export function getBird(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Bird",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.rightwardsArrow, Color.Orange),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 10,
      maxHp: 10,
      level: 1,
      attack: 4,
      armor: 0,
      exp: 0,
    },
  };
}

export function getMantis(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Mantis",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Orange),
    // glyph: Glyph.fromCharCode(CharCode.squareRoot, Color.AliceBlue),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 3,
      maxHp: 3,
      level: 1,
      attack: 3,
      armor: 2,
      exp: 20,
    },
  };
}

export function getWeasle(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Wealse",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    //glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Orange),
    glyph: Glyph.fromCharCode(CharCode.squareRoot, Color.AliceBlue),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 17,
      maxHp: 17,
      level: 1,
      attack: 8,
      armor: 3,
      exp: 0,
    },
  };
}

export function getScorpion(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    //a boss
    name: "Scorpion",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    //glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Orange),
    glyph: Glyph.fromCharCode(CharCode.poundSign, Color.AliceBlue),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 10,
      maxHp: 10,
      level: 1,
      attack: 6,
      armor: 3,
      exp: 50,
    },
  };
}

export function getAnts(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Ants",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    //glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Orange),
    glyph: Glyph.fromCharCode(CharCode.caret, Color.AliceBlue),
    ai: "wander",
    collision: true,
    vision: 6,
    stats: {
      hp: 6,
      maxHp: 6,
      level: 1,
      attack: 4,
      armor: 3,
      exp: 50,
    },
  };
}

export function getSnake(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Snake",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.sUpper, Color.Green),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 5,
      maxHp: 5,
      level: 1,
      attack: 5,
      armor: 3,
      exp: 70,
    },
  };
}

export function getSquirrel(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Squirrel",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.qUpper, Color.IndianRed),
    ai: "chase",
    collision: true,
    vision: 6,
    stats: {
      hp: 10,
      maxHp: 10,
      level: 1,
      attack: 8,
      armor: 4,
      exp: 70,
    },
  };
}

export function getRabbit(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Rabbit",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.rUpper, Color.WhiteSmoke),
    ai: "wander",
    collision: true,
    vision: 6,
    stats: {
      hp: 8,
      maxHp: 8,
      level: 1,
      attack: 8,
      armor: 3,
      exp: 50,
    },
  };
}

export function getLadybug(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Ladybug",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.lUpper, Color.Red),
    ai: "wander",
    collision: true,
    stats: {
      hp: 1,
      maxHp: 1,
      level: 1,
      attack: 2,
      armor: 2,
      exp: 10,
    },
  };
}

export function getShellGuardian(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "Shell Guardian",
    enemy: true,
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.at, Color.Red),
    ai: "guard",
    collision: true,
    stats: {
      hp: 20,
      maxHp: 20,
      level: 1,
      attack: 9,
      armor: 3,
      exp: 70,
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
    collision: true,
    stats: {
      hp: 15,
      maxHp: 15,
      level: 1,
      attack: 3,
      armor: 1,
      exp: 0,
    },
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

export function getBerry(options: EntityOptions): Entity {
  const amount = rng.nextItem([1, 1, 1, 2]);
  const color = amount === 1 ? Color.LightBlue : Color.Cyan;
  return {
    id: Math.random().toString(),
    name: "Berry",
    position: options.position,
    renderPriority: 4,
    glyph: Glyph.fromCharCode(CharCode.bullet, color),
    consumable: {
      hp: amount,
    },
  };
}

export function getBook(options: EntityOptions): Entity {
  const amount = rng.nextItem([20, 20, 20, 30, 30, 50]);
  return {
    id: Math.random().toString(),
    name: "Snail Book",
    position: options.position,
    renderPriority: 4,
    glyph: Glyph.fromCharCode(CharCode.equals, Color.Brown),
    consumable: {
      exp: amount,
    },
  };
}

export function getMysticShell(options: EntityOptions): Entity {
  return {
    id: Math.random().toString(),
    name: "The Mystic Shell!",
    position: options.position,
    renderPriority: 4,
    glyph: Glyph.fromCharCode(CharCode.at, Color.MediumPurple),
    consumable: {
      winCondition: true,
    },
  };
}

//traps
