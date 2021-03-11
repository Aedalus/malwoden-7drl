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

export const map_width = 52;
export const map_height = 38;

// Level
enum Terrain {
  none = 0,
  tree = 1,
  mountain = 2,
  graveyard = 3,
  hedge = 4,

  //endgame lettering
  Y = 89,
  U = 90,
  H = 91,
  A = 92,
  V = 93,
  E = 94,
  D = 95,
  I = 96,
}

export const TerrainCollision: { [e in Terrain]: boolean } = {
  [Terrain.none]: false,
  [Terrain.tree]: true,
  [Terrain.mountain]: true,
  [Terrain.graveyard]: true,
  [Terrain.hedge]: true,

  //endgame lettering
  [Terrain.Y]: false,
  [Terrain.U]: false,
  [Terrain.H]: false,
  [Terrain.A]: false,
  [Terrain.V]: false,
  [Terrain.E]: false,
  [Terrain.D]: false,
  [Terrain.I]: false,
};

export const TerrainGlyphs: { [e in Terrain]: Glyph | undefined } = {
  [Terrain.none]: Glyph.fromCharCode(
    CharCode.blackSquare,
    Color.Black,
    Color.Black
  ),
  [Terrain.tree]: Glyph.fromCharCode(CharCode.blackSpadeSuit, Color.Green),
  [Terrain.mountain]: Glyph.fromCharCode(
    CharCode.blackUpPointingTriangle,
    Color.Brown
  ),
  [Terrain.graveyard]: Glyph.fromCharCode(CharCode.upDownArrowWithBase),
  [Terrain.hedge]: Glyph.fromCharCode(CharCode.greekSmallLetterPi),

  //endgame lettering
  [Terrain.Y]: Glyph.fromCharCode(CharCode.yUpper, Color.Green),
  [Terrain.U]: Glyph.fromCharCode(CharCode.uUpper, Color.Green),
  [Terrain.H]: Glyph.fromCharCode(CharCode.hUpper, Color.Green),
  [Terrain.A]: Glyph.fromCharCode(CharCode.aUpper, Color.Green),
  [Terrain.V]: Glyph.fromCharCode(CharCode.vUpper, Color.Green),
  [Terrain.E]: Glyph.fromCharCode(CharCode.eUpper, Color.Green),
  [Terrain.D]: Glyph.fromCharCode(CharCode.dUpper, Color.Green),
  [Terrain.I]: Glyph.fromCharCode(CharCode.iUpper, Color.Green),
};

export const FOWTerrainGlyphs: { [e in Terrain]: Glyph | undefined } = {
  [Terrain.none]: Glyph.fromCharCode(
    CharCode.blackSquare,
    Color.Black.blendPercent(Color.DimGray, 50),
    Color.Black.blendPercent(Color.DimGray, 50)
  ),
  [Terrain.tree]: Glyph.fromCharCode(
    CharCode.blackSpadeSuit,
    Color.Black.blendPercent(Color.DimGray, 20),
    Color.Black.blendPercent(Color.DimGray, 50)
  ),
  [Terrain.mountain]: Glyph.fromCharCode(
    CharCode.blackUpPointingTriangle,
    Color.DarkGray
  ),
  [Terrain.graveyard]: Glyph.fromCharCode(CharCode.upDownArrowWithBase),
  [Terrain.hedge]: Glyph.fromCharCode(CharCode.greekSmallLetterPi),

  //endgame lettering
  [Terrain.Y]: undefined,
  [Terrain.U]: undefined,
  [Terrain.H]: undefined,
  [Terrain.A]: undefined,
  [Terrain.V]: undefined,
  [Terrain.E]: undefined,
  [Terrain.D]: undefined,
  [Terrain.I]: undefined,
};

// Used by View System to calculate FOV
export const TerrainBlocksVision: { [e in Terrain]: boolean } = {
  [Terrain.none]: false,
  [Terrain.tree]: true,
  [Terrain.mountain]: true,
  [Terrain.graveyard]: true,
  [Terrain.hedge]: true,

  //endgame lettering
  [Terrain.Y]: false,
  [Terrain.U]: false,
  [Terrain.H]: false,
  [Terrain.A]: false,
  [Terrain.V]: false,
  [Terrain.E]: false,
  [Terrain.D]: false,
  [Terrain.I]: false,
};

