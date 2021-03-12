import * as Prefab from '../prefabs';
import { Stage } from '../stage';
import { Generation, Rand, Vector2 } from 'malwoden';
import { Terrain } from '../terrain';
import { strokeTable } from './helpers';
import { Entity } from '../entities';

export function generateStage3(
  width: number,
  height: number,
  createPlayer: boolean,
): Stage {
  //generate seed
  // Generate Terrain
  const map_width = width;
  const map_height = height;
  const map = new Generation.CellularAutomata<Terrain>(map_width, map_height, {
    aliveValue: Terrain.graveyard,
    deadValue: Terrain.none,
  });
  map.randomize(0.63);
  map.doSimulationStep(3);
  map.connect();
  strokeTable(map.table, Terrain.graveyard);

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
    let e = rng.nextBoolean()
      ? Prefab.getWeasle({ position: randomOpen[i] })
      : Prefab.getMantis({ position: randomOpen[i] });
    entities.push(e);
  }

  // Generate Player if applicable, start pos either way
  const startPos = randomOpen[10];
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }
  // Generate Stairs
  entities.push(Prefab.getStairs({ position: randomOpen[11] }));
  // Create level
  return new Stage('The Crypt', map.table, entities, startPos);
}
