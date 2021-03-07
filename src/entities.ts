import { Glyph, Vector2 } from "malwoden";
import { Direction } from "./globals";

// Entity

interface Stats {
  hp: number;
  level: number;
  attack: number;
  speed: number;
  armor: number;
  exp: number;
}

export interface Entity {
  name: string;
  description?: string;
  label?: string;
  ai?: "wander";

  position: Vector2;
  glyph: Glyph;
  renderPriority: number;

  player?: boolean;
  stairs?: boolean;
  stats?: Stats;
  trapDamage?: number;
  droppedItem?: Item;
  inventory?: Map<number, Item>;
  wantsToMove?: Direction;
}

// Items
export interface Item {
  id: string;
  name: string;
  description: string;

  canEquip: boolean;
  equipSlot?: string;

  healAmount: number;
}
