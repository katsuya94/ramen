import * as PIXI from 'pixi.js';
import {bind} from 'lodash';
import * as Spritesheets from './spritesheets.js';
import World from './world.js';
import Person from './person.js';

export default class Game {
  static async load() {
    PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.NEAREST;

    let renderer = PIXI.autoDetectRenderer(512, 288, {
      resolution: 2,
      antialias: false,
    });

    document.body.appendChild(renderer.view);

    this.renderer = renderer;

    let spritesheets = await Spritesheets.loading;

    this.world = new World();
    this.karis = new Person(spritesheets.karis);
    this.world.add(this.karis);
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

