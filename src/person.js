import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Person extends Entity {
  constructor(spritesheet) {
    super();
    this.container = new PIXI.Sprite(
      spritesheet.textures[spritesheet.baseTexture.imageUrl + 'D1']
    );
  }
}

