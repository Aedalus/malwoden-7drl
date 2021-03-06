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

  // Returns true if player input was detected
  loop(level: Level): boolean {
    if (this.currentPlayerInput === PlayerInput.NONE) return false;
    const player = level.entites.find((x) => x.player)!;

    let wasInput = false;

    if (this.currentPlayerInput === PlayerInput.UP) {
      player.wantsToMove = "up";
      wasInput = true;
    } else if (this.currentPlayerInput === PlayerInput.DOWN) {
      player.wantsToMove = "down";
      wasInput = true;
    } else if (this.currentPlayerInput === PlayerInput.RIGHT) {
      player.wantsToMove = "right";
      wasInput = true;
    } else if (this.currentPlayerInput === PlayerInput.LEFT) {
      player.wantsToMove = "left";
      wasInput = true;
    }

    // Make sure we reset the player input
    this.currentPlayerInput = PlayerInput.NONE;
    return wasInput;
  }
}
