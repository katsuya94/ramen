import Entity from './entity.js';
import {makeTiledSprites} from './utilities.js';

export default class Scenery extends Entity {
  constructor(options) {
    super();
    let tiledSprites = makeTiledSprites(options);
    this.container = tiledSprites.container;
    this.foreground = tiledSprites.foreground;
  }
}

export function makeCounter(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 7,
    height: 6,
    tiles: [
      null, null, null, null, null, null, null,
      '94', '95', null, null, null, null, null,
      '94', '95', null, null, null, null, null,
      '9C', '9D', null, null, null, null, null,
      'A0', 'A1', 'A2', 'A2', 'A2', 'A2', 'A2',
      'A8', 'A9', 'AA', 'AA', 'AA', 'AA', 'AA',
    ],
    foregroundTiles: [
      '8G', '8H', null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, '9E', '9E', '9E', '9E', '9E',
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
    ],
  });
};

export function makeCurtain(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 2,
    tiles: [
      'H3',
      'HB',
    ],
  });
};

export function makeRefrigerator(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 2,
    height: 3,
    tiles: [
      'C8', 'C9',
      'CG', 'CH',
      'D4', 'D5',
    ],
  });
};

export function makeChair1(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 1,
    tiles: [
      '5C',
    ],
  });
};

export function makeChair2(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 2,
    tiles: [
      '60',
      '68',
    ],
  });
};

export function makeTable(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 2,
    height: 3,
    tiles: [
      '48', '4A',
      '4G', '4I',
      '54', '56',
    ],
  });
};

export function makePrepTable(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 2,
    height: 3,
    tiles: [
      null, null,
      'CI', 'D0',
      'D6', 'D8',
    ],
    foregroundTiles: [
      'CA', 'CC',
      null, null,
      null, null,
    ],
    decorations: [
      {
        tile: '91',
        x: 0,
        y: 32,
      },
      {
        tile: 'DD',
        x: 32,
        y: 32,
      },
    ],
  });
};

export function makeCookingBench(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 4,
    height: 2,
    tiles: [
      'CA', 'CB', 'CB', 'CC',
      'D6', 'D7', 'D7', 'D8',
    ],
    decorations: [
      {
        tile: 'D2',
        x: 64,
        y: 0,
      },
      {
        tile: 'D2',
        x: 96,
        y: 0,
      },
    ]
  });
};
