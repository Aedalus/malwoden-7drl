import { Entity } from "./entities";
import {
  Util,
  Vector2,
  Generation,
  Rand,
  Glyph,
  CharCode,
  Color,
} from "malwoden";
import * as Prefab from "./prefabs";

// Level
enum Terrain {
  none = 0,
  tree = 1,
  mountain = 2,
}

export const TerrainGlyphs: { [e in Terrain]: Glyph | undefined } = {
  [Terrain.none]: undefined,
  [Terrain.tree]: Glyph.fromCharCode(CharCode.blackSpadeSuit, Color.Green),
  [Terrain.mountain]: Glyph.fromCharCode(
    CharCode.blackUpPointingTriangle,
    Color.Brown
  ),
};

export class Level {
  entites: Entity[] = [];
  map: Util.Table<Terrain>;

  constructor(map: Util.Table<Terrain>) {
    this.map = map;
  }

  addEntity(e: Entity) {
    this.entites.push(e);
  }
}

export function getNewLevel(width: number, height: number): Level {
  // Generate Terrain
  const map_width = width;
  const map_height = height;
  const map = new Generation.CellularAutomata<Terrain>(map_width, map_height, {
    aliveValue: Terrain.tree,
    deadValue: Terrain.none,
  });
  map.randomize(0.63);
  map.doSimulationStep(3);
  map.connect();

  const open: Vector2[] = [];
  for (let x = 0; x < map.table.width; x++) {
    for (let y = 0; y < map.table.height; y++) {
      if (map.table.get({ x, y }) === 0) open.push({ x, y });
    }
  }

  const rng = new Rand.AleaRNG();
  const randomOpen = rng.shuffle(open);

  // Create level
  const level = new Level(map.table);

  // Generate Entities
  const enemy_count = 10;
  for (let i = 0; i < enemy_count; i++) {
    level.addEntity(Prefab.getMantis({ position: randomOpen[i] }));
  }

  // Generate Player

  level.addEntity(Prefab.getPlayer({ position: randomOpen[10] }));

  return level;
}
