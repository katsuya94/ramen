import * as PIXI from 'pixi.js';

async function load() {
  PIXI.loader.add([
    'assets/karis.png',
    'assets/tileset.png',
  ]);

  return await new Promise((resolve) => {
    PIXI.loader.load((_loader, resources) => resolve(resources));
  });
}

export const loading = load();

