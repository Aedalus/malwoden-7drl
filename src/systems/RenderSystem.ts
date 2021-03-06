import { Terminal, GUI } from "malwoden";
import { Level, TerrainGlyphs } from "../level";

interface RenderSystemContext {
  level: Level;
  terminal: Terminal.RetroTerminal;
  mapTerminal: Terminal.PortTerminal;
  logs: string[];
}

export class RenderSystem {
  loop({ terminal, mapTerminal, level, logs }: RenderSystemContext) {
    // Rendering
    terminal.clear();

    // Player Box
    GUI.box(terminal, {
      title: "Player",
      origin: { x: 0, y: 0 },
      width: 15,
      height: 39,
    });

    // HP
    //   terminal.writeAt({ x: 2, y: 2 }, `HP : ${player.hp}/10`, Color.Red);
    //   terminal.writeAt({ x: 2, y: 4 }, `Gold : ${player.coins}`, Color.Yellow);

    // World Box
    GUI.box(terminal, {
      origin: { x: 16, y: 0 },
      width: 53,
      height: 39,
    });

    // Logs
    GUI.box(terminal, {
      title: "Log",
      origin: { x: 0, y: 40 },
      width: 69,
      height: 9,
    });

    for (let i = 0; i < logs.length; i++) {
      terminal.writeAt({ x: 1, y: 42 + i }, logs[i]);
    }

    // Draw Map
    for (let x = 0; x < level.map.width; x++) {
      for (let y = 0; y < level.map.height; y++) {
        const terrain = level.map.get({ x, y });

        if (terrain) {
          const glyph = TerrainGlyphs[terrain];
          if (glyph) {
            mapTerminal.drawGlyph({ x, y }, glyph);
          }
        }
      }
    }

    // Draw Entities
    const sortedEntities = level.entites.sort(
      (a, b) => b.renderPriority - a.renderPriority
    );
    for (let e of sortedEntities) {
      mapTerminal.drawGlyph(e.position, e.glyph);
    }

    //   // Coin
    //   mapTerminal.drawGlyph(
    //     coin,
    //     Glyph.fromCharCode(CharCode.oLower, Color.Yellow)
    //   );
    //   // Player Entity
    //   mapTerminal.drawGlyph(player, Glyph.fromCharCode(CharCode.at, Color.Yellow));

    terminal.render();
  }
}
