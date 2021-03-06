import { Vector2, Glyph, CharCode, Color } from "malwoden";
import { Entity } from "./entities";

interface EntityOptions {
  position: Vector2;
}

export function getMantis(options: EntityOptions): Entity {
  return {
    name: "Mantis",
    position: options.position,
    renderPriority: 2,
    glyph: Glyph.fromCharCode(CharCode.mUpper, Color.Red),
    stats: {
      hp: 10,
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
    },
  };
}
