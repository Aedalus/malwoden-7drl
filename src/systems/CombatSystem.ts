import { Entity } from "../entities";
import { Stage, getEndLevel } from "../stage";
import { Log } from "../logs";
import { state } from "../globals";
import { Glyph, Color } from "malwoden";

export class CombatSystem {
    ///

<<<<<<< HEAD
    private makeCorpse(futureCorpse: Entity) {
        if (futureCorpse.name === "Mal") {
            Log.addEntry("You have died.");
            const endLevel = getEndLevel();
            state.level = endLevel;
        }
        Log.addEntry(futureCorpse.name + " has died horribly.");
        futureCorpse.enemy = false;
        futureCorpse.collision = false;
        futureCorpse.ai = undefined;
        futureCorpse.name += " (corpse)";
        futureCorpse.glyph = new Glyph("x", Color.White);
=======
  private makeCorpse(futureCorpse: Entity) {
    if (futureCorpse.name === "Mal") {
      Log.addEntryWarning("You have died.");
      const endLevel = getEndLevel();
      state.stage = endLevel;
    }
    Log.addEntryMid(futureCorpse.name + " has died horribly.");
    if (state.playerCache && state.playerCache.stats && futureCorpse.stats) {
      state.playerCache.stats.exp =
        state.playerCache.stats?.exp + futureCorpse.stats?.exp;
    }

    futureCorpse.enemy = false;
    futureCorpse.collision = false;
    futureCorpse.stats = undefined;
    futureCorpse.ai = undefined;
    futureCorpse.name += " (corpse)";
    futureCorpse.glyph = new Glyph("x", Color.White);
>>>>>>> 39a9d0594b8236b6f19f2f2a4f386b54f7b3891c

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

<<<<<<< HEAD
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
=======
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
>>>>>>> 39a9d0594b8236b6f19f2f2a4f386b54f7b3891c

                //confim if target is alive, if dead, makes a corpse;
                this.checkAlive(e);
            }
        }
    }
}
