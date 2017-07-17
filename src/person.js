import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Person extends Entity {
  constructor(spritesheet) {
    super(spritesheet);
    this.container = new PIXI.Sprite(
      this.spritesheet.textures[this.spritesheet.baseTexture.imageUrl + 'D1']
    );
  }
}
