import { Stage } from "../stage";
import { state } from "../globals";
import { Log } from "../logs";

export class ConsumableSystem {
  loop(stage: Stage) {
    const player = state.playerCache!;
    for (let e of stage.entites) {
      if (e.consumable) {
        if (
          e.position.x === player.position.x &&
          e.position.y === player.position.y
        ) {
          let consumed = false;
          // Player is over a consumable
          if (e.consumable.hp && player.stats!.hp < player.stats!.maxHp) {
            player.stats!.hp = Math.min(
              player.stats!.maxHp,
              player.stats!.hp + e.consumable.hp
            );
            Log.addEntryMid(
              `You ate a ${e.name} and regained ${e.consumable.hp} hp!`
            );
            consumed = true;
          }
          if (e.consumable.exp) {
            Log.addEntryMid(
              `You read a ${e.name} and gained ${e.consumable.exp} exp!`
            );
            player.stats!.exp += e.consumable.exp;
            consumed = true;
          }

          // Delete if consumed
          if (consumed) {
            state.stage.removeEntity(e);
          }
        }
      }
    }
  }
}
