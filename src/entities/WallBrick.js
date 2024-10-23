// grpup of brick
import { Brick } from "./Brick";
export class WallBrick extends Phaser.GameObjects.Group {
  constructor(scene, filas = 4, columnas = 10) {
    super(scene);

    this.createWall(filas, columnas);
  }

  createWall(filas, columnas) {
    const sceneWidth = Number(this.scene.sys.game.config.width);
    const totalWidth = sceneWidth - 30;
    const minBrickWidth = 40;
    const minSpacing = 10;
  
    let widthBrick = (totalWidth - (columnas * minSpacing)) / columnas;
    let spacing = minSpacing;
  
    if (widthBrick < minBrickWidth) {
      widthBrick = minBrickWidth;
      spacing = (totalWidth - (columnas * widthBrick)) / (columnas - 1);
    }
  
    const heightBrick = 20;
    const totalBrickWidth = (columnas * widthBrick) + ((columnas - 1) * spacing);
    const offsetX = (sceneWidth - totalBrickWidth) / 2;
  
    for (let i = 0; i < filas; i++) {
      for (let j = 0; j < columnas; j++) {
        const x = offsetX + (j * widthBrick) + (j * spacing) + (widthBrick / 2);
        const y = 50 + (i * heightBrick) + (i * 10) + (heightBrick / 2);
        let brick = new Brick(
          this.scene,
          x,
          y,
          widthBrick,
          heightBrick,
          0xffffff,
          1
        );
        this.add(brick);
      }
    }
  }
}
