import { Glyph, Vector2 } from "malwoden";

// Entity

interface Stats {
  hp: number;
  level: number;
  attack: number;
  speed: number;
  armor: number;
  exp: number;
}

export class Entity {
  name: string;
  description?: string;

  position: Vector2;
  glyph: Glyph;
  renderPriority: number;

  player?: boolean;
  stats?: Stats;
  trapDamage?: number;
  droppedItem?: Item;
  inventory?: Map<number, Item>;
  wantsToMove?: "up" | "down" | "left" | "right";
}


// Items
class Item {
  id: string;
  name: string;
  description: string;

  canEquip: boolean;
  equipSlot?: string;

  healAmount: number;
}
