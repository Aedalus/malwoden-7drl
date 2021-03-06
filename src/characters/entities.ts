import { Glyph, Vector2, Util } from "malwoden";

// Entity
export class Entity {
    name: string;
    description?: string;

    position: Vector2;
    render: Glyph;
    renderOrder: number;

    stats?: Stats;
    trapDamage?: number;
    droppedItem: Item;
    inventory?: Map<number, Item>;
}

class Stats {
    hp: number;
}

// Level
enum Terrain {
    grass = 0,
    mountain = 1,
    tree = 2,
}

export class Level {
    entites: Entity[] = [];
    map: Util.Table<Terrain>;

    constructor() {
        //.. todo
    }
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