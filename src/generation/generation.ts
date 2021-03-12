import { Util } from 'malwoden';
import { map_height, map_width, Stage } from '../stage';
import { Terrain } from '../terrain';
import * as Prefab from '../prefabs';
import { Entity } from '../entities';

import { generateStage1 } from './stage-1';
import { generateStage2 } from './stage-2';
import { generateStage3 } from './stage-3';

export function getEndLevel() {
  const width = 40;
  const height = 40;
  const table = new Util.Table<Terrain>(width, height);

  const entities: Entity[] = [];

  entities.push(Prefab.getPlayer({ position: { x: 16, y: 18 } }));
  entities.push(Prefab.getRestartStairs({ position: { x: 38, y: 18 } }));

  return new Stage('The End', table, entities, { x: 20, y: 20 });
}

export function selectStage(stage: number): Stage {
  switch (stage) {
    case 1:
      return generateStage1(map_width, map_height, true, {
        name: 'The Short Grass',
        enemies: 7,
        books: 1,
        berries: 2,
      });
    case 2:
      return generateStage1(map_width, map_height, false, {
        name: 'The Tall Grass',
        enemies: 10,
        books: 1,
        berries: 2,
      });
    case 3:
      return generateStage2(map_width, map_height, false, {
        name: 'The Gravel Path',
        enemies: 10,
        scorpions: 0,
        berries: 5,
        books: 1,
      });
    case 4:
      return generateStage2(map_width, map_height, false, {
        name: 'The Scorpion Den',
        enemies: 15,
        scorpions: 2,
        berries: 10,
        books: 3,
      });

    default:
      return getEndLevel();
  }
}
