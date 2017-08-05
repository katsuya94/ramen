import * as PIXI from 'pixi.js';
import {map, each, zip} from 'lodash';

export function makeTiledSprites(options) {
  let container = new PIXI.Container();
  let foreground = new PIXI.Container();

  let containers = [container, foreground];

  let nullArray = map(options.tiles, () => null);

  let foregroundTiles = options.foregroundTiles || nullArray;
  let tileCallbacks = options.tileCallbacks || nullArray;

  let zipped = zip(options.tiles, foregroundTiles, tileCallbacks);

  let makeTile = (id) => {
    let textureID = options.tileset.baseTexture.imageUrl + id;
    return new PIXI.Sprite(options.tileset.textures[textureID]);
  };

  each(zipped, (tileTuple, index) => {
    let [tileID, foregroundTileID, tileCallback] = tileTuple;

    let x = index % options.width;
    let y = ~~(index / options.width);

    each(zip([tileID, foregroundTileID], containers), (tuple) => {
      let [id, container] = tuple;

      if (!id) {
        return;
      }

      let tile = makeTile(id);

      tile.x = x * 32;
      tile.y = y * 32;

      container.addChild(tile);

      if (tileCallback) {
        options.callbacks[tileCallback](tile, x, y);
      }
    });
  });

  each(options.decorations || [], (decoration) => {
    let tile = makeTile(decoration.tile);

    tile.x = decoration.x;
    tile.y = decoration.y;

    foreground.addChild(tile);
  });

  return {
    container: container,
    foreground: foreground,
  };
}
