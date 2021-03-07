import { Direction } from "../globals";
import { Level } from "../level";

const directionVectors = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
};

const collisionEntities = [1, 2];
export class MovementSystem {
  loop(level: Level) {
    for (let e of level.entites) {
      if (e.wantsToMove) {
        const direction = directionVectors[e.wantsToMove];
        const directionCheck = {
          x: e.position.x + direction.x,
          y: e.position.y + direction.y,
        };
        let collisionCheck = false;
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
      }
    }
  }
}
