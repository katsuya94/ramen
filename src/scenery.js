import * as PIXI from 'pixi.js';
import {assign, each} from 'lodash';
import Entity from './entity.js';
import {makeTiledSprites} from './utilities.js';
import * as Assets from './assets.js';
import Action from './action.js';


export default class Scenery extends Entity {
  constructor(options) {
    super();

    let tiledSprites = makeTiledSprites(options);
    this.container = tiledSprites.container;
    this.foreground = tiledSprites.foreground;

    if (options.action) {
      let arrow = new PIXI.Sprite(Assets.loaded['assets/arrow.png'].texture);
      arrow.pivot.x = 5.5;
      arrow.pivot.y = 6.5;
      arrow.x = options.action.x;
      arrow.y = options.action.y;

      this.container.interactive = true;

      if (options.action.hitArea) {
        this.container.hitArea = options.action.hitArea;
      };

      this.container.mouseover = () => {
        this.foreground.addChild(arrow);
      };

      this.container.mouseout = () => {
        this.foreground.removeChild(arrow);
      };

      this.container.mousedown = options.action.callback;
    }
  }
}

export function makeCounter(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 7,
    height: 5,
    tiles: [
      null, null, null, null, null, null, null,
      '94', '95', null, null, null, null, null,
      '9C', '9D', null, null, null, null, null,
      'A0', 'A1', 'A2', 'A2', 'A2', 'A2', 'A2',
      'A8', 'A9', 'AA', 'AA', 'AA', 'AA', 'AA',
    ],
    foregroundTiles: [
      '8G', '8H', null, null, null, null, null,
      null, null, null, null, null, null, null,
      null, null, '9E', '9E', '9E', '9E', '9E',
      null, null, null, null, null, null, null,
      null, null, null, null, null, null, null,
    ],
    decorations: [
      {
        tile: '78',
        x: 39,
        y: 0,
      },
      {
        tile: '7G',
        x: 39,
        y: 32,
      },
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


function makeSitCallback(options) {
  return (event) => {
    Action.moveKarisAndDo(options.x, options.y, () => {
      Action.sitKaris();
    });
  };
}

export function makeChair1(tileset, options) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 1,
    tiles: [
      '5C',
    ],
    action: {
      x: 16,
      y: -4,
      callback: (event) => makeSitCallback(options),
      hitArea: new PIXI.Rectangle(9, 1, 14, 21),
    },
  });
};

export function makeChair2(tileset, options) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 2,
    tiles: [
      '60',
      '68',
    ],
    action: {
      x: 16,
      y: 12,
      callback: (event) => makeSitCallback(options),
      hitArea: new PIXI.Rectangle(9, 19, 14, 21),
    },
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

export function makeThinTable1(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 2,
    height: 2,
    tiles: [
      '48', '4A',
      '54', '56',
    ],
  });
};

export function makeThinTable2(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 2,
    tiles: [
      null,
      '74',
    ],
    foregroundTiles: [
      '6G',
      null,
    ],
  });
};

export function makePrepTable(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 2,
    height: 5,
    tiles: [
      null, null,
      'CI', 'D0',
      'CI', 'D0',
      'CI', 'D0',
      'D6', 'D8',
    ],
    foregroundTiles: [
      'CA', 'CC',
      null, null,
      null, null,
      null, null,
      null, null,
    ],
    decorations: [
      {
        tile: '91',
        x: 0,
        y: 96,
      },
      {
        tile: 'DD',
        x: 32,
        y: 64,
      },
      {
        tile: 'DD',
        x: 32,
        y: 96,
      },
    ],
  });
};

export function makeBench(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 4,
    height: 2,
    tiles: [
      'CA', 'CB', 'CB', 'CC',
      'D6', 'D7', 'D7', 'D8',
    ],
  });
};

export function makeShelf(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 1,
    height: 3,
    tiles: [
      'D3',
      'DB',
      'DJ',
    ],
  });
};

export function makeStove(tileset) {
  return new Scenery({
    tileset: tileset,
    width: 4,
    height: 1,
    tiles: [
      null, null, null, null,
    ],
    foregroundTiles: [
      'CA', 'CB', 'CB', 'CC',
    ],
    decorations: [
      {
        tile: 'D2',
        x: 0,
        y: 18,
      },
      {
        tile: 'D2',
        x: 32,
        y: 18,
      },
      {
        tile: 'D2',
        x: 64,
        y: 18,
      },
      {
        tile: 'D2',
        x: 96,
        y: 18,
      },
    ]
  });
}
