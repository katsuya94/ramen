import * as PIXI from 'pixi.js';
import {each} from 'lodash';

export function makeTiledSprite(options) {
  let container = new PIXI.Container();

  each(options.tiles, (tileID, index) => {
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
  });

  return container;
}
