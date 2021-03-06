import * as PIXI from 'pixi.js';
import {pull, each, map} from 'lodash';
import {makeTiledSprites} from './utilities.js';
import Action from './action.js';

export default class World {
  constructor(options) {
    this.container = new PIXI.Container();
    this._default = new PIXI.Container();
    this._foreground = new PIXI.Container();
    this._background = new PIXI.Container();

    this.passability = map(options.floor.tileCallbacks, (tcb) => tcb == '00');

    let floor = makeTiledSprites({
      width: options.width,
      height: options.height,
      tileset: options.tileset,
      tiles: options.floor.tiles,
      tileCallbacks: options.floor.tileCallbacks,
      callbacks: {
        '00': (tile, x, y) => {
          tile.interactive = true;

          tile.mousedown = () => {
            Action.moveKarisAndDo(x, y, null);
          };
        },
      },
    }).container;

    this.container.addChild(floor);
    this.container.addChild(this._background);
    this.container.addChild(this._default);
    this.container.addChild(this._foreground);

    this._entities = [];
  }

  add(entity) {
    this._entities.push(entity);
    this._default.addChild(entity.container);

    if (entity.background) {
      this._background.addChild(entity.background);
    }

    if (entity.foreground) {
      this._foreground.addChild(entity.foreground);
    }
  }

  remove(entity, container) {
    pull(this._entities, entity);
    this._default.removeChild(entity.container);

    if (entity.background) {
      this._background.removeChild(entity.background);
    }

    if (entity.foreground) {
      this._foreground.removeChild(entity.foreground);
    }
  }

  frame() {
    each(this._entities, (entity) => entity.frame());
  }
}

