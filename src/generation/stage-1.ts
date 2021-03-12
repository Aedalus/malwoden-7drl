import * as Prefab from "../prefabs";
import { Stage } from "../stage";
import { Generation, Rand, Vector2 } from "malwoden";
import { Terrain } from "../terrain";
import { strokeTable } from "./helpers";
import { Entity } from "../entities";

interface Stage1Config {
  name: string;
  enemies: number;
  berries: number;
  books: number;
}
export function generateStage1(
  width: number,
  height: number,
  createPlayer: boolean,
  config: Stage1Config
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
  strokeTable(map.table, Terrain.tree);

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

  const startPos = randomOpen[rngPos++];
  // Generate Player if applicable, start pos either way
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }

  // Generate Stairs
  entities.push(Prefab.getStairs({ position: randomOpen[rngPos++] }));

  // Generate Entities
  for (let i = 0; i < config.enemies; i++) {
    let e = rng.nextBoolean()
      ? Prefab.getMantis({ position: randomOpen[rngPos++] })
      : Prefab.getLadybug({ position: randomOpen[rngPos++] });
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

  // Tmp, generate mystic shell
  entities.push(Prefab.getMysticShell({ position: randomOpen[rngPos++] }));

  // Create level
  return new Stage(config.name, map.table, entities, startPos);
}