export class Stage {
  name: string;
  startPos: Vector2;
  entites: Entity[];
  map: Util.Table<Terrain>;
  fow: boolean;
  fowVisited: Util.Table<boolean>;

  constructor(
    name: string,
    map: Util.Table<Terrain>,
    entities: Entity[],
    startPos: Vector2
  ) {
    this.name = name;
    this.map = map;
    this.entites = entities;
    this.startPos = startPos;
    this.fow = true;
    this.fowVisited = new Util.Table(this.map.width, this.map.height);
  }

  addEntity(e: Entity) {
    this.entites.push(e);
  }
}

export function getEndLevel() {
  const width = 40;
  const height = 40;
  const table = new Util.Table<Terrain>(width, height);

  const entities: Entity[] = [];

  entities.push(Prefab.getPlayer({ position: { x: 16, y: 18 } }));
  entities.push(Prefab.getRestartStairs({ position: { x: 38, y: 18 } }));

  table.fill(0);
  table.set({ x: 14, y: 18 }, 89);
  table.set({ x: 18, y: 18 }, 90);
  table.set({ x: 21, y: 18 }, 91);
  table.set({ x: 23, y: 18 }, 92);
  table.set({ x: 25, y: 18 }, 93);
  table.set({ x: 27, y: 18 }, 94);
  table.set({ x: 30, y: 18 }, 95);
  table.set({ x: 32, y: 18 }, 96);
  table.set({ x: 34, y: 18 }, 94);
  table.set({ x: 36, y: 18 }, 95);

  return new Stage("The End", table, entities, { x: 20, y: 20 });
}

function generateStage1(width: number, height: number, createPlayer: boolean): Stage {
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
      ? Prefab.getMantis({ position: randomOpen[i] })
      : Prefab.getLadybug({ position: randomOpen[i] });
    entities.push(e);
  }
  // generate keys goes here.
  // const key = ['keyture'];
  // const enemyArray = entities.filter(x => x.enemy);


  // Generate Player if applicable, start pos either way
  const startPos = randomOpen[10];
  if (createPlayer) {
    entities.push(Prefab.getPlayer({ position: startPos }));
  }
  // Generate Stairs
  entities.push(Prefab.getStairs({ position: randomOpen[11] }));
  // Create level
  return new Stage("Whisperwoods", map.table, entities, startPos);
}

function generateStage2(width: number, height: number, createPlayer: boolean): Stage {
  //generate seed
  // Generate Terrain
  const map_width = width;
  const map_height = height;
  const map = new Generation.CellularAutomata<Terrain>(map_width, map_height, {
    aliveValue: Terrain.mountain,
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
    let e = rng.nextBoolean()
      ? Prefab.getMantis({ position: randomOpen[i] })
      : Prefab.getLadybug({ position: randomOpen[i] });
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
  return new Stage("Clifftops", map.table, entities, startPos);
}

function generateStage3(width: number, height: number, createPlayer: boolean): Stage {
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
  return new Stage("The Crypt", map.table, entities, startPos);
}

function generateStage4(width: number, height: number, createPlayer: boolean): Stage {
  //generate seed
  // Generate Terrain
  const map_width = width;
  const map_height = height;
  const map = new Generation.CellularAutomata<Terrain>(map_width, map_height, {
    aliveValue: Terrain.hedge,
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
    let e = rng.nextBoolean()
      ? Prefab.getSnake({ position: randomOpen[i] })
      : Prefab.getBird({ position: randomOpen[i] });
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
  return new Stage("Hedgeland", map.table, entities, startPos);
}

export function selectStage(stage: number): Stage {
  switch (stage) {
    case 1: return generateStage1(map_width, map_height, true);
    case 2: return generateStage2(map_width, map_height, false);
    case 3: return generateStage3(map_height, map_height, false);
    case 4: return generateStage4(map_height, map_height, false);
    default: return getEndLevel();
  }
}


export function getNewLevel(
  width: number,
  height: number,
  createPlayer: boolean
): Stage {
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
    let e = rng.nextBoolean()
      ? Prefab.getMantis({ position: randomOpen[i] })
      : Prefab.getLadybug({ position: randomOpen[i] });
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
  return new Stage("Whisperwoods", map.table, entities, startPos);
}
