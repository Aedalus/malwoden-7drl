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
  startPos: Vector2;
  entites: Entity[];
  map: Util.Table<Terrain>;

  constructor(map: Util.Table<Terrain>, entities: Entity[], startPos: Vector2) {
    this.map = map;
    this.entites = entities;
    this.startPos = startPos;
  }

  addEntity(e: Entity) {
    this.entites.push(e);
  }
}

export function getNewLevel(
  width: number,
  height: number,
  createPlayer: boolean
): Level {
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
  const entities: Entity[] = [];

  // Generate Entities
  const enemy_count = 10;
  for (let i = 0; i < enemy_count; i++) {
    entities.push(Prefab.getMantis({ position: randomOpen[i] }));
  }

  // Generate Player if applicable, start pos either way
  const startPos = randomOpen[10];
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }

  // Generate Stairs
  entities.push(Prefab.getStairs({ position: randomOpen[11] }));

  // Create level
  return new Level(map.table, entities, startPos);
}
