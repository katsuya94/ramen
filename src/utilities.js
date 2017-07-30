import * as PIXI from 'pixi.js';
import {map, each, zip} from 'lodash';

export function makeTiledSprite(options) {
  let container = new PIXI.Container();

  let tileCallbacks = options.tileCallbacks || map(options.tiles, () => null);

  let tiles = map(zip(options.tiles, tileCallbacks), (tuple, index) => {
    let [tileID, tileCallback] = tuple;

    if (!tileID) {
      return;
    }

    let x = index % options.width;
    let y = ~~(index / options.width);
    let textureID = options.tileset.baseTexture.imageUrl + tileID;
    let tile = new PIXI.Sprite(options.tileset.textures[textureID]);

    tile.x = x * 32;
    tile.y = y * 32;

    container.addChild(tile);

    if (tileCallback) {
      options.callbacks[tileCallback](tile, x, y);
    }

    return tile;
  });

  return container;
}
