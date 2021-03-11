import { Stage } from "../stage";
import { Log } from "../logs";


export class LevelSystem {

    loop(stage: Stage) {
        const player = stage.entites.find(x => x.player);
        if (player && player.stats) {
            const level = player.stats.level;
            const exp = player.stats.exp;
            const equa = ((level * (level + 1) / 2) * 100);
            if (equa <= exp) { // this should generate a random chance at stats later down the line to provide a more mixed play. Or let the player choose the stats.
                Log.addEntry('You have leveled up!');
                player.stats.hp = player.stats.hp + 4;
                player.stats.maxHp = player.stats.maxHp + 4;
                player.stats.attack = player.stats.attack + 2;
                player.stats.armor = player.stats.armor + 1;
                player.stats.level = player.stats.level + 1;
            }
        }
    }
}