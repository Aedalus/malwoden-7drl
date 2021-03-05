import { useEffect } from "react";
import { CharCode, Glyph, Terminal, Color } from "malwoden";

function App() {
  useEffect(() => {
    const mountNode = document.getElementById("malwoden");
    const retroTerminal = new Terminal.RetroTerminal({
      charWidth: 16,
      charHeight: 16,
      width: 50,
      height: 30,
      imageURL: "/font_16.png",
      mountNode,
      backColor: Color.Black,
    });

    retroTerminal.clear();
    retroTerminal.drawGlyph(
      {
        x: 5,
        y: 5,
      },
      Glyph.fromCharCode(CharCode.at, Color.Yellow)
    );

    retroTerminal.render();
  }, []);
  return <div id="malwoden"></div>;
}

export default App;
