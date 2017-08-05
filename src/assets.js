import * as PIXI from 'pixi.js';
import {assign} from 'lodash';

export const loaded = {};

async function load() {
  PIXI.loader.add([
    'assets/karis.png',
    'assets/tileset.png',
    'assets/arrow.png',
  ]);

  return await new Promise((resolve) => {
    PIXI.loader.load((_loader, resources) => {
      assign(loaded, resources);
      resolve(resources);
    });
  });
}

export const loading = load();

