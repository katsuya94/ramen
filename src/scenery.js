import Entity from './entity.js';
import {makeTiledSprite} from './utilities.js';

export default class Scenery extends Entity {
  constructor(options) {
    super();
    this.container = makeTiledSprite(options);
  }
}

export function makeCounter(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 7,
    height: 6,
    tiles: [
      '8G', '8H', null, null, null, null, null,
      '94', '95', null, null, null, null, null,
      '94', '95', null, null, null, null, null,
      '9C', '9D', '9E', '9E', '9E', '9E', '9E',
      'A0', 'A1', 'A2', 'A2', 'A2', 'A2', 'A2',
      'A8', 'A9', 'AA', 'AA', 'AA', 'AA', 'AA',
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
