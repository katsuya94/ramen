import {
  map, values, fromPairs, flatMap, range, toUpper, padStart,
} from 'lodash';
import * as Assets from './assets.js';

function tilesetSpritesheetFor(resource) {
  let baseTexture = resource.texture.baseTexture;
  let rows = ~~(baseTexture.height / 32);
  let cols = ~~(baseTexture.width / 32);
  return new PIXI.Spritesheet(baseTexture, {
    meta: {},
    frames: fromPairs(map(flatMap(range(rows), (y) =>
      map(range(cols), (x) => ({
        frame: {x: x * 32, y: y * 32, w: 32, h: 32},
        sourceSize: {w: baseTexture.width, h: baseTexture.height},
      }))
    ), (frame, index) => [
      baseTexture.imageUrl + toUpper(padStart(index.toString(20), 2, '0')),
      frame,
    ])),
  });
}

function personSpritesheetFor(resource) {
  let baseTexture = resource.texture.baseTexture;
  return new PIXI.Spritesheet(baseTexture, {
    meta: {},
    frames: fromPairs(flatMap(['D', 'L', 'R', 'U'], (direction, y) =>
      map(range(3), (x) => [baseTexture.imageUrl + direction + x, {
        frame: {x: x * 32, y: y * 32, w: 32, h: 32},
        sourceSize: {w: baseTexture.width, h: baseTexture.height},
      }])
    )),
  });
}

async function load() {
  let resources = await Assets.loading;

  let spritesheets = {
    karis: personSpritesheetFor(resources['assets/karis.png']),
    tileset: tilesetSpritesheetFor(resources['assets/tileset.png']),
  };

  await Promise.all(map(values(spritesheets), (spritesheet) =>
    new Promise((resolve) => spritesheet.parse(resolve))
  ));

  return spritesheets;
}

export const loading = load();

