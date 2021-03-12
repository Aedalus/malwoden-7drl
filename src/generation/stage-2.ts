import * as Prefab from '../prefabs';
import { Stage } from '../stage';
import { Generation, Rand, Vector2 } from 'malwoden';
import { Terrain } from '../terrain';
import { strokeTable } from './helpers';
import { Entity } from '../entities';

interface Stage2Config {
  name: string;
  enemies: number;
  scorpions: number;
  berries: number;
  books: number;
}

export function generateStage2(
  width: number,
  height: number,
  createPlayer: boolean,
  config: Stage2Config,
): Stage {
  //generate seed
  // Generate Terrain
  const map_width = width;
  const map_height = height;
  const map = new Generation.DrunkardsWalk({
    width: map_width,
    height: map_height,
    topology: 'four',
  });
  map.walkSteps({
    steps: Infinity,
    maxCoveredTiles: 1000,
  });
  for (let x = 0; x < map.table.width; x++) {
    for (let y = 0; y < map.table.height; y++) {
      const val = map.table.get({ x, y });
      map.table.set({ x, y }, val ? Terrain.none : Terrain.mountain);
    }
  }
  strokeTable(map.table, Terrain.mountain);

  const open: Vector2[] = [];
  for (let x = 0; x < map.table.width; x++) {
    for (let y = 0; y < map.table.height; y++) {
      if (map.table.get({ x, y }) === 0) open.push({ x, y });
    }
  }
  const rng = new Rand.AleaRNG();
  const randomOpen = rng.shuffle(open);
  const entities: Entity[] = [];
  let rngPos = 0;

  // Generate Player if applicable, start pos either way
  const startPos = randomOpen[rngPos++];
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }
  // Generate Stairs
  entities.push(Prefab.getStairs({ position: randomOpen[rngPos++] }));

  // Generate Entities
  for (let i = 0; i < config.enemies; i++) {
    let e = rng.nextItem([
      Prefab.getAnts({ position: randomOpen[rngPos++] }),
      Prefab.getAnts({ position: randomOpen[rngPos++] }),
      Prefab.getSnake({ position: randomOpen[rngPos++] }),
    ])!;
    entities.push(e);
  }

  // Generate scorpions
  for (let i = 0; i < config.scorpions; i++) {
    entities.push(Prefab.getScorpion({ position: randomOpen[rngPos++] }));
  }

  // Generate berries
  for (let i = 0; i < config.berries; i++) {
    const berry = Prefab.getBerry({ position: randomOpen[rngPos++] });
    entities.push(berry);
  }

  // Generate book
  for (let i = 0; i < config.books; i++) {
    const book = Prefab.getBook({ position: randomOpen[rngPos++] });
    entities.push(book);
  }

  // Create level
  return new Stage(config.name, map.table, entities, startPos);
}
