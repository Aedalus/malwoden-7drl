import { map_height, map_width, state } from "../globals";
import { getNewLevel, Level } from "../level";
import { Log } from "../logs";

export class StairSystem {
  loop(level: Level) {
    const player = level.entites.find((x) => x.player);
    const stairs = level.entites.filter((x) => x.stairs);

    for (let s of stairs) {
      if (
        s.position.x === player?.position.x &&
        s.position.y === player.position.y
      ) {
        if (s.restart) {
          Log.addEntry("You are reborn. Let the snailing continue!");
          const newLevel = getNewLevel(map_width, map_height, false);
          newLevel.addEntity(player);
          state.level = newLevel;
          state.levelCount = 1;
          player.position.x = newLevel.startPos.x;
          player.position.y = newLevel.startPos.y;

        } else {
          Log.addEntry("Descending the stairs");
          const newLevel = getNewLevel(map_width, map_height, false);
          newLevel.addEntity(player);
          state.level = newLevel;
          state.levelCount++;
          player.position.x = newLevel.startPos.x;
          player.position.y = newLevel.startPos.y;
        }
      }
    }
  }
}
