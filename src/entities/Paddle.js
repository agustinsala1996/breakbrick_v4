// @ts-nocheck
import { InputManager } from "../components/InputManager.js";
import { inputConfigs } from "../utils/inputConfigs.js";

export class Paddle extends Phaser.GameObjects.Rectangle {
  constructor(scene, x, y, width, height, color, alpha, inputType) {
    super(scene, x, y, width, height, color, alpha);

    // this en este contexto es la instancia de la clase Paleta
    scene.add.existing(this);

    // agregar fisica
    scene.physics.add.existing(this);

    //hacer la paleta inamovible
    this.body.immovable = true;

    //hacer que la paleta no se salga de los limites del mundo
    this.body.setCollideWorldBounds(true);

    const callbacks = {
      left: this.handleLeft.bind(this),
      right: this.handleRight.bind(this),
      stop: this.stop.bind(this),
    };

    this.inputManager = new InputManager({ scene, callbacks, inputConfig: this.getInputConfig(inputType) });
  }

  getInputConfig(inputType) {
    if (inputType === "CURSOR" || inputType === "ARROWS") {
      return inputConfigs.cursor;
    }

    if (inputType === "WASD") {
      return inputConfigs.wasd;
    }

    if (inputType === "IJKL") {
      return inputConfigs.ijkl;
    }

    return null;
  }

  handleLeft() {
    this.body.setVelocityX(-300);
  }

  handleRight() {
    this.body.setVelocityX(300);
  }

  stop() {
    this.body.setVelocityX(0);
  }
}
