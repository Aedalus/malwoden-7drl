import { Rand, Pathfinding, Vector2 } from "malwoden";
import { Entity } from "../entities";
import { Direction, state } from "../globals";
import { Stage } from "../stage";
import { TerrainCollision } from "../terrain";

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

  loop(stage: Stage) {
    for (let e of stage.entites) {
      if (e.ai === "chase") {
        this.chaseAI(e);
      } else if (e.ai === "wander") {
        this.wanderAI(e);
      }
    }
  }

  private chaseAI(e: Entity) {
    if (!e.viewShed) throw new Error(`${e.name} does not have a viewshed!`);
    const playerPos = state.playerCache!.position;
    if (e.viewShed.area.has(`${playerPos.x}:${playerPos.y}`)) {
      const p = new Pathfinding.AStar({
        topology: "four",
        isBlockedCallback: (pos) => {
          if (pos.x === playerPos.x && pos.y === playerPos.y) return false;

          // Check terrain
          const terrain = state.stage.map.get(pos);
          if (terrain && TerrainCollision[terrain]) return true;

          // Default not blocked
          return false;
        },
      });
      const route = p.compute(e.position, playerPos);
      if (route && route.length >= 2) {
        const direction = this.getDirectionFromVectors(route[0], route[1]);
        if (!direction) {
          console.warn("No direction found for", route[0], route[1]);
        } else {
          e.wantsToMove = direction;
        }
      }
    } else {
      this.wanderAI(e);
    }
  }

  private getDirectionFromVectors(
    start: Vector2,
    next: Vector2
  ): Direction | undefined {
    const dx = next.x - start.x;
    const dy = next.y - start.y;

    // Convert to direction
    if (dx === 1 && dy === 0) {
      return Direction.RIGHT;
    } else if (dx === -1 && dy === 0) {
      return Direction.LEFT;
    } else if (dx === 0 && dy === 1) {
      return Direction.DOWN;
    } else if (dx === 0 && dy === -1) {
      return Direction.UP;
    }

    return undefined;
  }

  private wanderAI(e: Entity) {
    const dir = this.getRandDirection();
    if (dir) {
      e.wantsToMove = dir;
    }
  }
}
