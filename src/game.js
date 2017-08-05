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
  makeThinTable1,
  makeThinTable2,
  makePrepTable,
  makeBench,
  makeShortBench,
  makeShelf,
  makeStove,
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
      let chair = makeChair2(tileset, {x: x, y: 7});
      chair.x = x;
      chair.y = 6;
      this.world.add(chair);
    });

    each(range(2, 6), (y) => {
      let chair = makeChair2(tileset, {x: 2, y: y});
      chair.x = 3;
      chair.y = y;
      this.world.add(chair);
    });

    let thinTable = makeThinTable1(tileset);
    thinTable.x = 0;
    thinTable.y = 1;
    this.world.add(thinTable);

    each([0, 1], (x) => {
      let chair = makeChair2(tileset, {x: x, y: 3});
      chair.x = x;
      chair.y = 2;
      this.world.add(chair);
    });

    each([0, 1], (x) => {
      let chair = makeChair1(tileset, {x: x, y: 3});
      chair.x = x;
      chair.y = 4;
      this.world.add(chair);
    });

    let table = makeTable(tileset);
    table.x = 0;
    table.y = 4;
    this.world.add(table);

    each([0, 1], (x) => {
      let chair = makeChair2(tileset, {x: x, y: 7});
      chair.x = x;
      chair.y = 6;
      this.world.add(chair);
    });

    each([0, 3, 6, 9], (x) => {
      each([x, x + 1], (x) => {
        let chair = makeChair1(tileset, {x: x, y: 7});
        chair.x = x;
        chair.y = 8;
        this.world.add(chair);
      });

      let thinTable = makeThinTable1(tileset);
      thinTable.x = x;
      thinTable.y = 8;
      this.world.add(thinTable);
    });

    let prepTable = makePrepTable(tileset);
    prepTable.x = 13;
    prepTable.y = 3;
    this.world.add(prepTable);

    let bench = makeBench(tileset);
    bench.x = 7;
    bench.y = 1;
    this.world.add(bench);

    each([14, 15], (x) => {
      let shelf = makeShelf(tileset);
      shelf.x = x;
      shelf.y = 0;
      this.world.add(shelf);
    });

    let stove = makeStove(tileset);
    stove.x = 12;
    stove.y = 8;
    this.world.add(stove);
  }
}

