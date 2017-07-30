import * as PIXI from 'pixi.js';
import {bind} from 'lodash';
import * as Spritesheets from './spritesheets.js';
import World from './world.js';
import Person from './person.js';
import Scenery from './scenery.js';

const WIDTH = 16;
const HEIGHT = 9;

export default class Game {
  static async load() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let renderer = PIXI.autoDetectRenderer(32 * WIDTH, 32 * HEIGHT, {
      resolution: 2,
      antialias: false,
    });

    document.body.appendChild(renderer.view);

    this.renderer = renderer;

    let spritesheets = await Spritesheets.loading;

    this.world = new World({
      width: WIDTH,
      height: HEIGHT,
      tileset: spritesheets.tileset,
      floor: require('./floor.json'),
    });

    this.karis = new Person(spritesheets.karis);
    this.karis.x = 5;
    this.karis.y = 7;
    this.world.add(this.karis);

    let refrigerator = new Scenery({
      tileset: spritesheets.tileset,
      width: 2,
      height: 3,
      tiles: [
        'C8', 'C9',
        'CG', 'CH',
        'D4', 'D5',
      ],
    });
    refrigerator.x = 7;
    refrigerator.y = 0;
    this.world.add(refrigerator);

    let curtain = new Scenery({
      tileset: spritesheets.tileset,
      width: 1,
      height: 2,
      tiles: [
        'H3',
        'HB',
      ],
    });
    curtain.x = 1;
    curtain.y = 0;
    this.world.add(curtain);

    let counter = new Scenery({
      tileset: spritesheets.tileset,
      width: 4,
      height: 5,
      tiles: [
        '8G', '8H', null, null,
        '94', '95', null, null,
        '9C', '9D', '9E', '9E',
        'A0', 'A1', 'A2', 'A2',
        'A8', 'A9', 'AA', 'AA',
      ],
    });
    counter.x = 4;
    counter.y = 1;
    this.world.add(counter);
  }

  static start() {
    let updateAndRender = bind(this.updateAndRender, this);

    let fps = 0;
    let lastTimestamp = window.performance.now();

    function frame(timestamp) {
      window.requestAnimationFrame(frame);

      if (timestamp - lastTimestamp > 1000 / 30) {
        lastTimestamp = timestamp;
        fps++;
        updateAndRender();
      }
    }

    frame(lastTimestamp);

    let debug = document.getElementById('debug');

    window.setInterval(() => {
      debug.innerHTML = 'FPS: ' + fps;
      fps = 0;
    }, 1000);
  }

  static updateAndRender() {
    this.renderer.render(this.world.container);
  }
}

