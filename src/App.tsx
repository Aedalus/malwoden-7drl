import React, { useEffect } from "react";
import { CharCode, Glyph, Terminal, Color, Generation, Vector2, Input, GUI, Rand } from "malwoden";

function App() {
  const requestRef = React.useRef<number>(NaN);

  useEffect(() => {
    const mount = document.getElementById("example")!;
    const terminal = new Terminal.RetroTerminal({
      width: 70,
      height: 50,
      imageURL: "/font_16.png",
      charWidth: 16,
      charHeight: 16,
      mountNode: mount,
    });

    // Generate Map
    const map_width = 52;
    const map_height = 38;
    const map = new Generation.CellularAutomata(map_width, map_height);
    map.randomize(0.7);
    map.doSimulationStep();

    const open: Vector2[] = [];
    for (let x = 0; x < map.table.width; x++) {
      for (let y = 0; y < map.table.height; y++) {
        if (map.table.get({ x, y }) === 0) open.push({ x, y });
      }
    }
    const rng = new Rand.AleaRNG();
    const start = rng.nextItem(open)!;
    const coinPos = rng.nextItem(open)!;

    const logs: string[] = [];
    const addLog = (txt: string) => {
      logs.push(txt);
      while (logs.length > 5) logs.shift();
    };
    addLog("Collect Coins!");

    // Entities
    const player = {
      x: start.x,
      y: start.y,
      hp: 10,
      coins: 0,
    };

    const coin = {
      x: coinPos.x,
      y: coinPos.y,
    };

    function collectCoin() {
      player.coins++;
      const newPos = rng.nextItem(open)!;
      coin.x = newPos.x;
      coin.y = newPos.y;
      addLog("Coin!");
    }

    function move(dx: number, dy: number) {
      const x = player.x + dx;
      const y = player.y + dy;
      if (map.table.isInBounds({ x, y }) && map.table.get({ x, y }) === 0) {
        player.x = x;
        player.y = y;
      }
    }

    // Keyboard
    const keyboard = new Input.KeyboardHandler();
    const movement = new Input.KeyboardContext()
      .onDown(Input.KeyCode.DownArrow, () => move(0, 1))
      .onDown(Input.KeyCode.LeftArrow, () => move(-1, 0))
      .onDown(Input.KeyCode.RightArrow, () => move(1, 0))
      .onDown(Input.KeyCode.UpArrow, () => move(0, -1));

    keyboard.setContext(movement);

    const mapterminal = terminal.port({ x: 17, y: 1 }, map_width, map_height);

    const loop = () => {
      // Logic
      if (player.x === coin.x && player.y === coin.y) {
        collectCoin();
      }

      // Rendering
      terminal.clear();

      // Player Box
      GUI.box(terminal, {
        title: "Player",
        origin: { x: 0, y: 0 },
        width: 15,
        height: 39
      });

      // HP
      terminal.writeAt({ x: 2, y: 2 }, `HP : ${player.hp}/10`, Color.Red);
      terminal.writeAt({ x: 2, y: 4 }, `Gold : ${player.coins}`, Color.Yellow);

      // World Box
      GUI.box(terminal, {
        origin: { x: 16, y: 0 },
        width: 53,
        height: 39
      });

      // Logs
      GUI.box(terminal, {
        title: "Log",
        origin: { x: 0, y: 40 },
        width: 69,
        height: 9
      });

      for (let i = 0; i < logs.length; i++) {
        terminal.writeAt({ x: 1, y: 42 + i }, logs[i]);
      }

      // Draw Map
      for (let x = 0; x < map.table.width; x++) {
        for (let y = 0; y < map.table.height; y++) {
          const isWall = map.table.get({ x, y });
          mapterminal.drawCharCode(
            { x, y },
            isWall ? CharCode.blackSpadeSuit : CharCode.space,
            isWall ? Color.Green : Color.White
          );
        }
      }

      // Coin
      mapterminal.drawGlyph(
        coin,
        Glyph.fromCharCode(CharCode.oLower, Color.Yellow)
      );
      // Player Entity
      mapterminal.drawGlyph(
        player,
        Glyph.fromCharCode(CharCode.at, Color.Yellow)
      );

      terminal.render();

      requestRef.current = window.requestAnimationFrame(loop);
    };
    requestRef.current = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(requestRef.current);
  }, []);
  return <div id="malwoden"></div>;
}

export default App;
