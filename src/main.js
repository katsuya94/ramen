import * as PIXI from 'pixi.js';
import {
  each, fromPairs, flatMap, range, map, values, padStart, toUpper
} from 'lodash';

PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

const renderer = PIXI.autoDetectRenderer(512, 288, {
  resolution: 2,
  antialias: false,
});
const stage = new PIXI.Container();

document.body.appendChild(renderer.view);

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

function createSpriteFrom(spritesheet, id) {
  return new PIXI.Sprite(
    spritesheet.textures[spritesheet.baseTexture.imageUrl + id]
  );
}

PIXI.loader.add([
  'assets/karis.png',
  'assets/tileset.png',
]);

new Promise((resolve) => {
  PIXI.loader.load((_loader, resources) => resolve(resources))
}).then((resources) => {
  let spritesheets = {
    karis: personSpritesheetFor(resources['assets/karis.png']),
    tileset: tilesetSpritesheetFor(resources['assets/tileset.png']),
  };

  return Promise.all(map(values(spritesheets), (spritesheet) =>
    new Promise((resolve) => spritesheet.parse(resolve))
  )).then(() => spritesheets);
}).then((spritesheets) => {
  each(range(16), (x) => each(range(9), (y) => {
    let tile = createSpriteFrom(spritesheets.tileset, '00');
    tile.x = x * 32;
    tile.y = y * 32;
    stage.addChild(tile);
  }));

  let karis = createSpriteFrom(spritesheets.karis, 'D1');
  stage.addChild(karis);

  renderer.render(stage);
});

