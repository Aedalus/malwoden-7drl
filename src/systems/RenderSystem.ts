import { Terminal, GUI, Input, Color, CharCode, Vector2 } from "malwoden";
import { FOWTerrainGlyphs, Level, TerrainGlyphs } from "../level";
import { Log } from "../logs";
import { state } from "../globals";

interface RenderSystemContext {
  level: Level;
  terminal: Terminal.RetroTerminal;
  mapTerminal: Terminal.PortTerminal;
}

export class RenderSystem {
  mouse = new Input.MouseHandler();

  loop({ terminal, mapTerminal }: RenderSystemContext) {
    // Rendering
    terminal.clear();
    const player = state.level.entites.find((x) => x.player);

    // Player Box
    GUI.box(terminal, {
      title: "Player",
      origin: { x: 0, y: 0 },
      width: 15,
      height: 39,
    });

    terminal.writeAt({ x: 2, y: 2 }, `Level: ${state.levelCount}`);
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

    for (let i = 0; i < Log.length(); i++) {
      terminal.writeAt({ x: 1, y: 42 + i }, Log.entries[i]);
    }

    // -------------------------------------------------------------------------
    // Draw World
    // -------------------------------------------------------------------------
    for (let x = 0; x < state.level.map.width; x++) {
      for (let y = 0; y < state.level.map.height; y++) {
        const v = { x, y };
        const terrain = state.level.map.get({ x, y });

        const isVisible =
          state.level.fowVisited.isInBounds(v) && state.level.fowVisited.get(v);

        if (!isVisible) {
          mapTerminal.drawCharCode(
            v,
            CharCode.blackSquare,
            Color.DimGray.blendPercent(Color.Black, 70),
            Color.DimGray.blendPercent(Color.Black, 70)
          );
          continue;
        }

        // Draw FOW Terrain
        if (terrain !== undefined) {
          const glyph = FOWTerrainGlyphs[terrain];
          if (glyph) {
            mapTerminal.drawGlyph({ x, y }, glyph);
          }
        }
      }
    }

    // Only draw entities in the player's viewshed
    player?.viewShed?.area.forEach((pos) => {
      const terrain = state.level.map.get(pos);
      const entities = state.posCache.get(`${pos.x}:${pos.y}`);

      // Draw Revealed Terrain
      if (terrain !== undefined) {
        const glyph = TerrainGlyphs[terrain];
        if (glyph) {
          mapTerminal.drawGlyph(pos, glyph);
        }
      }
      // Draw entities
      if (entities?.length) {
        const sortedEntities = entities.sort(
          (a, b) => b.renderPriority - a.renderPriority
        );
        for (let e of sortedEntities) {
          mapTerminal.drawGlyph(e.position, e.glyph);
        }
      }
    });

    // Render Labels
    const mousePos = this.mouse.getPos();
    const termPos = terminal.pixelToChar(mousePos);

    // Offset for portTerminal

    // World Position offset for port terminal
    const worldPos = {
      x: termPos.x - 17,
      y: termPos.y - 1,
    };

    // Only draw the label if the player can see it
    if (player?.viewShed?.area.has(`${worldPos.x}:${worldPos.y}`)) {
      // console.log(worldPos);
      const selectedEntities = state.posCache.get(
        `${worldPos.x}:${worldPos.y}`
      );
      if (selectedEntities?.length) {
        drawLabel(terminal, termPos, selectedEntities[0].name);
      }
    }

    terminal.render();
  }
}

function drawLabel(
  terminal: Terminal.BaseTerminal,
  pos: Vector2,
  text: string
) {
  const textPos = {
    x: pos.x + 3,
    y: pos.y,
  };
  terminal.drawCharCode(
    { x: pos.x + 1, y: pos.y },
    CharCode.leftwardsArrow,
    Color.DarkSlateGray,
    Color.White
  );
  terminal.drawCharCode(
    { x: pos.x + 2, y: pos.y },
    CharCode.blackSquare,
    Color.White,
    Color.DarkSlateGray
  );
  terminal.writeAt(textPos, text, Color.White, Color.DarkSlateGray);
}
