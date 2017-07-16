import * as PIXI from 'pixi.js';
import {fromPairs, flatMap, range, map, values} from 'lodash';

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
    frames: fromPairs(map(flatMap(range(rows), (x) =>
      map(range(cols), (y) => ({
        frame: {x: x * 32, y: y * 32, w: 32, h: 32},
        sourceSize: {w: baseTexture.width, h: baseTexture.height},
      }))
    ), (frame, index) => [index.toString(20), frame])),
  });
}

function personSpritesheetFor(resource) {
  let baseTexture = resource.texture.baseTexture;
  return new PIXI.Spritesheet(baseTexture, {
    meta: {},
    frames: fromPairs(flatMap(['D', 'L', 'R', 'U'], (direction, y) =>
      map(range(3), (x) => [direction + x, {
        frame: {x: x * 32, y: y * 32, w: 32, h: 32},
        sourceSize: {w: baseTexture.width, h: baseTexture.height},
      }])
    )),
  });
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
    tileset: tilesetSpritesheetFor(resources['assets/karis.png']),
  };

  Promise.all(

  each(values(spritesheets), (spritesheet) => {
    promise = promise.then(() => new

  function loadRecursive(unloadedSheets) {
    if (isEmpty(unloadedSheets)) {
      return spritesheets;
    }

    let spritesheet = unloadedSheets.shift();
    let chainedPromise = loadRecursive(unloadedSheets);

    return new Promise((resolve) => spritesheet.parse(resolve))
      .then(() => chainedPromise);
  }

  return loadRecursive(values(spritesheets));

  return new Promise((resolve) => {
  .parse((textures) => {
    let karis = new PIXI.Sprite(textures['d1']);
    stage.addChild(karis);
    renderer.render(stage);
  });
});

