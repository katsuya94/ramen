import * as PIXI from 'pixi.js';
import Entity from './entity.js';

export default class Person extends Entity {
  constructor(spritesheet) {
    super();

    this.container = new PIXI.Container();

    this.container.addChild(new PIXI.Graphics()
      .beginFill(0x645A73)
      .drawPolygon(
        8, 31,
        9, 31,
        9, 30,
        23, 30,
        23, 31,
        24, 31,
        24, 33,
        23, 33,
        23, 34,
        9, 34,
        9, 33,
        8, 33,
      )
      .endFill()
    );

    let sprite = new PIXI.Sprite(
      spritesheet.textures[spritesheet.baseTexture.imageUrl + 'D1']
    );

    sprite.x = -0.5;

    this.container.addChild(sprite);

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

