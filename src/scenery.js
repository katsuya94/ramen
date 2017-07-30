import Entity from './entity.js';
import {makeTiledSprite} from './utilities.js';

export default class Scenery extends Entity {
  constructor(options) {
    super();
    this.container = makeTiledSprite(options);
  }
}
