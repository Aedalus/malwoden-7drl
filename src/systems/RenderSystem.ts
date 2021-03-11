import { Terminal, GUI, Input, Color, CharCode, Vector2 } from "malwoden";
import { FOWTerrainGlyphs, Stage, TerrainGlyphs } from "../stage";
import { Log } from "../logs";
import { state } from "../globals";
import { Entity } from "../entities";

interface RenderSystemContext {
  stage: Stage;
  terminal: Terminal.RetroTerminal;
  mapTerminal: Terminal.PortTerminal;
}

export class RenderSystem {
  mouse = new Input.MouseHandler();

  loop({ terminal, mapTerminal }: RenderSystemContext) {
    // Rendering
    terminal.clear();
    const player = state.stage.entites.find((x) => x.player);
    const playerViewshed = player?.viewShed?.area || new Map<string, Vector2>();

    // Player Box
    GUI.box(terminal, {
      title: "Player",
      origin: { x: 0, y: 0 },
      width: 15,
      height: 20,
    });
    if (player) {
      if (player.stats) {
        terminal.writeAt(
          { x: 2, y: 2 },
          `HP: ${player.stats.hp}/${player.stats.maxHp}`
        );
        drawBar(
          terminal,
          { x: 2, y: 3 },
          10,
          player.stats.hp / player.stats.maxHp,
          Color.Red
        );

        terminal.writeAt({ x: 2, y: 7 }, `Level: ${player.stats.level}`);
        terminal.writeAt({ x: 2, y: 8 }, `Attack: ${player.stats.attack}`);
        terminal.writeAt({ x: 2, y: 9 }, `Armor: ${player.stats.armor}`);
      }
    }

    // -------------------------------------------------------------------------
    // Logs
    // -------------------------------------------------------------------------
    GUI.box(terminal, {
      title: "Log",
      origin: { x: 16, y: 40 },
      width: 53,
      height: 9,
    });

    for (let i = 0; i < Log.length(); i++) {
      const logColor = i === Log.length() - 1 ? Color.White : Color.Gray;
      terminal.writeAt({ x: 17, y: 41 + i }, Log.entries[i], logColor);
    }

    // -------------------------------------------------------------------------
    // Draw World
    // -------------------------------------------------------------------------
    GUI.box(terminal, {
      origin: { x: 16, y: 0 },
      width: 53,
      height: 39,
    });
    terminal.writeAt(
      { x: 17, y: 0 },
      ` Stage ${state.stageCount} | ${state.stage.name} `
    );

    for (let x = 0; x < state.stage.map.width; x++) {
      for (let y = 0; y < state.stage.map.height; y++) {
        const v = { x, y };
        const terrain = state.stage.map.get({ x, y });

        const isVisible =
          state.stage.fowVisited.isInBounds(v) && state.stage.fowVisited.get(v);

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

    // Calculate for player's viewshed

    const entitiesInSight: Entity[] = [];
    playerViewshed.forEach((pos) => {
      const terrain = state.stage.map.get(pos);
      const entities = state.posCache.get(`${pos.x}:${pos.y}`) || [];
      entitiesInSight.push(...entities);

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

    // -------------------------------------------------------------------------
    // Info Box
    // -------------------------------------------------------------------------
    GUI.box(terminal, {
      title: "Info",
      origin: { x: 0, y: 21 },
      width: 15,
      height: 28,
    });

    // Info HP
    const infoEntities = entitiesInSight
      .filter((x) => x.enemy && x.stats) // Only get enemies with stats
      .sort((a, b) => a.id.localeCompare(b.id)); // Sort to make sure we always render the same order

    for (let i = 0; i < Math.min(infoEntities.length, 5); i++) {
      const e = infoEntities[i];
      const y = 23 + i * 3;
      terminal.writeAt({ x: 2, y: y }, e.name);
      drawBar(
        terminal,
        { x: 2, y: y + 1 },
        10,
        e.stats!.hp / e.stats!.maxHp,
        e.glyph.fore
      );
    }

    // -------------------------------------------------------------------------
    // Labels
    // -------------------------------------------------------------------------
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

function drawBar(
  terminal: Terminal.BaseTerminal,
  pos: Vector2,
  width: number,
  percent: number,
  color: Color
) {
  const filledWidth = Math.ceil(width * percent);

  for (let x = 0; x < width; x++) {
    const isFilled = x <= filledWidth;
    const c = isFilled ? color : color.blend(Color.Black);
    terminal.drawCharCode(
      { x: pos.x + x, y: pos.y },
      CharCode.blackSquare,
      c,
      c
    );
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
