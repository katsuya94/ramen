import * as PIXI from 'pixi.js';
import {bind, range, each} from 'lodash';
import * as Spritesheets from './spritesheets.js';
import World from './world.js';
import Person from './person.js';
import {
  makeCounter,
  makeCurtain,
  makeRefrigerator,
  makeChair1,
  makeChair2,
  makeTable,
  makePrepTable,
  makeCookingBench,
} from './scenery.js';
import Action from './action.js';

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

    this.setupScenery(spritesheets.tileset);

    let karis = new Person(spritesheets.karis);
    karis.x = 6;
    karis.y = 4;
    this.world.add(karis);

    Action.configure({
      karis: karis,
      passability: this.world.passability,
      width: WIDTH,
      height: HEIGHT,
    });
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
    this.world.frame();
    this.renderer.render(this.world.container);
  }

  static setupScenery(tileset) {
    let refrigerator = makeRefrigerator(tileset);
    refrigerator.x = 12;
    refrigerator.y = 0;
    this.world.add(refrigerator);

    let curtain = makeCurtain(tileset);
    curtain.x = 2;
    curtain.y = 0;
    this.world.add(curtain);

    let counter = makeCounter(tileset);
    counter.x = 4;
    counter.y = 2;
    this.world.add(counter);

    each(range(4, 11), (x) => {
      let chair = makeChair2(tileset);
      chair.x = x;
      chair.y = 7;
      this.world.add(chair);
    });

    each(range(3, 7), (y) => {
      let chair = makeChair1(tileset);
      chair.x = 3;
      chair.y = y;
      this.world.add(chair);
    });

    each([2, 5], (y) => {
      each([0, 1], (x) => {
        let chair = makeChair1(tileset);
        chair.x = x;
        chair.y = y;
        this.world.add(chair);
      });

      let table = makeTable(tileset);
      table.x = 0;
      table.y = y;
      this.world.add(table);

      each([0, 1], (x) => {
        let chair = makeChair2(tileset);
        chair.x = x;
        chair.y = y + 2;
        this.world.add(chair);
      });
    });

    let prepTable = makePrepTable(tileset);
    prepTable.x = 13;
    prepTable.y = 5;
    this.world.add(prepTable);

    let cookingBench = makeCookingBench(tileset);
    cookingBench.x = 7;
    cookingBench.y = 1;
    this.world.add(cookingBench);
  }
}

