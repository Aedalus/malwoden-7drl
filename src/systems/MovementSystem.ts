import { Vector2 } from "malwoden";
import { Direction, state } from "../globals";
import { Level } from "../level";
import { CombatSystem } from "./CombatSystem"
import { Entity } from "../entities";


const combatSystem = new CombatSystem();
const directionVectors = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
};

const collisionEntities = [1, 2];
export class MovementSystem {
  loop(level: Level) {
    //sets up monsters that can be collided with.
    const player = level.entites.find(x => x.player);
    for (let e of level.entites) {
      if (e.wantsToMove) {
        const direction = directionVectors[e.wantsToMove];
        let collisionCheck = false;
        //where e wants to go.
        const directionCheck: Vector2 = {
          x: e.position.x + direction.x,
          y: e.position.y + direction.y,
        };


        if (state.posCache.get(`${directionCheck.x}:${directionCheck.y}`)) {
          const enemy: Entity[] | undefined = state.posCache.get(`${directionCheck.x}:${directionCheck.y}`)

          if (enemy !== undefined) {
            const curEnemy = enemy[0];

            if (player) {
              if (e.name === 'Mal') {
                if (curEnemy.enemy) {
                  combatSystem.combatSteps(player, curEnemy);
                  collisionCheck = true;
                }
              }
              if (curEnemy.name === 'Mal') {
                collisionCheck = true;
                combatSystem.combatSteps(curEnemy, e);
              }
            }
          }
        }

        //checks for collision with terrain.
        collisionEntities.forEach((x) => {
          if (x === level.map.get(directionCheck)) {
            collisionCheck = true;
          }

        });
        if (level.map.isInBounds(directionCheck) && collisionCheck !== false) {
          e.wantsToMove = undefined;
          break;
        }
        e.position.x += direction.x;
        e.position.y += direction.y;
        e.wantsToMove = undefined;

        // Recalculate view if necessary
        if (e.vision && e.viewShed) {
          e.viewShed.dirty = true;
        }
      }
    }
  }
}
