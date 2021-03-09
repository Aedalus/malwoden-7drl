import { Entity } from "../entities";
import { Level, getEndLevel } from "../level";
import { Log } from "../logs";
import { state } from "../globals";
import { Glyph, Color } from "malwoden";

export class CombatSystem {
    ///

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
    }

    private isAlive(check: Entity) {
        if (check.stats) {
            if (check.stats.hp > 0) {
                return true;
            }
            this.makeCorpse(check);
            return false;
        }
    }

    private applyDamage(creature: Entity, read: { source: string, damage: number }) {

        if (creature && creature.stats) {
            if (read) {
                creature.stats.hp = creature.stats.hp - read?.damage;
            }
        }
    }

    loop(level: Level) {
        const enemy = level.entites.filter((x) => x.enemy);

        for (let s of enemy) {
            if (s.incomingDamage && s.incomingDamage.length >= 1) {
                //check to see if the current entity has damage being logged against them.
                try {
                    let read = s.incomingDamage.pop();
                    //apply damage
                    if (read) { //confirm read is not undefined.
                        this.applyDamage(s, read);
                        Log.addEntry(s.name + ' was hit for ' + read.damage + ' by ' + read.source);
                    }
                    //read the log
                    //confim if target is alive, if dead, makes a corpse;
                    this.isAlive(s);
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }
}