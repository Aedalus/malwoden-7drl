import { Stage, selectStage } from "../stage";
import { restart, state } from "../globals";
import { Log } from "../logs";

export class StairSystem {
  loop(stage: Stage) {
    const player = stage.entites.find((x) => x.player);
    const stairs = stage.entites.filter((x) => x.stairs);

    for (let s of stairs) {
      if (
        s.position.x === player?.position.x &&
        s.position.y === player.position.y
      ) {
        if (s.restart) {
          restart();
        } else {
          Log.addEntryMid("Descending the stairs");
          state.stageCount++;
          const newLevel = selectStage(state.stageCount);
          newLevel.addEntity(player);
          state.stage = newLevel;
          player.position.x = newLevel.startPos.x;
          player.position.y = newLevel.startPos.y;
        }
      }
    }
  }
}
