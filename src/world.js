import * as PIXI from 'pixi.js';
import {pull, each} from 'lodash';
import {makeTiledSprite} from './utilities.js';

export default class World {
  constructor(options) {
    this.container = new PIXI.Container();
    this.container.addChild(makeTiledSprite({
      width: options.width,
      height: options.height,
      tileset: options.tileset,
      tiles: options.floor,
    }));
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

