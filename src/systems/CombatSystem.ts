import { Entity } from "../entities";
import { Level, getEndLevel } from "../level";
import { Log } from "../logs";
import { state } from "../globals";
import { Glyph, Color } from "malwoden";

export class CombatSystem {
<<<<<<< HEAD
    private makeCorpse(futureCorpse: Entity) {
        if (futureCorpse.name === 'Mal') {
            Log.addEntry('You have died.');
            const endLevel = getEndLevel();
            state.level = endLevel;
        }
        Log.addEntry(futureCorpse.name + ' has died horribly.');
        futureCorpse.enemy = false;
        futureCorpse.collision = false;
        futureCorpse.ai = undefined;
        futureCorpse.name += ' (corpse)';
        futureCorpse.glyph = new Glyph('x', Color.White);

        return futureCorpse;
=======
  ///

  private makeCorpse(futureCorpse: Entity) {
    if (futureCorpse.name === "Mal") {
      Log.addEntry("You have died.");
      const endLevel = getEndLevel();
      state.level = endLevel;
>>>>>>> c456897427879eff9c2a1429a200bb4be37d7a48
    }
    Log.addEntry(futureCorpse.name + " has died horribly.");
    futureCorpse.enemy = false;
    futureCorpse.collision = false;
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
    } else {
      throw new Error(`Cannot damage ${creature.name} as it has no stats`);
    }
  }

  loop(level: Level) {
    for (let e of level.entites) {
      while (e.incomingDamage && e.incomingDamage.length > 0) {
        //check to see if the current entity has damage being logged against them.
        let incDamage = e.incomingDamage.pop()!;

        this.applyDamage(e, incDamage);
        Log.addEntry(
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
