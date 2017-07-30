import * as PIXI from 'pixi.js';
import {pull, each} from 'lodash';
import {makeTiledSprite} from './utilities.js';

const HIGHLIGHT = new PIXI.Graphics();

HIGHLIGHT.beginFill(0xFFFFFF);
HIGHLIGHT.drawRect(0, 0, 32, 32);
HIGHLIGHT.endFill();
HIGHLIGHT.alpha = 0.2;

export default class World {
  constructor(options) {
    this.container = new PIXI.Container();

    let floor = makeTiledSprite({
      width: options.width,
      height: options.height,
      tileset: options.tileset,
      tiles: options.floor.tiles,
      tileCallbacks: options.floor.tileCallbacks,
      callbacks: {
        '00': (tile, x, y) => {
          tile.interactive = true;

          tile.mouseover = (data) => {
            data.currentTarget.addChild(HIGHLIGHT);
          };

          tile.mouseout = (data) => {
            data.currentTarget.removeChild(HIGHLIGHT);
          };
        },
      },
    });

    this.container.addChild(floor);

    this._entities = [];
  }

  add(entity) {
    this._entities.push(entity);
    this.container.addChild(entity.container);
  }

  remove(entity) {
    pull(this._entities, entity);
    this.container.removeChild(entity.container);
  }

  frame() {
    each(this._entities, (entity) => entity.frame());
  }
}

