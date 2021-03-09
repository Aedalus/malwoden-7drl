import { Vector2 } from "malwoden";
import { Direction, state } from "../globals";
import { Level, TerrainCollision } from "../level";
import { Entity } from "../entities";
import { dealDamage } from "../damageFunction";

const directionVectors = {
  [Direction.UP]: { x: 0, y: -1 },
  [Direction.DOWN]: { x: 0, y: 1 },
  [Direction.LEFT]: { x: -1, y: 0 },
  [Direction.RIGHT]: { x: 1, y: 0 },
};

export class MovementSystem {
  loop(level: Level) {
    //sets up monsters that can be collided with.
    for (let e of level.entites) {
      if (e.wantsToMove) {
        // Get direction, the reset wants to move
        const direction = directionVectors[e.wantsToMove];
        e.wantsToMove = undefined;

        //where e wants to go.
        const stepPos: Vector2 = {
          x: e.position.x + direction.x,
          y: e.position.y + direction.y,
        };

<<<<<<< HEAD

        if (state.posCache.get(`${directionCheck.x}:${directionCheck.y}`)?.length) {
          const enemy: Entity[] | undefined = state.posCache.get(`${directionCheck.x}:${directionCheck.y}`)

          if (enemy !== undefined) {
            const curEnemy = enemy[0];

            if (player && player.stats) { // typescript needs to confirm that there is both a player and stats otherwise it can be undefined.
              if (e.name === 'Mal') {
                if (curEnemy.enemy) {
                  //this makes a call to notify damage.
                  dealDamage(player, curEnemy)
                  collisionCheck = true;
                }
              }
              if (curEnemy.name === 'Mal' && curEnemy.stats) { // confirms that the enemy is attacking the player and has stats to do so with.
                collisionCheck = true;
                dealDamage(curEnemy, player)
              }
            }
          }
=======
        // Check entities
        const stepEntities =
          state.posCache.get(`${stepPos.x}:${stepPos.y}`) || [];
        const entitiesBlocking = stepEntities.some((x) => x.collision);
        if (entitiesBlocking) {
          // Check combat
          this.checkCombat(e, stepEntities);
          continue;
>>>>>>> c456897427879eff9c2a1429a200bb4be37d7a48
        }

        // Check terrain
        const terrain = level.map.get(stepPos);
        const terrainBlocking = terrain ? TerrainCollision[terrain] : false;
        if (terrainBlocking) {
          continue;
        }

        // Nothing blocking, adjust position
        e.position.x += direction.x;
        e.position.y += direction.y;

        // Recalculate view if necessary
        if (e.vision && e.viewShed) {
          e.viewShed.dirty = true;
        }
      }
    }
  }

  // Converts a movement into a melee attack if applicable
  checkCombat(currentEntity: Entity, blockingEntities: Entity[]) {
    const otherFactionEntity = blockingEntities.find(
      (x) => x.enemy !== currentEntity.enemy
    );

    if (otherFactionEntity && otherFactionEntity.stats) {
      dealDamage(currentEntity, otherFactionEntity);
    }
  }
}
