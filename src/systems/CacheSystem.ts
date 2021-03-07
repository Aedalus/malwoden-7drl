import { state } from "../globals";

export class CacheSystem {
  loop() {
    // Update the position cache
    state.posCache.clear();
    for (let e of state.level.entites) {
      const key = `${e.position.x}:${e.position.y}`;

      if (state.posCache.has(key)) {
        state.posCache.get(key)?.push(e);
      } else {
        state.posCache.set(key, [e]);
      }
    }
  }
}
