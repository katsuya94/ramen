import * as PIXI from 'pixi.js';
import {map, each, zip} from 'lodash';

export function makeTiledSprites(options) {
  let container = new PIXI.Container();
  let foreground = new PIXI.Container();

  let nullArray = map(options.tiles, () => null);

  let foregroundTiles = options.foregroundTiles || nullArray;
  let tileCallbacks = options.tileCallbacks || nullArray;

  let zipped = zip(options.tiles, foregroundTiles, tileCallbacks);

  each(zipped, (tileTuple, index) => {
    let [tileID, foregroundTileID, tileCallback] = tileTuple;

    let x = index % options.width;
    let y = ~~(index / options.width);

    each(zip([tileID, foregroundTileID], [container, foreground]), (tuple) => {
      let [id, container] = tuple;

      if (!id) {
        return;
      }

      let textureID = options.tileset.baseTexture.imageUrl + id;
      let tile = new PIXI.Sprite(options.tileset.textures[textureID]);

      tile.x = x * 32;
      tile.y = y * 32;

      container.addChild(tile);

      if (tileCallback) {
        options.callbacks[tileCallback](tile, x, y);
      }
    });
  });

  return {
    container: container,
    foreground: foreground,
  };
}
