import { Entity } from "../entities";
import { Stage } from "../stage";
import { Log } from "../logs";
import { GameState, state } from "../globals";
import { Glyph, Color } from "malwoden";

export class CombatSystem {
  ///

  private makeCorpse(futureCorpse: Entity) {
    if (futureCorpse.name === "Mal") {
      Log.addEntryWarning("You have died.");
      state.currentGameState = GameState.GAME_LOSS;
    }
    Log.addEntryMid(futureCorpse.name + " has died horribly.");
    if (state.playerCache && state.playerCache.stats && futureCorpse.stats) {
      state.playerCache.stats.exp =
        state.playerCache.stats?.exp + futureCorpse.stats?.exp;
    }
    futureCorpse.renderPriority = 3;
    futureCorpse.enemy = false;
    futureCorpse.collision = false;
    futureCorpse.stats = undefined;
    futureCorpse.ai = undefined;
    futureCorpse.name += " (corpse)";
    futureCorpse.glyph = new Glyph("x", Color.White);

    return futureCorpse;
  }

  private checkAlive(check: Entity) {
    if (check.stats) {
      if (check.stats.hp > 0) {
        return true;
      }
      this.makeCorpse(check);
      return false;
    }
  }

  private applyDamage(
    creature: Entity,
    incDamage: { source: string; damage: number }
  ) {
    if (creature && creature.stats) {
      creature.stats.hp = creature.stats.hp - incDamage.damage;
    }
  }

  loop(stage: Stage) {
    for (let e of stage.entites) {
      while (e.incomingDamage && e.incomingDamage.length > 0) {
        //check to see if the current entity has damage being logged against them.
        let incDamage = e.incomingDamage.pop()!;

        this.applyDamage(e, incDamage);
        Log.addEntryLow(
          e.name +
            " was hit for " +
            incDamage.damage +
            " by " +
            incDamage.source
        );

        //confim if target is alive, if dead, makes a corpse;
        this.checkAlive(e);
      }
    }
  }
}
