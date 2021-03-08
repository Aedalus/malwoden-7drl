import { Entity } from "../entities";
import { Level, getEndLevel } from "../level";
import { Log } from "../logs";
import { state } from "../globals";
import { Glyph, Color } from "malwoden";

export class CombatSystem {

    private makeCorpse(futureCorpse: Entity) {
        if (futureCorpse.name === 'Mal') {
            Log.addEntry('You have died.');
            const endLevel = getEndLevel();
            state.level = endLevel;
        }
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
            console.log('making corpse: ', check);
            this.makeCorpse(check);
            return false;
        }
    }

    private calcPower(attacker: Entity, defender: Entity) {
        let power = 0;
        //determine the power of the attack. 
        if (attacker.stats && defender.stats) {
            power = attacker.stats.attack - defender.stats.armor;
        }

        //return power if it is above 0, else it'll add heath!
        if (power >= 0) {
            return power;
        }
        else return 0;
    }

    combatSteps(enemy: Entity, player: Entity) {
        //todo : add in armor calc for combat.
        let attacker;
        let defender;
        //ensure that player and enemy have stats.
        if (enemy.enemy || player.enemy === true) {
            if (enemy.stats && player.stats) {
                // determine who goes first
                if (enemy.stats.speed > player.stats.speed) {
                    attacker = enemy;
                    defender = player;
                } else {
                    attacker = player;
                    defender = enemy;
                }
                //attacker and defender has been determined.                
                if (attacker.stats && defender.stats) { //renew the check to make typescript happy.
                    let damage = this.calcPower(attacker, defender)
                    defender.stats.hp = defender.stats.hp - damage;
                    Log.addEntry(attacker.name + ' hits ' + defender.name + ' for ' + damage);
                    Log.addEntry(defender.name + ' has ' + defender.stats.hp + ' left.');
                    this.isAlive(defender);
                    if (this.isAlive(defender)) {
                        let damage = this.calcPower(defender, attacker)
                        attacker.stats.hp = attacker.stats.hp - damage;
                        Log.addEntry(defender.name + ' hits ' + attacker.name + ' for ' + damage);
                        Log.addEntry(attacker.name + ' has ' + attacker.stats.hp + ' left.');
                        this.isAlive(attacker);
                    }
                }
            }
        }
    }

    // possibly cruft now that combat system is impliemented in movement system. Don't really like it.
    loop(level: Level) {
        const player = level.entites.find((x) => x.player);
        const enemy = level.entites.filter((x) => x.enemy);

        for (let s of enemy) {
            if (
                s.position.x === player?.position.x &&
                s.position.y === player.position.y
            ) {
                Log.addEntry("Entering Combat");

                if (s.stats) {
                    if (this.isAlive(s)) {
                        this.combatSteps(s, player);
                    }
                }
            }
        }
    }
}