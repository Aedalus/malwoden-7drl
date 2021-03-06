import { createPortal } from "react-dom";
import { Level } from "../level";

const directionVectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

const collisionEntities = [1, 2];
export class MovementSystem {
  loop(level: Level) {
    for (let e of level.entites) {
      if (e.wantsToMove) {
        const direction = directionVectors[e.wantsToMove];
        const directionCheck = { x: e.position.x + direction.x, y: e.position.y + direction.y };
        let collisionCheck = false;
        collisionEntities.forEach(x => {
          if (x === level.map.get(directionCheck)) {
            collisionCheck = true;
          };
        });
        if (level.map.isInBounds(directionCheck) && collisionCheck !== false) {
          e.wantsToMove = undefined;
          break;
        };
        e.position.x += direction.x;
        e.position.y += direction.y;
        e.wantsToMove = undefined;
      }
    }
  }
}


