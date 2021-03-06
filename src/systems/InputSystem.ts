import { Input } from "malwoden";
import { Level } from "../level";

enum PlayerInput {
  NONE,
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export class InputSystem {
  currentPlayerInput: PlayerInput = PlayerInput.NONE;

  constructor() {
    const keyboard = new Input.KeyboardHandler();
    const movement = new Input.KeyboardContext()
      .onDown(
        Input.KeyCode.DownArrow,
        () => (this.currentPlayerInput = PlayerInput.DOWN)
      )
      .onDown(
        Input.KeyCode.LeftArrow,
        () => (this.currentPlayerInput = PlayerInput.LEFT)
      )
      .onDown(
        Input.KeyCode.RightArrow,
        () => (this.currentPlayerInput = PlayerInput.RIGHT)
      )
      .onDown(
        Input.KeyCode.UpArrow,
        () => (this.currentPlayerInput = PlayerInput.UP)
      );

    keyboard.setContext(movement);
  }

  loop(level: Level) {
    console.log(this.currentPlayerInput);
    if (this.currentPlayerInput === PlayerInput.NONE) return;
    const player = level.entites.find((x) => x.player);

    if (this.currentPlayerInput === PlayerInput.UP) {
      player.wantsToMove = "up";
    } else if (this.currentPlayerInput === PlayerInput.DOWN) {
      player.wantsToMove = "down";
    } else if (this.currentPlayerInput === PlayerInput.RIGHT) {
      player.wantsToMove = "right";
    } else if (this.currentPlayerInput === PlayerInput.LEFT) {
      player.wantsToMove = "left";
    }

    // Make sure we reset the player input
    this.currentPlayerInput = PlayerInput.NONE;
  }
}
