import { Rand } from "malwoden";
import { Direction } from "../globals";
import { Level } from "../level";

export class AISystem {
  rng = new Rand.AleaRNG();
  getRandDirection(): Direction | undefined {
    return this.rng.nextItem([
      Direction.UP,
      Direction.DOWN,
      Direction.LEFT,
      Direction.RIGHT,
      undefined,
    ]);
  }

  loop(level: Level) {
    for (let e of level.entites) {
      if (e.ai === "wander") {
        const dir = this.getRandDirection();
        if (dir) {
          e.wantsToMove = dir;
        }
      }
    }
  }
}
