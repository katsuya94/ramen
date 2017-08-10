import * as PIXI from 'pixi.js';
import {each, min} from 'lodash';
import Entity from './entity.js';

export default class Person extends Entity {
  constructor(spritesheet) {
    super();

    this.container = new PIXI.Container();
    this.background = new PIXI.Graphics()
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
      .endFill();

    let sprite = new PIXI.Sprite(
      spritesheet.textures[spritesheet.baseTexture.imageUrl + 'D1']
    );

    sprite.x = -0.5;

    this.container.addChild(sprite);

    this.movementQueue = [];
    this.moving = null;

    this.whenDoneMoving = null;
  }

  sit(x, y, dx, dy) {
    this.sitting = {
      status: true,
      x: x * 32 + dx,
      y: y * 32 + dy,
      progress: -32,
    };
  }

  unsit() {
    this.sitting.status = false;
    this.sitting.progress = -32;
  }

  frame() {
    let frameProgress = 4;

    while (frameProgress > 0) {
      if (!this.moving && !this.sitting) {
        let next = this.movementQueue.shift();
        if (next) {
          this.moving = {x: this._x, y: this._y, progress: -32};
          this._x = next.x;
          this._y = next.y;
        }
      }

      if (!this.moving) {
        if (this.whenDoneMoving && !this.sitting) {
          this.whenDoneMoving();
          this.whenDoneMoving = null;
        }
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

    if (this.sitting) {
      this.sitting.progress += frameProgress;
      this.sitting.progress = Math.min(this.sitting.progress, 0);

      if (!this.sitting.status && this.sitting.progress >= 0) {
        this.sitting = null;
      }
    }

    let setPos = (x, y) => {
      each([this.container, this.background], (container) => {
        container.x = x;
        container.y = y;
      });
    };

    if (this.moving) {
      let dx = (this._x * 32 - this.moving.x * 32) / 32;
      let dy = (this._y * 32 - this.moving.y * 32) / 32;

      setPos(
        this._x * 32 + dx * this.moving.progress,
        this._y * 32 + dy * this.moving.progress,
      )
    } else if (this.sitting) {
      let dx = (this.sitting.x - this._x * 32) / 32;
      let dy = (this.sitting.y - this._y * 32) / 32;

      if (this.sitting.status) {
        setPos(
          this._x * 32 + dx * (32 + this.sitting.progress),
          this._y * 32 + dy * (32 + this.sitting.progress),
        );
      } else {
        setPos(
          this._x * 32 - dx * this.sitting.progress,
          this._y * 32 - dy * this.sitting.progress,
        );
      }

      this.container.y -= 8 * (16 - Math.abs(this.sitting.progress + 16)) / 16;
    } else {
      each([this.container, this.background], (container) => {
        container.x = this._x * 32;
        container.y = this._y * 32;
      });
    }
  }
}

