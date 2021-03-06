import { Level } from "../level";

const directionVectors = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export class MovementSystem {
  loop(level: Level) {
    for (let e of level.entites) {
      if (e.wantsToMove) {
        const direction = directionVectors[e.wantsToMove];
        e.position.x += direction.x;
        e.position.y += direction.y;
        e.wantsToMove = undefined;
      }
    }
  }
}
