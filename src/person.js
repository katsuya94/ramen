import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Person extends Entity {
  constructor(spritesheet) {
    super();
    this.container = new PIXI.Sprite(
      spritesheet.textures[spritesheet.baseTexture.imageUrl + 'D1']
    );
    this.movementQueue = [];
    this.moving = null;
  }

  frame() {
    let frameProgress = 4;

    while (frameProgress > 0) {
      if (!this.moving) {
        let next = this.movementQueue.shift();
        if (next) {
          this.moving = {x: this._x, y: this._y, progress: -32};
          this._x = next.x;
          this._y = next.y;
        }
      }

      if (!this.moving) {
        break;
      }

      if (frameProgress + this.moving.progress >= 0) {
        frameProgress += this.moving.progress;
        this.moving = null;
      } else {
        this.moving.progress += frameProgress;
        frameProgress = 0;
      }
    }

    if (this.moving) {
      let dx = (this._x * 32 - this.moving.x * 32) / 32;
      let dy = (this._y * 32 - this.moving.y * 32) / 32;

      this.container.x = this._x * 32 + dx * this.moving.progress;
      this.container.y = this._y * 32 + dy * this.moving.progress;
    } else {
      this.container.x = this._x * 32;
      this.container.y = this._y * 32;
    }
  }
}

