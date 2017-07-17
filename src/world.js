import {pull, each} from 'lodash';
export default class World {
  constructor() {
    this.container = new PIXI.Container();
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

