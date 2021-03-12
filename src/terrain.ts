import { CharCode, Color, Glyph } from "malwoden";

// Level
export enum Terrain {
  none = 0,
  tree = 1,
  mountain = 2,
  graveyard = 3,
  hedge = 4,
}

export const TerrainCollision: { [e in Terrain]: boolean } = {
  [Terrain.none]: false,
  [Terrain.tree]: true,
  [Terrain.mountain]: true,
  [Terrain.graveyard]: true,
  [Terrain.hedge]: true,
};

export const TerrainGlyphs: { [e in Terrain]: Glyph | undefined } = {
  [Terrain.none]: Glyph.fromCharCode(
    CharCode.blackSquare,
    Color.Black,
    Color.Black
  ),
  [Terrain.tree]: Glyph.fromCharCode(CharCode.blackSpadeSuit, Color.Green),
  [Terrain.mountain]: Glyph.fromCharCode(
    CharCode.blackUpPointingTriangle,
    Color.Brown
  ),
  [Terrain.graveyard]: Glyph.fromCharCode(CharCode.upDownArrowWithBase),
  [Terrain.hedge]: Glyph.fromCharCode(CharCode.greekSmallLetterPi),
};

export const FOWTerrainGlyphs: { [e in Terrain]: Glyph | undefined } = {
  [Terrain.none]: Glyph.fromCharCode(
    CharCode.blackSquare,
    Color.Black.blendPercent(Color.DimGray, 50),
    Color.Black.blendPercent(Color.DimGray, 50)
  ),
  [Terrain.tree]: Glyph.fromCharCode(
    CharCode.blackSpadeSuit,
    Color.Black.blendPercent(Color.DimGray, 20),
    Color.Black.blendPercent(Color.DimGray, 50)
  ),
  [Terrain.mountain]: Glyph.fromCharCode(
    CharCode.blackUpPointingTriangle,
    Color.DarkGray
  ),
  [Terrain.graveyard]: Glyph.fromCharCode(CharCode.upDownArrowWithBase),
  [Terrain.hedge]: Glyph.fromCharCode(CharCode.greekSmallLetterPi),
};

// Used by View System to calculate FOV
export const TerrainBlocksVision: { [e in Terrain]: boolean } = {
  [Terrain.none]: false,
  [Terrain.tree]: true,
  [Terrain.mountain]: true,
  [Terrain.graveyard]: true,
  [Terrain.hedge]: true,
};
