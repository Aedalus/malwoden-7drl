import { Glyph, Vector2, Util } from "malwoden";

// Entity
export class Entity {
  name: string;
  description?: string;
  label?: string;

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

class Stats {
  hp: number;
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
