import * as Prefab from "../prefabs";
import { Stage } from "../stage";
import { Generation, Rand, Vector2 } from "malwoden";
import { Terrain } from "../terrain";
import { strokeTable } from "./helpers";
import { Entity } from "../entities";

interface Stage3Config {
  name: string;
  enemies: number;
  berries: number;
  books: number;
  mysticShell: boolean;
}
export function generateStage3(
  width: number,
  height: number,
  createPlayer: boolean,
  config: Stage3Config
): Stage {
  //generate seed
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
  strokeTable(map.table, Terrain.tree);

  const rng = new Rand.AleaRNG();

  // Replace trees with random mushrooms
  for (let x = 0; x < map.table.width; x++) {
    for (let y = 0; y < map.table.height; y++) {
      const isTree = map.table.get({ x, y }) === Terrain.tree;
      if (!isTree) continue;
      const next = rng.nextItem([0, 1, 2, 3])!;
      switch (next) {
        case 0:
          break;
        case 1:
          map.table.set({ x, y }, Terrain.mushroomRed);
          break;
        case 2:
          map.table.set({ x, y }, Terrain.mushroomPurple);
          break;
        case 3:
          map.table.set({ x, y }, Terrain.mushroomDarkPurple);
          break;
      }
    }
  }

  const open: Vector2[] = [];
  for (let x = 0; x < map.table.width; x++) {
    for (let y = 0; y < map.table.height; y++) {
      if (map.table.get({ x, y }) === 0) open.push({ x, y });
    }
  }
  const randomOpen = rng.shuffle(open);
  const entities: Entity[] = [];

  let rngPos = 0;

  const startPos = randomOpen[rngPos++];
  // Generate Player if applicable, start pos either way
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }

  // Generate Stairs
  if (!config.mysticShell) {
    entities.push(Prefab.getStairs({ position: randomOpen[rngPos++] }));
  }

  // Generate Entities
  for (let i = 0; i < config.enemies; i++) {
    let e = rng.nextBoolean()
      ? Prefab.getSquirrel({ position: randomOpen[rngPos++] })
      : Prefab.getRabbit({ position: randomOpen[rngPos++] });
    entities.push(e);
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

  // Generate mystic shell
  if (config.mysticShell) {
    const shellPos = randomOpen[rngPos++];
    const walls = [
      { x: shellPos.x + 2, y: shellPos.y - 1 },
      { x: shellPos.x + 2, y: shellPos.y - 2 },
      { x: shellPos.x + 1, y: shellPos.y - 2 },
      { x: shellPos.x - 1, y: shellPos.y - 2 },
      { x: shellPos.x - 2, y: shellPos.y - 2 },
      { x: shellPos.x - 2, y: shellPos.y - 1 },
      { x: shellPos.x - 2, y: shellPos.y + 1 },
      { x: shellPos.x - 2, y: shellPos.y + 2 },
      { x: shellPos.x - 1, y: shellPos.y + 2 },
      { x: shellPos.x + 1, y: shellPos.y + 2 },
      { x: shellPos.x + 2, y: shellPos.y + 2 },
      { x: shellPos.x + 2, y: shellPos.y + 1 },
    ];

    const doors = [
      { x: shellPos.x + 2, y: shellPos.y - 0 },
      { x: shellPos.x + 0, y: shellPos.y - 2 },
      { x: shellPos.x - 2, y: shellPos.y - 0 },
      { x: shellPos.x - 0, y: shellPos.y + 2 },
    ];

    // Clear the outmost ring
    for (let x = -3; x <= 3; x++) {
      for (let y = -3; y <= 3; y++) {
        if (x === 3 || x === -3 || y === 3 || y === -3) {
          const pos = { x: shellPos.x + x, y: shellPos.y + y };
          if (map.table.isInBounds(pos)) {
            map.table.set(pos, Terrain.none);
          }
        }
      }
    }
    entities.push(Prefab.getMysticShell({ position: shellPos }));

    for (let w of walls) {
      if (map.table.isInBounds(w)) {
        map.table.set(w, Terrain.wall);
      }
    }

    for (let d of doors) {
      entities.push(Prefab.getShellGuardian({ position: d }));
    }
  }

  // Create level
  return new Stage(config.name, map.table, entities, startPos);
}
